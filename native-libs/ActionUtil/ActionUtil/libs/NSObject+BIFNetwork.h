//
//  NSObject+BIFNetwork.h
//  BIFNetwork
//
//  Created by Softwind.Tang on 14/12/2.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSObject (BIFNetwork)

- (id)BIF_defaultValue:(id)defaultData;
- (BOOL)BIF_isEmptyObject;

- (NSString *)BIF_encodedJsonString;
- (NSString *)BIF_jsonString;

- (NSString *)BIF_RESTParamsValue;

+ (instancetype)jsonObjectWithString:(NSString *)jsonStr;

@end
