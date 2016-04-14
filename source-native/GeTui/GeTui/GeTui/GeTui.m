//
//  GeTui.m
//  GeTui
//
//  Created by 周晓建 on 16/4/12.
//  Copyright © 2016年 fy360. All rights reserved.
//

#import "GeTui.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@implementation GeTui

@synthesize bridge = _bridge;

static NSString *_ClientId = @"";

+(void)setClientId:(NSString *)newClientId
{
    //  NSString *clientIdString = [NSString stringWithString:clientId];
    _ClientId = newClientId;
}

+ (instancetype)sharedInstance {
    static GeTui *sharedInstance = nil;
    
    sharedInstance = [[self alloc] init];
    
    return sharedInstance;
}

- (instancetype)init {
    self = [super init];
    return self;
}

- (void)handleRemoteNotificationReceived:(NSString *)payloadMsg withRoot:(RCTRootView *)rootView
{
    GeTui *geTui = [rootView.bridge moduleForClass:[GeTui class]];
    // GeTuiManager *geTuiManager = rootView.bridge.modules[RCTBridgeModuleNameForClass([GeTuiManager class])];
    [geTui.bridge.eventDispatcher sendAppEventWithName:@"notify"
                                                         body:payloadMsg];
}

RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(getClientId:(RCTResponseSenderBlock) callback)
{
    callback(@[_ClientId]);
}

@end
