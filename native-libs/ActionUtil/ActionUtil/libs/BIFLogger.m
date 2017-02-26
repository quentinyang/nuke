//
//  BIFLogger.m
//  Pods
//
//  Created by xuxiongjian on 15/7/7.
//
//

#import "BIFLogger.h"
#import "BIFAppConfig.h"
#import "CFLMacros.h"
//#import "MobClick.h"
#import "NetworkRequest.h"

/**
 * 线上action log 的最大发送条数（默认）
 */
#define ONLINE_MAX_LOGS_SEND 15

/**
 * 线下action log 的最大发送条数（默认）
 */
#define OFFLINE_MAX_LOGS_SEND 1

#define APPACTION_CACHE_FILE @"appaction.cache"

@interface BIFLogger()

@property (strong, nonatomic, readwrite) BIFLogConfig *configParams;

@property (nonatomic, strong) NSDictionary *deviceDic;
@property (nonatomic, strong) NSDictionary *appDic;

@property (nonatomic, strong) NSMutableDictionary *cachedActions;
@property (nonatomic, strong) NSString *ip;
@property (nonatomic) BOOL lastLogHasBeenSent;
@property (nonatomic, strong) NSTimer *sendTimer;

@property (nonatomic, strong) NetworkRequest *LogApi;

/**
 * 线上log的开关 默认为YES
 * 线上模式，log自动开启
 * 线上模式想要关闭log，请将onlineLogSwitch置为NO；
 */
@property (nonatomic) BOOL onlineLogSwitch;

/**
 * 线下log的开关 默认为NO
 * 线下模式，log自动关闭；
 * 线下模式想要开启log，请将offlineLogSwitch置为YES；
 */
@property (nonatomic) BOOL offlineLogSwitch;

@end

@implementation BIFLogger

- (void)setConfig
{
    BIFAppConfig *appConfig = [BIFAppConfig shared];
    self.deviceDic = @{
                                @"mac":@"02:00:00:00:00:00",
                                @"dvid": appConfig.uuid,
                                @"model": appConfig.pm,
                                @"os": appConfig.osv
                                };
    self.appDic = @{
                             @"name":appConfig.appName,
                             @"ch": appConfig.chanalId,
                             @"ver": appConfig.appVerSion
                             };
    
}

- (void)setUsage:(NSDictionary *)usage   //(NSString *)uid ccid(NString *)ccid gcid(NSString *)gcid lat(NSString *)lat lng(NSString *)lng
{
    BIFAppConfig *usageConfig = [BIFAppConfig shared];
   
    usageConfig.userId = [usage objectForKey:@"uid"];
    usageConfig.ccid =[usage objectForKey:@"ccid"];
    usageConfig.gcid = [usage objectForKey:@"gcid"];
    usageConfig.lat = [usage objectForKey:@"lat"];
    usageConfig.lng = [usage objectForKey:@"lng"];
}
- (void)setUid:(NSString *)uid
{
    [BIFAppConfig shared].userId = uid;
}
- (void)setCcid:(NSString *)ccid
{
    [BIFAppConfig shared].ccid = ccid;
}
- (void)setGcid:(NSString *)gcid
{
    [BIFAppConfig shared].gcid = gcid;
}
- (void)setLat:(NSString *)lat
{
    [BIFAppConfig shared].lat = lat;
}
- (void)setLng:(NSString *)lng
{
    [BIFAppConfig shared].lng = lng;
}

+ (NSArray *)necessaryPreviousAwakeClasses
{
    return @[@"BIFAppConfig"];

}

- (void)awake
{
    //设置action log 的最大发送条数
    //if ([BIFAppConfig shared].isApiOnline) {
#if !DEBUG
        self.maxLogsSend = ONLINE_MAX_LOGS_SEND;
        //设置线上action log的开关
        BOOL isFakeLogin = [[NSUserDefaults standardUserDefaults] boolForKey:@"isFakeLogin"];
        if (isFakeLogin) {
            self.onlineLogSwitch = NO;
        } else {
            self.onlineLogSwitch = YES;
        }
    //} else {
#else
        self.maxLogsSend = OFFLINE_MAX_LOGS_SEND;
        //设置线下action log的开关（默认开启，方便线下测试）
        self.offlineLogSwitch = YES;
   // }
#endif
    NSString *appActionFile = [[NSHomeDirectory() stringByAppendingPathComponent:@"Documents"] stringByAppendingPathComponent:APPACTION_CACHE_FILE];
    self.cachedActions = [NSMutableDictionary dictionaryWithContentsOfFile:appActionFile];
    [[NSFileManager defaultManager] removeItemAtPath:appActionFile error:nil];
    if (!self.cachedActions) {
        self.cachedActions = [[NSMutableDictionary alloc] init];
    }
    self.lastLogHasBeenSent = YES;
    self.configParams = [[BIFLogConfig alloc] init];
    self.sendTimer = [NSTimer scheduledTimerWithTimeInterval:3600 target:self selector:@selector(sendTimerFire) userInfo:nil repeats:YES];
}

