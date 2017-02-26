//
//  BIFAppConfig.m
//  BIFNetwork
//
//  Created by Softwind.Tang on 14/12/2.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import "BIFAppConfig.h"
#import "NSObject+BIFNetwork.h"

#import "UIDevice+CFL.h"
#import "BIFFileHandler.h"
#import "BIFLocation.h"
#import "BIFUUID.h"
#import <sys/sysctl.h>
#import <mach/mach.h>


@interface BIFAppConfig ()

@property (nonatomic, strong) NSString *appName;
@property (nonatomic, strong) NSString *appVerSion;
@property (nonatomic, strong) NSString *chanalId;

//@property (nonatomic, strong) NSString *lng;
//@property (nonatomic, strong) NSString *lat;

@end

@implementation BIFAppConfig

#pragma mark - getters and setters

- (NSString *)deviceModel
{
    int mib[2];
    size_t len;
    char *machine;
    
    mib[0] = CTL_HW;
    mib[1] = HW_MACHINE;
    sysctl(mib, 2, NULL, &len, NULL, 0);
    machine = malloc(len);
    sysctl(mib, 2, machine, &len, NULL, 0);
    
    NSString *platform = [NSString stringWithCString:machine encoding:NSASCIIStringEncoding];
    free(machine);
    
    if ([platform isEqualToString:@"iPhone1,1"]) return @"iPhone 2G (A1203)";
    if ([platform isEqualToString:@"iPhone1,2"]) return @"iPhone 3G (A1241/A1324)";
    if ([platform isEqualToString:@"iPhone2,1"]) return @"iPhone 3GS (A1303/A1325)";
    if ([platform isEqualToString:@"iPhone3,1"]) return @"iPhone 4 (A1332)";
    if ([platform isEqualToString:@"iPhone3,2"]) return @"iPhone 4 (A1332)";
    if ([platform isEqualToString:@"iPhone3,3"]) return @"iPhone 4 (A1349)";
    if ([platform isEqualToString:@"iPhone4,1"]) return @"iPhone 4S (A1387/A1431)";
    if ([platform isEqualToString:@"iPhone5,1"]) return @"iPhone 5 (A1428)";
    if ([platform isEqualToString:@"iPhone5,2"]) return @"iPhone 5 (A1429/A1442)";
    if ([platform isEqualToString:@"iPhone5,3"]) return @"iPhone 5c (A1456/A1532)";
    if ([platform isEqualToString:@"iPhone5,4"]) return @"iPhone 5c (A1507/A1516/A1526/A1529)";
    if ([platform isEqualToString:@"iPhone6,1"]) return @"iPhone 5s (A1453/A1533)";
    if ([platform isEqualToString:@"iPhone6,2"]) return @"iPhone 5s (A1457/A1518/A1528/A1530)";
    if ([platform isEqualToString:@"iPhone7,1"]) return @"iPhone 6 Plus (A1522/A1524)";
    if ([platform isEqualToString:@"iPhone7,2"]) return @"iPhone 6 (A1549/A1586)";
    if ([platform isEqualToString:@"iPhone8,1"]) return @"iPhone 6s ";
    if ([platform isEqualToString:@"iPhone8,2"]) return @"iPhone 6s Plus ";
    
    if ([platform isEqualToString:@"iPod1,1"])   return @"iPod Touch 1G (A1213)";
    if ([platform isEqualToString:@"iPod2,1"])   return @"iPod Touch 2G (A1288)";
    if ([platform isEqualToString:@"iPod3,1"])   return @"iPod Touch 3G (A1318)";
    if ([platform isEqualToString:@"iPod4,1"])   return @"iPod Touch 4G (A1367)";
    if ([platform isEqualToString:@"iPod5,1"])   return @"iPod Touch 5G (A1421/A1509)";
    
    if ([platform isEqualToString:@"iPad1,1"])   return @"iPad 1G (A1219/A1337)";
    
    if ([platform isEqualToString:@"iPad2,1"])   return @"iPad 2 (A1395)";
    if ([platform isEqualToString:@"iPad2,2"])   return @"iPad 2 (A1396)";
    if ([platform isEqualToString:@"iPad2,3"])   return @"iPad 2 (A1397)";
    if ([platform isEqualToString:@"iPad2,4"])   return @"iPad 2 (A1395+New Chip)";
    if ([platform isEqualToString:@"iPad2,5"])   return @"iPad Mini 1G (A1432)";
    if ([platform isEqualToString:@"iPad2,6"])   return @"iPad Mini 1G (A1454)";
    if ([platform isEqualToString:@"iPad2,7"])   return @"iPad Mini 1G (A1455)";
    
    if ([platform isEqualToString:@"iPad3,1"])   return @"iPad 3 (A1416)";
    if ([platform isEqualToString:@"iPad3,2"])   return @"iPad 3 (A1403)";
    if ([platform isEqualToString:@"iPad3,3"])   return @"iPad 3 (A1430)";
    if ([platform isEqualToString:@"iPad3,4"])   return @"iPad 4 (A1458)";
    if ([platform isEqualToString:@"iPad3,5"])   return @"iPad 4 (A1459)";
    if ([platform isEqualToString:@"iPad3,6"])   return @"iPad 4 (A1460)";
    
    if ([platform isEqualToString:@"iPad4,1"])   return @"iPad Air (A1474)";
    if ([platform isEqualToString:@"iPad4,2"])   return @"iPad Air (A1475)";
    if ([platform isEqualToString:@"iPad4,3"])   return @"iPad Air (A1476)";
    if ([platform isEqualToString:@"iPad4,4"])   return @"iPad Mini 2G (A1489)";
    if ([platform isEqualToString:@"iPad4,5"])   return @"iPad Mini 2G (A1490)";
    if ([platform isEqualToString:@"iPad4,6"])   return @"iPad Mini 2G (A1491)";
    
    if ([platform isEqualToString:@"i386"])      return @"iPhone Simulator";
    if ([platform isEqualToString:@"x86_64"])    return @"iPhone Simulator";
    return platform;
}

