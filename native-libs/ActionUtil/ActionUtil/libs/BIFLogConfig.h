//
//  BIFLogConfig.h
//  Pods
//
//  Created by xuxiongjian on 15/7/7.
//
//

#import "Device.h"
#import "App.h"
#import "BIFModel.h"

@interface BIFLogConfig : BIFModel

@property (nonatomic, strong) Device *device;
@property (nonatomic, strong) App *app;
@property (nonatomic, strong) NSArray *usages;

@end