- (void)logWithActionCode:(NSString *)actionCode note:(NSDictionary *)note
{
    //[MobClick event:actionCode];
    //if ([BIFAppConfig shared].isApiOnline) {
#if !DEBUG
         if (!self.onlineLogSwitch) {
            return;
        }
    //} else {
#else
        if (!self.offlineLogSwitch) {
            return;
        }
    //}
#endif 
    if (self.lastLogHasBeenSent == NO) {
        [self.cachedActions removeAllObjects];
    }
    NSString *appActionFile = [[NSHomeDirectory() stringByAppendingPathComponent:@"Documents"] stringByAppendingPathComponent:APPACTION_CACHE_FILE];
    NSDictionary *extendparamsDic = [self createCSTParamsFromDic:note];
    BIFAppConfig *appConfig = [BIFAppConfig shared];
    NSDate *dat = [NSDate dateWithTimeIntervalSinceNow:0];
    NSTimeInterval a = [dat timeIntervalSince1970];
    NSString *timeString = [[NSString stringWithFormat:@"%f", a] substringWithRange:NSMakeRange(0, 10)];
    
    if (actionCode.length > 0) {
        if (!self.cachedActions.count) {
            //第一条记录，初始化缓存数据后退出
            [self setConfig];
            NSDictionary *log = @{
                                  @"action" : actionCode,
                                  @"clickTime" : timeString,
                                  @"extend" : extendparamsDic,
                                  };
            NSMutableArray *logs = [NSMutableArray arrayWithObject:log];
            NSString *geo = @"";
            if (appConfig.lat.length > 0 && appConfig.lng > 0) {
                geo = [NSString stringWithFormat:@"%@-%@",appConfig.lat,appConfig.lng];
            }
            
            NSDictionary *usage = @{
                                    @"uid"  : appConfig.userId ? appConfig.userId : @"",
                                    @"net"  : appConfig.net ? appConfig.net : @"",
                                    @"ip"   : appConfig.ip ? appConfig.ip : @"",
                                    @"ccid" : appConfig.ccid ? appConfig.ccid : @"",
                                    @"gcid" : appConfig.gcid ? appConfig.gcid : @"",
                                    @"geo"  : geo,
                                    @"logs" : logs,
                                    };
            self.configParams.usages = [NSArray arrayWithObject:usage];
            self.cachedActions = [self.configParams dictionaryRepresentation];
            [self.cachedActions setObject:self.deviceDic forKey:@"device"];
            [self.cachedActions setObject:self.appDic forKey:@"app"];
            [self.cachedActions writeToFile:appActionFile atomically:YES];
            
            BOOL isNeedToSent = [self isNeedToSent];
            if (isNeedToSent == YES) {
                //暂存一定量后，发送日志
                NSLog(@"%@",self.cachedActions);
                self.lastLogHasBeenSent = NO;
                [self.LogApi doLogApiWithParams:self.cachedActions];
            }
            return;
        }
        
        NSMutableArray *usages = self.cachedActions[@"usages"];
        NSMutableDictionary *usage = [usages lastObject];
        NSDictionary *log = @{
                              @"action" : actionCode,
                              @"clickTime" : timeString,
                              @"extend" : extendparamsDic,
                              };
        
        BOOL sameUsage = [self checkUsage:usage];
        if (sameUsage == YES) {
            //usage属性不变，则更新最后一个usage
            NSMutableArray *logs = usage[@"logs"];
            [logs addObject:log];
            usages[usages.count - 1] = usage;
        } else {
            //usage属性改变，新建usage
            NSString *geo = @"";
            if (appConfig.lat.length > 0 && appConfig.lng > 0) {
                geo = [NSString stringWithFormat:@"%@-%@",appConfig.lat,appConfig.lng];
            }
            NSMutableArray *newLogs = [NSMutableArray arrayWithObject:log];
            NSDictionary *newUsage = @{
                                       @"uid"  : appConfig.userId ? appConfig.userId : @"",
                                       @"net"  : appConfig.net ? appConfig.net : @"",
                                       @"ip"   : appConfig.ip ? appConfig.ip : @"",
                                       @"ccid" : appConfig.ccid ? appConfig.ccid : @"",
                                       @"gcid" : appConfig.gcid ? appConfig.gcid : @"",
                                       @"geo"  : geo,
                                       @"logs" : newLogs,
                                       };
            [usages addObject:newUsage];
        }
    }
    [self.cachedActions writeToFile:appActionFile atomically:YES];
    
    BOOL isNeedToSent = [self isNeedToSent];
    if (isNeedToSent == YES) {
        //暂存一定量后，发送日志
        NSLog(@"%@",self.cachedActions);
        self.lastLogHasBeenSent = NO;
        [self.LogApi doLogApiWithParams:self.cachedActions];
    }
}

