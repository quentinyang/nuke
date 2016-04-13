//
//  BIFNetworkConfig.h
//  BIFNetwork
//
//  Created by Softwind.Tang on 14/12/2.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#ifndef BIFNetwork_BIFNetworkConfig_h
#define BIFNetwork_BIFNetworkConfig_h

typedef NS_ENUM(NSInteger, BIFAppType) {
    BIFAppTypeAnjuke,
    BIFAppTypeBroker,
    BIFAppTypeBIFang,
    BIFAppTypeErShouFang,
    BIFAppTypeHaozu
};

typedef NS_ENUM(NSUInteger, BIFURLResponseStatus)
{
    BIFURLResponseStatusOK = 200,
    BIFURLResponseStatusCreated = 201,
    BIFURLResponseStatusAccepted = 202,
    BIFURLResponseStatusNoContent = 204,
    BIFURLResponseStatusNotModified = 304,
    BIFURLResponseStatusBadRequest = 400,
    BIFURLResponseStatusUnAuthorized = 401,
    BIFURLResponseStatusForbidden = 403,
    BIFURLResponseStatusNotFound = 404,
    BIFURLResponseStatusInertnalError = 500,
    
    BIFURLResponseStatusKickError = 2802,
    
    BIFURLResponseStatusErrorTimeout = 10000,
    BIFURLResponseStatusErrorNoNetwork,
};

typedef NS_ENUM(NSUInteger, BIFURLRequestMethod)
{
    BIFURLRequestMethodGet,
    BIFURLRequestMethodPost,
    BIFURLRequestMethodPut,
    BIFURLRequestMethodDelete
};

static NSTimeInterval kBIFNetworkingTimeoutSeconds = 10.0f;

static NSString *BIFKeychainServiceName = @"com.anjukeApps";
static NSString *BIFUDIDName = @"anjukeAppsUDID";
static NSString *BIFPasteboardType = @"anjukeAppsContent";

static BOOL kBIFShouldCache = YES;
static NSTimeInterval kBIFCacheOutdateTimeSeconds = 300; // 5分钟的cache过期时间
static NSUInteger kBIFCacheCountLimit = 1000; // 最多1000条cache


#pragma mark - services

extern NSString * const kBIFServiceBroker;
extern NSString * const kBIFServiceAngejia;
extern NSString * const kBIFServiceChat;
extern NSString * const kBIFServiceCommon;
extern NSString * const kBIFServiceLog;
extern NSString * const kBIFServiceApiErrorLog;
extern NSString * const kBIFServiceHotFix;

/**
 *  for test
 */
extern NSString * const kBIFServiceTest;

#endif
