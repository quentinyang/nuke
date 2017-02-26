//
//  BIFKeychain.m
//  BIFCore
//
//  Created by wysasun on 14/12/3.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import "BIFKeychain.h"

@interface BIFKeychain ()

@property (nonatomic, copy) NSString *service;
@property (nonatomic, copy) NSString *group;

@end

@implementation BIFKeychain

+ (NSString *)accessGroup
{
    NSDictionary *query = [NSDictionary dictionaryWithObjectsAndKeys:
                           (__bridge id)(kSecClassGenericPassword), kSecClass,
                           @"bundleSeedID", kSecAttrAccount,
                           @"", kSecAttrService,
                           (id)kCFBooleanTrue, kSecReturnAttributes,
                           nil];
    CFDictionaryRef result = nil;
    OSStatus status = SecItemCopyMatching((__bridge CFDictionaryRef)query, (CFTypeRef *)&result);
    if (status == errSecItemNotFound) {
        status = SecItemAdd((__bridge CFDictionaryRef)query, (CFTypeRef *)&result);
    }
    if (status != errSecSuccess) {
        return @"";
    }
    NSString *accessGroup = [(__bridge NSDictionary *)result objectForKey:(__bridge id)(kSecAttrAccessGroup)];
    CFRelease(result);
    return accessGroup;
}

+ (NSString *)bundleSeedID
{
    NSString *accessGroup = [self accessGroup];
    NSArray *components = [accessGroup componentsSeparatedByString:@"."];
    NSString *bundleSeedID = [[components objectEnumerator] nextObject];
    return bundleSeedID;
}

- (id)initWithService:(NSString *)service withGroup:(NSString *)group
{
    self = [super init];
    if (self)
    {
        _service = [NSString stringWithString:service];
        if (group) {
            _group = [NSString stringWithString:group];
        }
    }
    
    return  self;
}

- (NSMutableDictionary *)prepareDict:(NSString *)key
{
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    [dict setObject:(__bridge id)kSecClassGenericPassword forKey:(__bridge id)kSecClass];
    
    NSData *encodedKey = [key dataUsingEncoding:NSUTF8StringEncoding];
    [dict setObject:encodedKey forKey:(__bridge id)kSecAttrGeneric];
    [dict setObject:encodedKey forKey:(__bridge id)kSecAttrAccount];
    [dict setObject:self.service forKey:(__bridge id)kSecAttrService];
    
    //This is for sharing data across apps
    if (self.group) {
        [dict setObject:self.group forKey:(__bridge id)kSecAttrAccessGroup];
    }
    
    return  dict;
}

- (BOOL)insert:(NSString *)key data:(NSData *)data
{
    NSMutableDictionary * dict = [self prepareDict:key];
    [dict setObject:(__bridge id)kSecAttrAccessibleAlwaysThisDeviceOnly forKey:(__bridge id)kSecAttrAccessible];
    [dict setObject:data forKey:(__bridge id)kSecValueData];
    
    OSStatus status = SecItemAdd((__bridge CFDictionaryRef)dict, NULL);
    if (status != errSecSuccess) {
        NSString *msg = [NSString stringWithFormat:@"Unable add item with key =%@ error:%d", key, (int)status];
        assert(msg);
    }
    return (status == errSecSuccess);
}

- (NSData *)find:(NSString *)key
{
    NSMutableDictionary *dict = [self prepareDict:key];
    [dict setObject:(__bridge id)kSecMatchLimitOne forKey:(__bridge id)kSecMatchLimit];
    [dict setObject:(id)kCFBooleanTrue forKey:(__bridge id)kSecReturnData];
    CFTypeRef result = NULL;
    OSStatus status = SecItemCopyMatching((__bridge CFDictionaryRef)dict,&result);
    
    if (status != errSecSuccess) {
        NSString *msg = [NSString stringWithFormat:@"Unable to fetch item for key %@ with error:%d",key,(int)status];
        assert(msg);
        return nil;
    }
    
    return (__bridge NSData *)result;
}

- (BOOL)update:(NSString *)key data:(NSData *)data
{
    NSMutableDictionary * dictKey = [self prepareDict:key];
    [dictKey setObject:(__bridge id)kSecAttrAccessibleAlwaysThisDeviceOnly forKey:(__bridge id)kSecAttrAccessible];
    
    NSMutableDictionary * dictUpdate = [[NSMutableDictionary alloc] init];
    [dictUpdate setObject:data forKey:(__bridge id)kSecValueData];
    
    OSStatus status = SecItemUpdate((__bridge CFDictionaryRef)dictKey, (__bridge CFDictionaryRef)dictUpdate);
    if (status != errSecSuccess) {
        NSString *msg = [NSString stringWithFormat:@"Unable add update with key =%@ error:%d",key,(int)status];
        assert(msg);
    }
    return (status == errSecSuccess);
}

- (BOOL)remove:(NSString *)key
{
    NSMutableDictionary *dict = [self prepareDict:key];
    [dict setObject:(__bridge id)kSecAttrAccessibleAlwaysThisDeviceOnly forKey:(__bridge id)kSecAttrAccessible];
    
    OSStatus status = SecItemDelete((__bridge CFDictionaryRef)dict);
    if (status != errSecSuccess) {
        NSString *msg = [NSString stringWithFormat:@"Unable to remove item for key %@ with error:%d", key, (int)status];
        assert(msg);
    }
    return (status == errSecSuccess);
}

@end
