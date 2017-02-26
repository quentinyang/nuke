//
//  BIFFileHandler.h
//  BIFCore
//
//  Created by Softwind.Tang on 14/12/4.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import "BIFObject.h"

typedef NS_ENUM(NSUInteger, BIFFileSystemPath)
{
    /**
     *  app 沙盒的 document 目录，这个目录下面的文件可以同步到 iCloud
     */
    BIFFileSystemPathDocument,
    
    /**
     *  app 沙盒的 cache 目录，这个目录下的文件主要是缓存，若被清理掉，必须不能影响 app 正常运行
     */
    BIFFileSystemPathCache,
    
    /**
     *  项目资源列表中的文件，比如 info.plist。这个目录下的文件只能读写，不能增删。
     */
    BIFFileSystemPathProjectResource,
};

@interface BIFFileHandler : BIFObject

/**
 *  文件数据，对它赋值会同时向文件写入新数据。
 *  这个数据的格式可以是 NSData, NSDictionary, NSArray, NSString
 *  若格式错误，则只赋值，不写到文件。
 */
@property (nonatomic, strong) NSObject *dataOfFile;

/**
 *  文件路径
 */
@property (nonatomic, readonly, copy) NSString *pathOfFile;

/**
 *  文件中的数据格式。
 *  这个数据的格式可以是 NSData, NSDictionary, NSArray, NSString
 */
@property (nonatomic, copy) Class classOfFileData;

/**
 *  确保这个路径的存在。如果不存在，则创建之，使它存在。
 *
 *  @param path       路径名
 *  @param isFolder   是否文件夹
 *  @param systemPath 挂靠于哪个系统目录下
 */
+ (void)ensurePathExist:(NSString *)path
               isFolder:(BOOL)isFolder
     appendToSystemPath:(BIFFileSystemPath)systemPath;

/**
 *  删除一个路径
 *
 *  @param path       路径名
 *  @param systemPath 挂靠于哪个系统目录下
 */
+ (BOOL)removePath:(NSString *)path
appendToSystemPath:(BIFFileSystemPath)systemPath;

/**
 *  获取绝对路径
 *
 *  @param path       路径名
 *  @param systemPath 挂靠于哪个系统目录下
 *
 *  @return 绝对路径名
 */
+ (NSString *)absolutePathWithUserPath:(NSString *)path
                    appendToSystemPath:(BIFFileSystemPath)systemPath;

/**
 *  构造函数。systemPath 为 BIFFileSystemPathProjectResource时会调用另外一个文件读写构造函数。
 *
 *  @param path       路径名
 *  @param systemPath 挂靠于哪个目录下
 *
 *  @return 实例。
 */
- (instancetype)initWithPath:(NSString *)path
          appendToSystemPath:(BIFFileSystemPath)systemPath;

/**
 *  适用于读写预定义的项目资源的构造函数。
 *
 *  @param file      资源名，如 info
 *  @param type      资源类别， plist
 *
 *  @return 实例。
 */
- (instancetype)initWithResourceFile:(NSString *)file
                                type:(NSString *)type;

/**
 *  释放读文件所占的内存。
 *  再次访问 dataOfFile 又会占回内存。
 */
- (void)freeMemory;

/**
 *  重新从文件中读取内容。不常用，用于文件被另外的实例改变的情况下。
 */
- (void)reloadFile;

@end
