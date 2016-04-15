//
//  ActionUtil.m
//  ActionUtil
//
//  Created by Angejia Frontend Team on 16/4/13.
//  Copyright © 2016年 Frontend Team. All rights reserved.
//

#import "ActionUtil.h"
#import "BIFLogger.h"

@implementation ActionUtil

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setAction:(NSString *)action) {
    [[BIFLogger shared] logWithActionCode:action note:nil];
}

RCT_EXPORT_METHOD(setActionWithExtend:(NSString *)action extend:(NSDictionary *)extend) {
    [[BIFLogger shared] logWithActionCode:action note:extend];
}

RCT_EXPORT_METHOD(setUsage:(NSDictionary *)usage) {
    [[BIFLogger shared] setUsage:usage];
}

RCT_EXPORT_METHOD(setUid:(NSString *)uid) {
    [[BIFLogger shared] setUid:uid];
}
RCT_EXPORT_METHOD(deleteUid {
    [[BIFLogger shared] setUid:@""];
}
RCT_EXPORT_METHOD(setCcid:(NSString *)ccid) {
    [[BIFLogger shared] setCcid:ccid];
}
RCT_EXPORT_METHOD(setGcid:(NSString *)gcid) {
    [[BIFLogger shared] setGcid:gcid];
}
RCT_EXPORT_METHOD(setGeo:(NSString *)geo) {
    NSArray *rs = [geo componentsSeparatedByString:@"-"];
    [[BIFLogger shared] setLat:rs[0]];
    [[BIFLogger shared] setLng:rs[1]];
}
@end
