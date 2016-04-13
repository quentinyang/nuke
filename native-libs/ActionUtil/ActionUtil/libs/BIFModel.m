//
//  BIFModel.m
//  BIFCore
//
//  Created by Softwind.Tang on 15/1/7.
//  Copyright (c) 2015年 Plan B Inc. All rights reserved.
//

#import "BIFModel.h"
#import "CFLMacros.h"

NSString * const kBIFModelPropertyDefaultValue = @"";

@implementation BIFModel

#pragma mark - publics

+ (NSArray *)keyPathInApiResponse
{
    return @[@"items"];
}

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"

- (void)loadPropertiesWithData:(NSDictionary *)data
{
    if (![data isKindOfClass:[NSDictionary class]]) {
        CFLLog(@"load property error, data is not dictionary: %@", data);
        return;
    }
    
    for (NSString *key in [data keyEnumerator]) {
        if ([self respondsToSelector:NSSelectorFromString(key)]) {
            NSString *setter = [NSString stringWithFormat:@"set%@%@:",
                                [[key substringToIndex:1] uppercaseString],
                                [key substringFromIndex:1]];
            [self performSelector:NSSelectorFromString(setter)
                       withObject:data[key]];
        }
    }
}

#pragma clang diagnostic pop

- (NSArray *)loadArrayPropertyWithDataSource:(NSArray *)data requireModel:(NSString *)model
{
    if (![data isKindOfClass:[NSArray class]]) {
        CFLLog(@"load array property error, data is not array: %@", data);
        return nil;
    }
    
    NSMutableArray *p = [NSMutableArray array];
    for (NSDictionary *dic in data) {
        BIFModel *m = [[NSClassFromString(model) alloc] init];
        if (![m isKindOfClass:[BIFModel class]]) {
            CFLLog(@"load array property error, requireModel [%@] is not subclass of BIFModel", model);
            return nil;
        }
        [m loadPropertiesWithData:dic];
        [p addObject:m];
    }

    return p;
}

#pragma mark - life cycle

- (instancetype)init
{
    if (self = [super init]) {
        [self resetAllValues];
    }
    
    return self;
}

#pragma mark - dictionaryRepresentation

/**
 *  全反射！
 */
- (NSMutableDictionary *)dictionaryRepresentation
{
    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    
    unsigned int count;
    objc_property_t *properties = class_copyPropertyList([self class], &count);
    
    //加id、name
    if ([[self class] isKindOfClass:[BIFNameWithIdModel class]] || [[self class] isSubclassOfClass:[BIFNameWithIdModel class]]) {
        dic[@"id"] = [self valueForKey:@"id"];
        dic[@"name"] = [self valueForKey:@"name"];
    }
    
    for (int i = 0; i < count; ++ i) {
        NSString *propertyClassName = [self classNameFromType:CStringToNSSting(property_getAttributes(properties[i]))];
        NSString *propertyName = CStringToNSSting(property_getName(properties[i]));
        id propertyValue = [self valueForKey:propertyName];
        
        if (!propertyValue) {
            continue;
        }
        
        //是 BIFModel 的子类
        if ([NSClassFromString(propertyClassName) isSubclassOfClass:[BIFModel class]]) {
            dic[propertyName] = [propertyValue dictionaryRepresentation];
            continue;
        }
        
        //是数组
        if (NSClassFromString(propertyClassName) == [NSArray class]) {
            NSMutableArray *array = [NSMutableArray array];
            for (BIFModel *model in propertyValue) {
                //目前只支持一层数组，若嵌套了两层数组，再贱→_→
                if ([model isKindOfClass:[BIFModel class]]) {
                    NSMutableDictionary *modelDict = [NSMutableDictionary dictionaryWithDictionary:[model dictionaryRepresentation]];
                    
                    [array addObject:modelDict];
                } else {
                    [array addObject:model];
                }
            }
            dic[propertyName] = array;
            continue;
        }
        
        //其他情况
        dic[propertyName] = propertyValue;
    }
    free(properties);//否则内存泄漏

    return dic;
}

#pragma mark - reset values

- (void)resetAllValues
{
    [self resetAllValuesInClass:[self class]];
}

- (void)resetAllValuesInClass:(Class)class
{
    if ([class superclass] != [BIFModel class]) {
        [self resetAllValuesInClass:[class superclass]];
    }
    
    unsigned int count;
    objc_property_t *properties = class_copyPropertyList(class, &count);
    
    
    for (int i = 0; i < count; ++ i) {
        NSString *propertyClassName = [[NSString alloc] initWithCString:property_getAttributes(properties[i])
                                                               encoding:NSUTF8StringEncoding];
        propertyClassName = [self classNameFromType:propertyClassName];
        NSString *propertyName = [[NSString alloc] initWithCString:property_getName(properties[i])
                                                          encoding:NSUTF8StringEncoding];
        
        if (!propertyClassName) {
            continue;
        }
        
        //是 字符串 （一般属性）
        if ([propertyClassName isEqualToString:@"NSString"]) {
            [self setValue:kBIFModelPropertyDefaultValue
                    forKey:propertyName];
            continue;
        }
        
        //是嵌套类
        if ([NSClassFromString(propertyClassName) isSubclassOfClass:[BIFModel class]]) {
            BIFModel *model = [[NSClassFromString(propertyClassName) alloc] init];
            [self setValue:model
                    forKey:propertyName];
        }
        
    }
    free(properties);//否则内存泄漏

}

- (NSString *)classNameFromType:(NSString *)propertyType
{
    NSArray *array = [propertyType componentsSeparatedByString:@"\""];
    if ([array count] == 3) {
        return array[1];
    } else {
        return nil;
    }
}

#pragma mark - NSCoding

- (id)initWithCoder:(NSCoder *)aDecoder
{
    self = [super initWithCoder:aDecoder];
    
    return self;
}

- (void)encodeWithCoder:(NSCoder *)aCoder
{
    [super encodeWithCoder:aCoder];
}

@end

@implementation BIFNameWithIdModel

- (id)initWithCoder:(NSCoder *)aDecoder {
    self = [super initWithCoder:aDecoder];
    if (self) {
        self.id = [aDecoder decodeObjectForKey:[NSString stringWithFormat:@"%@%@", NSStringFromClass([self class]), @"id"]];
        self.name = [aDecoder decodeObjectForKey:[NSString stringWithFormat:@"%@%@", NSStringFromClass([self class]), @"name"]];
    }
    return self;
}

- (void)encodeWithCoder:(NSCoder *)aCoder {
    [super encodeWithCoder:aCoder];
    [aCoder encodeObject:self.id forKey:[NSString stringWithFormat:@"%@%@", NSStringFromClass([self class]), @"id"]];
    [aCoder encodeObject:self.name forKey:[NSString stringWithFormat:@"%@%@", NSStringFromClass([self class]), @"name"]];
}
@end
