//
//  NSString+BIFNetwork.m
//  BIFNetwork
//
//  Created by Softwind.Tang on 14/12/2.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import "NSString+BIFNetwork.h"
#import "NSObject+BIFNetwork.h"

#import <CommonCrypto/CommonCrypto.h>

@implementation NSString (BIFNetwork)

- (NSString *)BIF_encodedString
{
    NSString *encoded = (NSString *)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(NULL, /* allocator */
                                                                                              (CFStringRef)self,
                                                                                              NULL, /* charactersToLeaveUnescaped */
                                                                                              (CFStringRef)@"!*'():@&=+$,/?%#[]",
                                                                                              kCFStringEncodingUTF8));
    return encoded;
}

@end
