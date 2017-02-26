//
//  BIFLocation.h
//  BIFCore
//
//  Created by Softwind.Tang on 14/12/1.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

#import "BIFSingleton.h"

typedef NS_ENUM(NSUInteger, BIFLocationServiceStatus)
{
    /**
     *  定位服务被打开
     */
    BIFLocationServiceStatusOpen,
    
    /**
     *  定位服务正在请求权限
     */
    BIFLocationServiceStatusNotDetermined,
    
    /**
     *  定位服务权限请求被拒绝
     */
    BIFLocationServiceStatusDenied,
    
    /**
     *  网络不给力
     */
    BIFLocationServiceStatusNetworkDisabled,
    
    /**
     *  定位服务打开，并已经定位成功
     */
    BIFLocationServiceStatusSucceeded,
    
    /**
     *  定位服务打开，但是定位失败
     */
    BIFLocationServiceStatusFailed,
};

/**
 *  公共基础定位服务
 */
@interface BIFLocation : BIFSingleton

/**
 *  定位获取的坐标
 */
@property (nonatomic, readonly) CLLocation *location;

/**
 *  定位获取的城市名
 */
@property (nonatomic, readonly) NSString *cityName;

/**
 *  定位服务的状态
 */
@property (nonatomic, readonly) BIFLocationServiceStatus status;

/**
 *  错误信息
 */
@property (nonatomic, readonly) NSString *errorMessage;

/**
 *  定位服务的状态改变后，将得到此通知。此通知发往主线程。用户收到此通知后可以访问本类的 status 属性。
 */
@property (nonatomic, readonly) NSString *BIFLocationServiceStatusChangeNotification;

/**
 *  激活定位服务。
 *
 *  @param isRestart 标志是否是重启。
 */
- (void)startLocate:(BOOL)isRestart;

/**
 *  关闭定位服务。
 */
- (void)stopLocate;

/**
 *  设置 QA 模式下的假位置，设置完了之后 location 属性就变成了假位置。
 *
 *  @param QALocation 假位置的坐标。参数为 nil 表示消去假位置，恢复使用定位坐标。
 */
- (void)setQALocation:(CLLocation *)QALocation;

@end
