//
//  CFLMacros.h
//  BIFCore
//
//  Created by Softwind.Tang on 14/12/2.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

/**
 *  所有的公共基础宏定义
 */

#ifndef BIFCore_CFLMacros_h
#define BIFCore_CFLMacros_h

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

//版本比较
#define SYSTEM_VERSION_EQUAL_TO(v)                  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedSame)
#define SYSTEM_VERSION_GREATER_THAN(v)              ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedDescending)
#define SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(v)  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)
#define SYSTEM_VERSION_LESS_THAN(v)                 ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedAscending)
#define SYSTEM_VERSION_LESS_THAN_OR_EQUAL_TO(v)     ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedDescending)

//Log
#ifdef DEBUG
#	define CFLLog(fmt, ...) NSLog((@"[%@]-%s #%d " fmt), [self class], __PRETTY_FUNCTION__, __LINE__, ##__VA_ARGS__);
#   define CFLSLog(fmt, ...) NSLog(fmt, __VA_ARGS__)
#else
#	define CFLLog(...)
#   define CFLSLog(...)
#endif

#define CStringToNSSting(A) [[NSString alloc] initWithCString:(A) encoding:NSUTF8StringEncoding]

#endif
