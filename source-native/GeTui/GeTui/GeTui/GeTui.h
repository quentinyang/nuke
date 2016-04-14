//
//  GeTui.h
//  GeTui
//
//  Created by 周晓建 on 16/4/12.
//  Copyright © 2016年 fy360. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
#import "RCTRootView.h"

@interface GeTui : NSObject <RCTBridgeModule>

+(void) setClientId:(NSString *)newClientId;

+(instancetype)sharedInstance;

-(void)handleRemoteNotificationReceived:(NSString *)payloadMsg withRoot:(RCTRootView *) rootView;

@end