- (NSString *)appName
{
    if (!_appName) {
        BIFFileHandler *handler = [[BIFFileHandler alloc] initWithResourceFile:@"Info"
                                                                          type:@"plist"];
        NSDictionary *dic = (NSDictionary *)handler.dataOfFile;
        _appName = dic[@"AppName"];
        
    }
    
    return _appName;
}

- (NSString *)appVerSion
{
    if (!_appVerSion) {
        BIFFileHandler *handler = [[BIFFileHandler alloc] initWithResourceFile:@"Info"
                                                                          type:@"plist"];
        NSDictionary *dic = (NSDictionary *)handler.dataOfFile;
        _appVerSion = dic[@"CFBundleShortVersionString"];
    }
    
    return _appVerSion;
}

- (NSString *)chanalId
{
    if (!_chanalId) {
        BIFFileHandler *handler = [[BIFFileHandler alloc] initWithResourceFile:@"Info"
                                                                          type:@"plist"];
        NSDictionary *dic = (NSDictionary *)handler.dataOfFile;
        _chanalId = dic[@"ChannelID"];
        
        if (!_chanalId) {
            _chanalId = @"C09";
        }
    }
    
    return _chanalId;
}

- (NSString *)ip
{
    return [UIDevice currentDevice].CFL_localIPAddress;
}

- (NSString *)net
{
    return self.networkStatusDescription;
}

- (NSString *)p
{
    return @"iOS";
}

- (NSString *)pm
{
    return [UIDevice currentDevice].CFL_machineType;
}

- (NSString *)osv
{
    return [UIDevice currentDevice].systemVersion;
}

- (NSString *)uuid
{
    return [BIFUUID shared].uuid;
}

