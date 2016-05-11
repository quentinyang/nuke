//
//  UUID.h
//  UUID
//
//  Created by Angejia Frontend Team on 16/5/6.
//  Copyright © 2016年 Frontend Team. All rights reserved.
//

//#import "Singleton.h"
#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface UUID : NSObject <RCTBridgeModule>

@property (nonatomic, copy, readonly) NSString *uuid;

@end