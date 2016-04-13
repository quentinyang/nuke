//
//  BIFSingleton.h
//  BIFCore
//
//  Created by Softwind.Tang on 14/12/3.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 *  所有单例的父类。
 */
@interface BIFSingleton : NSObject

/**
 *  获取单例实例
 *
 *  @return 单例实例
 */
+ (instancetype)shared;

/**
 *  这个单例初始化或许需要建立在一些别的类的初始化的基础上。
 *  若需要，则子类实现此方法，返回前置类名。父类返回 nil。
 *
 *  @return 前置初始化的类名数组，数据为字符串。如@"BIFLocation"
 */
+ (NSArray *)necessaryPreviousAwakeClasses;

/**
 *  这个方法用于单例初始化，主要用于 app 启动时。
 *  子类在这个方法中实现对自己数据的初始化。
 *  尽量不要修改 init 方法，因为里面有保障前置类首先初始化的逻辑。
 */
- (void)awake;

@end