- (NSString *)networkStatusDescription
{
    NSString *desc = nil;
    switch (self.networkDetailStatus) {
        case BIFNetworkDetailStatus2G:
            desc = @"2G";
            break;
            
        case BIFNetworkDetailStatus3G:
            desc = @"3G";
            break;
            
        case BIFNetworkDetailStatus4G:
            desc = @"4G";
            break;
            
        case BIFNetworkDetailStatusLTE:
            desc = @"LTE";
            break;
            
        case BIFNetworkDetailStatusNone:
            desc = @"None";
            break;
            
        case BIFNetworkDetailStatusUnknown:
            desc = @"Unknown";
            break;
            
        case BIFNetworkDetailStatusWIFI:
            desc = @"WIFI";
            break;
            
        default:
            desc = @"";
            break;
    }
    
    return desc;
}

- (BIFNetworkDetailStatus)networkDetailStatus{
    __block BIFNetworkDetailStatus status = BIFNetworkDetailStatusUnknown;
    
    if([[NSThread currentThread] isMainThread]){
        status = [self __innerNetWorkDetailStatus];
    }else{
        dispatch_sync(dispatch_get_main_queue(), ^{
            status = [self __innerNetWorkDetailStatus];
        });
        
    }
    return status;
    
}

/**
 *  @author Plan B Inc, 16-04-08 11:04:42
 *
 *  @brief 获取网络状态（非线程安全）
 *
 *  @return 网络状态
 */
-(BIFNetworkDetailStatus)__innerNetWorkDetailStatus{
    NSAssert([[NSThread currentThread] isMainThread], @"NetWorkDetailStatus 目前只允许在主线程运行");
    BIFNetworkDetailStatus status = BIFNetworkDetailStatusUnknown;
    NSArray *subviews = [[[[UIApplication sharedApplication] valueForKey:@"statusBar"] valueForKey:@"foregroundView"]subviews];
    NSNumber *dataNetworkItemView = nil;
    
    if (subviews) {
        for (id subview in subviews) {
            if([subview isKindOfClass:[NSClassFromString(@"UIStatusBarDataNetworkItemView") class]]) {
                dataNetworkItemView = subview;
                break;
            }
        }
    }
    
    if (!dataNetworkItemView) {
        return status;
    }
    
    switch ([[dataNetworkItemView valueForKey:@"dataNetworkType"] integerValue]) {
        case 0:
            status = BIFNetworkDetailStatusNone;
            break;
        case 1:
            status = BIFNetworkDetailStatus2G;
            break;
        case 2:
            status = BIFNetworkDetailStatus3G;
            break;
        case 3:
            status = BIFNetworkDetailStatus4G;
            break;
        case 4:
            status = BIFNetworkDetailStatusLTE;
            break;
        case 5:
            status = BIFNetworkDetailStatusWIFI;
            break;
        default:
            break;
    }
    return status;
}


- (NSString *)networkChangedNotification
{
    return @"kNotificationNetworkChanged";
}

- (NSString *)apiHeadToken
{
    return _apiHeadToken ? _apiHeadToken : @"";
}

- (NSString *)clientId
{
    return _clientId ? _clientId : @"";
}

#pragma mark - public methods

+ (NSArray *)necessaryPreviousAwakeClasses
{
    return nil;
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

#pragma mark - privates

#pragma mark - AFNetworkingReachabilityDidChangeNotification

- (void)checkNetworkStatus:(NSNotification *)notification
{
    [[NSNotificationCenter defaultCenter] postNotificationName:self.networkChangedNotification object:nil];
}

/*
#pragma mark - location

- (void)didReceiveLocationStatus:(NSNotification *)notification
{
    BIFLocation *location = [BIFLocation shared];
    
    self.lng = [NSString stringWithFormat:@"%f", location.location.coordinate.longitude];
    self.lat = [NSString stringWithFormat:@"%f", location.location.coordinate.latitude];
}*/

@end
