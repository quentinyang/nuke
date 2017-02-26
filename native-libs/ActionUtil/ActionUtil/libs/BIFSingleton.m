//
//  BIFSingleton.m
//  BIFCore
//
//  Created by Softwind.Tang on 14/12/3.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import "BIFSingleton.h"
#import "CFLMacros.h"

#import <objc/objc.h>
#import <objc/message.h>

static NSMutableDictionary *singletonMap = nil;


@interface BIFSingleton ()

@end

@implementation BIFSingleton

+ (instancetype)shared
{
    __block BIFSingleton *instance = singletonMap[NSStringFromClass([self class])];
    
    if (!instance) {
        @synchronized(instance)
        {
            if (!singletonMap) {
                singletonMap = [NSMutableDictionary dictionary];
            }
            
            instance = [[self alloc] init];
            singletonMap[NSStringFromClass([self class])] = instance;
        }
    }
    
    return instance;
}

- (instancetype)init
{
    if (self = [super init]) {
        CFLLog(@"Singleton [%@] begin init....", [self class]);
//        for (NSString *className in [[self class] necessaryPreviousAwakeClasses]) {
//            [NSClassFromString(className) shared];
//        }
        [self awake];
        CFLLog(@"Singleton [%@] end init....", [self class]);
    }
    
    return self;
}

- (void)awake
{

}

+ (NSArray *)necessaryPreviousAwakeClasses
{
    return nil;
}

@end
