//
//  BIFKeychain.h
//  BIFCore
//
//  Created by wysasun on 14/12/3.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import "BIFObject.h"

@interface BIFKeychain : BIFObject

+ (NSString *)accessGroup;
+ (NSString *)bundleSeedID;

- (id)initWithService:(NSString *)service withGroup:(NSString *)group;
- (BOOL)insert:(NSString *)key data:(NSData *)data;
- (BOOL)update:(NSString *)key data:(NSData *)data;
- (BOOL)remove:(NSString *)key;
- (NSData *)find:(NSString *)key;

@end