- (BOOL)checkUsage:(NSDictionary *)usage
{
    BIFAppConfig *appConfig = [BIFAppConfig shared];
    NSString *uid = usage[@"uid"];
    if ((![uid isEqualToString:appConfig.userId])) {
        return NO;
    }
    NSString *net = usage[@"net"];
    if ((![net isEqualToString:appConfig.net]) && (net.length > 0)) {
        return NO;
    }
    NSString *ip = usage[@"ip"];
    if ((![ip isEqualToString:appConfig.ip]) && (ip.length > 0)) {
        return NO;
    }
    NSString *ccid = usage[@"ccid"];
    if ((![ccid isEqualToString:appConfig.ccid]) && (ccid.length > 0)) {
        return NO;
    }
    NSString *gcid = usage[@"gcid"];
    if ((![gcid isEqualToString:appConfig.gcid]) && (gcid.length > 0)) {
        return NO;
    }
    NSString *geo = usage[@"geo"];
    NSString *newGeo = @"";
    if (appConfig.lat.length > 0 && appConfig.lng > 0) {
        newGeo = [NSString stringWithFormat:@"%@-%@",appConfig.lat,appConfig.lng];
    }
    if ((![geo isEqualToString:newGeo]) && (geo.length > 0)) {
        return NO;
    }
    return YES;
}

- (BOOL)isNeedToSent
{
    NSArray *usages = self.cachedActions[@"usages"];
    int actionCount = 0;
    for (NSDictionary *usage in usages) {
        NSArray *logs = usage[@"logs"];
        actionCount += logs.count;
    }
    if (actionCount >= self.maxLogsSend) {
        return YES;
    } else {
        return NO;
    }
}

//到一定时间后，自动发送log
- (void)sendTimerFire
{
    if (self.lastLogHasBeenSent == YES) {
        NSString *appActionFile = [[NSHomeDirectory() stringByAppendingPathComponent:@"Documents"] stringByAppendingPathComponent:APPACTION_CACHE_FILE];
        self.cachedActions = [NSMutableDictionary dictionaryWithContentsOfFile:appActionFile];
        if (self.cachedActions.count > 0) {
            self.lastLogHasBeenSent = NO;
            [self.LogApi doLogApiWithParams:self.cachedActions];
        }
    }
}

//直接发送暂存log
- (void)sendLogAnyWay
{
    if (self.cachedActions.count > 0) {
        self.lastLogHasBeenSent = NO;
        [self.LogApi doLogApiWithParams:self.cachedActions];
    }
}

#pragma mark - Param Limit
- (NSDictionary *)createCSTParamsFromDic:(NSDictionary *)dic
{
    if ([[BIFAppConfig shared].appName isEqualToString:@"i-broker"]) {
        //经纪人app extend过滤字段
        return [self createBrokerCSTParamsFromDic:dic outArray:[self brokerLogLimit]];
    } else {
        return [self createBrokerCSTParamsFromDic:dic outArray:[self angejiaLogLimit]];
    }
}


- (NSDictionary *)createCSTParamsFromDic:(NSDictionary *)dic outArray:(NSArray *)outArray
{
    NSArray *limitArray = outArray;
    NSMutableDictionary *temp = [NSMutableDictionary dictionaryWithDictionary:dic];
    for (NSString *key in [temp allKeys]) {
        if (![limitArray containsObject:key]) {
            [temp removeObjectForKey:key];
        }
    }
    return temp;
}

- (NSDictionary *)createBrokerCSTParamsFromDic:(NSDictionary *)dic outArray:(NSArray *)outArray
{
    NSArray *limitArray = outArray;
    NSMutableDictionary *temp = [NSMutableDictionary dictionaryWithDictionary:dic];
    NSMutableDictionary *cols = [NSMutableDictionary dictionary];
    BOOL hasCols = NO;
    
    for (NSString *key in [temp allKeys]) {
        if (![limitArray containsObject:key]) {
            [cols setValue:[temp valueForKey:key] forKey:key];
            [temp removeObjectForKey:key];
            hasCols = YES;
        }
    }
    
    if (hasCols) {
        [temp setObject:cols forKey:@"cols"];
    }
    return temp;
}

- (void)didFinishWithResponse:(NSURLResponse *)response reformedData:(id)result
{
    NSLog(@"发送日志成功");
    NSString *appActionFile = [[NSHomeDirectory() stringByAppendingPathComponent:@"Documents"] stringByAppendingPathComponent:APPACTION_CACHE_FILE];
    [[NSFileManager defaultManager] removeItemAtPath:appActionFile error:nil];
    self.lastLogHasBeenSent = YES;
    [self.cachedActions removeAllObjects];
}


- (void)didFailWithResponse:(NSURLResponse *)response
{
    self.lastLogHasBeenSent = YES;
    NSLog(@"发送日志失败");
}

- (NSArray *)angejiaLogLimit
{
    return @[@"vpid", @"bp", @"chatUserId", @"visitId", @"brokerId", @"dynamicType", @"cols"];
}

- (NSArray *)brokerLogLimit
{
    NSArray *logLimitArray = [[NSUserDefaults standardUserDefaults] valueForKey:@"logLimitArray"];
    return logLimitArray;
}

- (NetworkRequest *)LogApi
{
    if (!_LogApi) {
        _LogApi = [[NetworkRequest alloc] init];
      _LogApi.delegate = self;
    }
  return _LogApi;
}

- (void)dealloc
{
    [self.sendTimer invalidate];
}

@end
