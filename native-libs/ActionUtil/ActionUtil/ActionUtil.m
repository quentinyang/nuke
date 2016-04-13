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

@end
