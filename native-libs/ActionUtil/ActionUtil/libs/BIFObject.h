//
//  BIFObject.h
//  BIFCore
//
//  Created by Softwind.Tang on 14/12/2.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <objc/runtime.h>
static inline void BIF_swizzleSelector(Class class, SEL originalSelector, SEL swizzledSelector){
    Method originalMethod = class_getInstanceMethod(class, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(class, swizzledSelector);
    if (class_addMethod(class, originalSelector, method_getImplementation(swizzledMethod), method_getTypeEncoding(swizzledMethod))) {
        class_replaceMethod(class, swizzledSelector, method_getImplementation(originalMethod), method_getTypeEncoding(originalMethod));
    } else {
        method_exchangeImplementations(originalMethod, swizzledMethod);
    }
}

@protocol BIFObject <NSObject>

/**
 *  用字典来描述这个类，字典中包含类中的所有属性，以 属性名:属性值 为一个单位。
 *
 *  @return 代表这个类的字典。
 */
- (NSMutableDictionary *)dictionaryRepresentation;

@optional

/**
 *  方法重组，需要的情况下实现
 */
+ (void)swizzleSelector;
@end

@interface BIFObject : NSObject <BIFObject, NSCoding>

@end
