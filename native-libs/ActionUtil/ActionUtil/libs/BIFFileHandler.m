//
//  BIFFileHandler.m
//  BIFCore
//
//  Created by Softwind.Tang on 14/12/4.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import "BIFFileHandler.h"
#import "CFLMacros.h"

@interface BIFFileHandler ()

@property (nonatomic, readwrite, copy) NSString *pathOfFile;
@property (nonatomic, assign) BIFFileSystemPath pathType;

@end

@implementation BIFFileHandler

@synthesize dataOfFile = _dataOfFile;

#pragma mark - getters/setters

- (NSObject *)dataOfFile
{
    if (!_dataOfFile) {
        _dataOfFile = [[self.classOfFileData alloc] initWithContentsOfFile:self.pathOfFile];
    }
    
    return _dataOfFile;
}

- (void)setDataOfFile:(NSObject *)dataOfFile
{
    _dataOfFile = dataOfFile;
    
    if (!_dataOfFile && self.pathType != BIFFileSystemPathProjectResource) {
        [[self class] removeItemAtPath:self.pathOfFile];
        self.classOfFileData = Nil;
    } else if ([_dataOfFile isKindOfClass:[NSData class]]) {
        self.classOfFileData = [NSData class];
        NSData *data = (NSData *)_dataOfFile;
        [data writeToFile:self.pathOfFile atomically:YES];
    } else if ([_dataOfFile isKindOfClass:[NSDictionary class]]) {
        self.classOfFileData = [NSDictionary class];
        NSDictionary *dic = (NSDictionary *)_dataOfFile;
        [dic writeToFile:self.pathOfFile atomically:YES];
    } else if ([_dataOfFile isKindOfClass:[NSArray class]]) {
        self.classOfFileData = [NSArray class];
        NSArray *array = (NSArray *)_dataOfFile;
        [array writeToFile:self.pathOfFile atomically:YES];
    } else if ([_dataOfFile isKindOfClass:[NSString class]]) {
        self.classOfFileData = [NSString class];
        NSString *str = (NSString *)_dataOfFile;
        [str writeToFile:self.pathOfFile atomically:YES encoding:NSUTF8StringEncoding error:nil];
    }
}

#pragma mark - life cycle

- (instancetype)initWithPath:(NSString *)path appendToSystemPath:(BIFFileSystemPath)systemPath
{
    if (systemPath == BIFFileSystemPathProjectResource) {
        if ([path rangeOfString:@"/"].length > 0) {
            CFLLog(@"参数错误，%@", path);
            return nil;
        }
        
        NSArray *filename = [path componentsSeparatedByString:@"."];
        if ([filename count] != 2) {
            CFLLog(@"参数错误，%@", path);
            return nil;
        }
        
        return [self initWithResourceFile:[filename firstObject]
                                     type:[filename lastObject]];
    }
    
    if (self = [super init]) {
        self.pathOfFile = [[self class] absolutePathWithUserPath:path
                                              appendToSystemPath:systemPath];
        self.pathType = systemPath;
        
        [[self class] ensurePathExist:path
                             isFolder:NO
                   appendToSystemPath:systemPath];
    }
    
    return self;
}

- (instancetype)initWithResourceFile:(NSString *)file type:(NSString *)type
{
    if (self = [super init]) {
        self.pathOfFile = [[NSBundle mainBundle] pathForResource:file
                                                          ofType:type];
        self.pathType = BIFFileSystemPathProjectResource;
        self.classOfFileData = [NSDictionary class];
    }
    
    return self;
}

#pragma mark - publics

+ (void)ensurePathExist:(NSString *)path
               isFolder:(BOOL)isFolder
     appendToSystemPath:(BIFFileSystemPath)systemPath
{
    if (systemPath == BIFFileSystemPathProjectResource) {
        return;
    }
    
    NSArray *pathArray = [path componentsSeparatedByString:@"/"];
    NSMutableString *mutablePath = [[NSMutableString alloc] init];
    [mutablePath appendString:[self absolutePathWithUserPath:nil
                                          appendToSystemPath:systemPath]];
    for (int i = 0; i < [pathArray count]; ++ i) {
        [mutablePath appendFormat:@"/%@", pathArray[i]];
        [self ensurePathExistWithSuperPathEnsured:mutablePath
                                         isFolder:i == [pathArray count] - 1 ? isFolder : YES];
    }
}

+ (BOOL)removePath:(NSString *)path appendToSystemPath:(BIFFileSystemPath)systemPath
{
    if (systemPath == BIFFileSystemPathProjectResource) {
        return NO;
    }
    
    return [self removeItemAtPath:[self absolutePathWithUserPath:path
                                              appendToSystemPath:systemPath]];
}

- (void)freeMemory
{
    _dataOfFile = nil;
}

- (void)reloadFile
{
    _dataOfFile = nil;
    [self dataOfFile];
}

+ (NSString *)absolutePathWithUserPath:(NSString *)path appendToSystemPath:(BIFFileSystemPath)systemPath
{
    NSSearchPathDirectory directory = NSCachesDirectory;
    switch (systemPath) {
        case BIFFileSystemPathDocument:
            directory = NSDocumentDirectory;
            break;
            
        case BIFFileSystemPathCache:
        default:
            break;
    }
    
    NSString *prefix = [NSSearchPathForDirectoriesInDomains(directory, NSUserDomainMask, YES) firstObject];
    return path.length > 0 ? [prefix stringByAppendingFormat:@"/%@", path] : prefix;
}

#pragma mark - privates

+ (BOOL)ensurePathExistWithSuperPathEnsured:(NSString *)path isFolder:(BOOL)isFolder
{
    NSFileManager *fm = [NSFileManager defaultManager];
    BOOL isDirectory;
    BOOL test = [fm fileExistsAtPath:path isDirectory:&isDirectory];
    if (test && (isDirectory == isFolder)) {
        return YES;
    }
    
    NSError *error = nil;
    if (isFolder) {
        [fm createDirectoryAtPath:path
      withIntermediateDirectories:NO
                       attributes:nil
                            error:&error];
    } else {
        [fm createFileAtPath:path
                    contents:nil
                  attributes:nil];
    }
    
    //文件已经存在，创建文件夹时，存在同名的文件。这里直接删除同名文件。因此，使用本方法需慎重，防止数据丢失。
    if (error.code == 516) {
        error = nil;
        [fm removeItemAtPath:path
                       error:&error];
        if (!error) {
            return [self ensurePathExistWithSuperPathEnsured:path
                                                    isFolder:isFolder];
        } else {
            //删除失败？什么鬼？
            return NO;
        }
    }
    
    //未知错误。
    return !error;
}

+ (BOOL)removeItemAtPath:(NSString *)absPath
{
    NSFileManager *fm = [NSFileManager defaultManager];
    return [fm removeItemAtPath:absPath error:nil];
}

@end
