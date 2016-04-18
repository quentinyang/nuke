//
//  NetworkRequest.m
//  fy360
//
//  Created by benlinhuo on 16/4/12.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "NetworkRequest.h"

@implementation NetworkRequest

- (void)doLogApiWithParams:(NSDictionary *)params
{
    
    /*params = @{
               @"app": @{
                        @"name": @"k-angejia",
                        @"ver": @"3.1111",
                        @"ch": @"PPPP"
                       },
               @"device": @{
                       @"model": @"sdfsdfsdf"
                       },
               @"usages": @[
                       @{
                           
                               @"ip" : @"192.168.111.111",
                               @"uid" : @"",
                               @"ccid" : @"",
                               @"logs" : @[
                                         @{
                                             @"clickTime" : @"1460428257",
                                             @"action" : @"1-1000001",
                                             @"extend" : @{
                                                 @"bp" : @""
                                             }
                                         }
                                         ],
                               @"geo" : @"",
                               @"net" : @"WIFI",
                               @"gcid" : @""
                           

                           }
                       ]
               };*/
    

#if DEBUG
    NSString *ip = @"http://192.168.160.45/";
#else
    NSString *ip = @"http://s.angejia.com/";
#endif
    
    NSString *host = [ip stringByAppendingString:@"uba?payload=app_action"];
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:[NSURL URLWithString:host]];
    [request setHTTPMethod:@"POST"];
    [request setValue:@"application/json" forHTTPHeaderField:@"content-type"];
    
    request.HTTPBody = [NSJSONSerialization dataWithJSONObject:params
                                                       options:0
                                                         error:nil];
    
    
    [self sendApi:request];
}

- (void)sendApi:(NSURLRequest *)request
{
    NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
    NSURLSession *session = [NSURLSession sessionWithConfiguration:config];
  
    __weak typeof(self) wSelf = self;
    NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
      
            NSString *resultString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
            NSHTTPURLResponse *retResponse = (NSHTTPURLResponse *)response;
          
            NSLog(@"\n###########\n request url:%@\n ###########\n http header:%@ \n ###########\n HTTPBody:%@ \n result:%@ \n ###########\n error code :%li",request.URL.absoluteString,request.allHTTPHeaderFields,[[NSString alloc] initWithData:request.HTTPBody encoding:NSUTF8StringEncoding],resultString,(long)retResponse.statusCode);
      
            if (!error) {
                if (wSelf.delegate && [wSelf.delegate respondsToSelector:@selector(didFinishWithResponse:reformedData:)]) {
                    [wSelf.delegate didFinishWithResponse:retResponse reformedData:data];
                }
            } else {
              if (wSelf.delegate && [wSelf.delegate respondsToSelector:@selector(didFailWithResponse:)]) {
                    [wSelf.delegate didFailWithResponse:retResponse];
                }
            }
    }];
  
  
  [dataTask resume];
  
}

@end
