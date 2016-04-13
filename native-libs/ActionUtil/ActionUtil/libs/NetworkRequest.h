//
//  NetworkRequest.h
//  fy360
//
//  Created by benlinhuo on 16/4/12.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol NetworkRequestDelegate <NSObject>

- (void)didFinishWithResponse:(NSURLResponse *)response reformedData:(id)result;

- (void)didFailWithResponse:(NSURLResponse *)response;

@end

@interface NetworkRequest : NSObject

@property (nonatomic, weak) id<NetworkRequestDelegate> delegate;

- (void)doLogApiWithParams:(NSDictionary *)params;

@end
