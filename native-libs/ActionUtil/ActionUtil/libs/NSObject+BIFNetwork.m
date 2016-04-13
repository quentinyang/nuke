//
//  NSObject+BIFNetwork.m
//  BIFNetwork
//
//  Created by Softwind.Tang on 14/12/2.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import "NSObject+BIFNetwork.h"
#import "NSString+BIFNetwork.h"
#import "CFLMacros.h"

@implementation NSObject (BIFNetwork)

- (id)BIF_defaultValue:(id)defaultData
{
    if (![defaultData isKindOfClass:[self class]]) {
        return defaultData;
    }
    
    if ([self BIF_isEmptyObject]) {
        return defaultData;
    }
    
    return self;
}

- (BOOL)BIF_isEmptyObject
{
    if ([self isEqual:[NSNull null]]) {
        return YES;
    }
    
    if ([self isKindOfClass:[NSString class]]) {
        if ([(NSString *)self length] == 0) {
            return YES;
        }
    }
    
    if ([self isKindOfClass:[NSArray class]]) {
        if ([(NSArray *)self count] == 0) {
            return YES;
        }
    }
    
    if ([self isKindOfClass:[NSDictionary class]]) {
        if ([(NSDictionary *)self count] == 0) {
            return YES;
        }
    }
    
    return NO;
}

- (NSString *)BIF_encodedJsonString
{
    NSMutableString *jsonString = [NSMutableString stringWithString:[self BIF_jsonString]];
    if (!jsonString) {
        return nil;
    }
    
    return [jsonString BIF_encodedString];
}

- (NSString *)BIF_jsonString
{
    if (![self isKindOfClass:[NSDictionary class]] &&
        ![self isKindOfClass:[NSArray class]]) {
        return nil;
    }
    
    NSError *error = nil;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:self
                                                       options:0
                                                         error:&error];
    if (error) {
        CFLLog(@"json convert error, object = %@", self);
        return nil;
    }
    
    return [[NSString alloc] initWithData:jsonData
                                 encoding:NSUTF8StringEncoding];
}

- (NSString *)BIF_RESTParamsValue
{
    if ([self isKindOfClass:[NSString class]]) {
        return (NSString *)self;
    }
    
    NSArray *array = (NSArray *)self;
    if ([array isKindOfClass:[NSArray class]] &&
        [array count] > 0) {
        NSMutableString *str = [[NSMutableString alloc] initWithString:array[0]];
        for (int i = 1; i < [array count]; ++ i) {
            NSString *cell = array[i];
            [str appendFormat:@";%@", cell];
        }
        return str;
    }
    
    return @"";
}

+ (instancetype)jsonObjectWithString:(NSString *)jsonStr
{
    NSError *error = nil;
    id v = [NSJSONSerialization JSONObjectWithData:[jsonStr dataUsingEncoding:NSUTF8StringEncoding]
                                           options:NSJSONReadingMutableContainers
                                             error:&error];
    if (error) {
        CFLLog(@"你妹，什么破 json: %@", jsonStr);
        return nil;
    }
    
    return v;
}

@end
