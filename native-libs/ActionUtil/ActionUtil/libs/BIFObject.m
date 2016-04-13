//
//  BIFObject.m
//  BIFCore
//
//  Created by Softwind.Tang on 14/12/2.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import "BIFObject.h"
#import "CFLMacros.h"

#import <objc/runtime.h>

@implementation BIFObject

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"

- (NSMutableDictionary *)dictionaryRepresentation
{
    unsigned int count;
    objc_property_t *properties = class_copyPropertyList([self class], &count);
    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    for (int i = 0; i < count; ++ i) {
        NSString *key = [NSString stringWithUTF8String:property_getName(properties[i])];
        if ([self respondsToSelector:NSSelectorFromString(key)]) {
            id value = [self valueForKey:key];
            dic[key] = value ? value : @"";
        }
    }
    return dic;
}

#pragma clang diagnostic pop

#pragma mark - NSCoding

- (id)initWithCoder:(NSCoder *)aDecoder
{
    if (self = [super init]) {
        
    }
    
    return self;
}

- (void)encodeWithCoder:(NSCoder *)aCoder
{
    CFLLog(@"encode object [%@]%@", [self class], self);
}

@end
