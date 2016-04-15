//
//  BIFAppConfig.h
//  BIFNetwork
//
//  Created by Softwind.Tang on 14/12/2.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import "BIFSingleton.h"
#import "BIFNetworkConfig.h"

@interface BIFAppConfig : BIFSingleton

#pragma mark - 公共参数

/**
 * 设备总内存(MB)
 */
@property (nonatomic, assign) double totalMemorySize;

/**
 * 当前设备可用内存(MB)
 */
@property (nonatomic, assign) double availableMemorySize;

/**
 * 获取设备型号
 */
@property (nonatomic, strong) NSString *deviceModel;

/**
 *  userId 名称
 */
@property (nonatomic, strong) NSString *userId;

/**
 *  app 名称
 */
@property (nonatomic, readonly) NSString *appName;

/**
 *  app version，app 版本号
 */
@property (nonatomic, readonly) NSString *appVerSion;

/**
 *  app chanalID,渠道号
 */
@property (nonatomic, readonly) NSString *chanalId;

/**
 *  用户选择的城市id
 */
@property (nonatomic, strong) NSString *ccid;

/**
 *  定位获得的城市id
 */
@property (nonatomic, strong) NSString *gcid;

/**
 *  定位获取的经度
 */
@property (nonatomic, strong) NSString *lng;

/**
 *  定位获取的纬度
 */
@property (nonatomic, strong) NSString *lat;
/**
 *  本机的ip
 */
@property (nonatomic, readonly) NSString *ip;

/**
 *  网络类型
 */
@property (nonatomic, readonly) NSString *net;

/**
 *  planform，返回 @"iOS"
 */
@property (nonatomic, readonly) NSString *p;

/**
 *  设备类型，ipad/iphone/ipod
 */
@property (nonatomic, readonly) NSString *pm;

/**
 *  操作系统版本
 */
@property (nonatomic, readonly) NSString *osv;

/**
 *  设备唯一识别码
 */
@property (nonatomic, readonly) NSString *uuid;

#pragma mark - app 总控制参数

/**
 *  api 是否为正式版本（在线版本）
 */
@property (nonatomic, assign) BOOL isApiOnline;

/**
 *  api 请求使用的口令
 */
@property (nonatomic, strong) NSString *apiHeadToken;

/**
 *  推送用的唯一标示符
 */
@property (nonatomic, strong) NSString *clientId;

/**
 *  每次后台到前台都会检查是否被踢，监听这个接口来接收账户目前的状态。notification.userInfo[@"status"] = 0(没登陆)/1(登录)/2(被踢)
 */
@property (nonatomic, strong) NSString *kApiTokenCheckResultNotification;

/**
 *  userAgent
 */
@property (nonatomic, strong) NSString *userAgent;

/**
 * webview种植cookie的domain
 */
@property (nonatomic, strong) NSString *webviewDomain;

#pragma mark - 网络状态

typedef NS_ENUM(NSUInteger, BIFNetworkDetailStatus)
{
    BIFNetworkDetailStatusNone,
    BIFNetworkDetailStatus2G,
    BIFNetworkDetailStatus3G,
    BIFNetworkDetailStatus4G,
    BIFNetworkDetailStatusLTE,
    BIFNetworkDetailStatusWIFI,
    BIFNetworkDetailStatusUnknown
};

/** 是否有网络 */
@property (nonatomic, readonly) BOOL isInternetAvailiable;

/** 是否有WIFI */
@property (nonatomic, readonly) BOOL isWiFiAvailiable;

/** 一个词描述网络状态 */
@property (nonatomic, readonly) NSString *networkStatusDescription;

/** 精确的网络状态，可区分2G/3G/4G/WIFI */
@property (nonatomic, readonly) BIFNetworkDetailStatus networkDetailStatus;

/** 网络状态切换时，会发送这个notification，但不会带任何信息。具体网络状态可查询 networkDetailStatus */
@property (nonatomic, readonly) NSString *networkChangedNotification;

/** 网络错误发送 Error Log 日志，模式分调试和非调试，这是由后端api决定 */
typedef NS_ENUM(NSUInteger, APIErrorLogMode) {
    APIErrorLogModeNotDebug, // 非调试
    APIErrorLogModeDebug, // 调试
};

@property (nonatomic, assign) APIErrorLogMode apiErrorMode;

// error log 是否回传服务器开关
@property (nonatomic, assign) BOOL isApiErrorLogToServer;

@end
