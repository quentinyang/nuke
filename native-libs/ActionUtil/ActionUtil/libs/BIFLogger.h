//
//  BIFLogger.h
//  Pods
//
//  Created by xuxiongjian on 15/7/7.
//
//

#import "BIFSingleton.h"
#import "BIFLogConfig.h"

@interface BIFLogger : BIFSingleton

@property (nonatomic, readonly) BIFLogConfig *configParams;

//log最大发送条数
@property (nonatomic) NSInteger maxLogsSend;

- (void)logWithActionCode:(NSString *)actionCode note:(NSDictionary *)note;

- (void)setUsage:(NSDictionary *)usage;
- (void)setUid:(NSString *)uid;
- (void)setCcid:(NSString *)ccid;
- (void)setGcid:(NSString *)gcid;
- (void)setLat:(NSString *)lat;
- (void)setLng:(NSString *)lng;

//不管暂存了几条log，把当前的暂存log都发送出去
- (void)sendLogAnyWay;

@end
