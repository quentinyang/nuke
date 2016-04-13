//
//  BIFUUIDGenerator.h
//  BIFCore
//
//  Created by wysasun on 14/12/3.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import "BIFSingleton.h"

@interface BIFUUID : BIFSingleton

@property (nonatomic, copy, readonly) NSString *uuid;

@end
