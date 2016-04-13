//
//  UIDevice+CFL.h
//  BIFCore
//
//  Created by Softwind.Tang on 14/12/2.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

//版本比较
#define SYSTEM_VERSION_EQUAL_TO(v)                  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedSame)
#define SYSTEM_VERSION_GREATER_THAN(v)              ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedDescending)
#define SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(v)  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)
#define SYSTEM_VERSION_LESS_THAN(v)                 ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedAscending)
#define SYSTEM_VERSION_LESS_THAN_OR_EQUAL_TO(v)     ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedDescending)


@interface UIDevice (CFL)

- (NSString *)iosModel;
- (NSString *)appVersion;

- (NSString *)CFL_macaddress;
- (NSString *)CFL_macaddressMD5;
- (NSString *)CFL_machineType;
- (NSString *)CFL_ostype;

- (NSString *)CFL_localIPAddress;
- (NSString *)CFL_totalDiskspace;
- (NSString *)CFL_freeDiskspace;
- (UIDeviceBatteryState)CFL_batteryState;

@end
