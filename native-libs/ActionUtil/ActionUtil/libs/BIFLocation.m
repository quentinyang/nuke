//
//  BIFLocation.m
//  BIFCore
//
//  Created by Softwind.Tang on 14/12/1.
//  Copyright (c) 2014年 Plan B Inc. All rights reserved.
//

#import "BIFLocation.h"
#import "CFLMacros.h"

@interface BIFLocation () <CLLocationManagerDelegate>

@property (nonatomic, strong) CLLocation *location;
@property (nonatomic, strong) CLLocationManager *locationManager;
@property (nonatomic, strong) NSString *errorMessage;
@property (nonatomic, assign) BIFLocationServiceStatus status;
@property (nonatomic, strong) NSString *cityName;
@property (nonatomic, strong) NSString *BIFLocationServiceStatusChangeNotification;

@end

@implementation BIFLocation

#pragma mark - getters/setters

- (CLLocationManager *)locationManager
{
    if (!_locationManager) {
        _locationManager = [[CLLocationManager alloc] init];
        _locationManager.delegate = self;
        _locationManager.distanceFilter = 500.0f;
        _locationManager.desiredAccuracy = kCLLocationAccuracyBest;
    }
    
    return _locationManager;
}

#pragma mark - publics

- (void)startLocate:(BOOL)isRestart
{
    if (isRestart) {
        [self stopLocate];
    }
    
    [self.locationManager startUpdatingLocation];
}

- (void)stopLocate
{
    [self.locationManager stopUpdatingLocation];
}

- (void)setQALocation:(CLLocation *)QALocation
{
    //啦啦啦
}

#pragma mark - lifecycle

- (void)awake
{
    self.cityName = @"";
    self.BIFLocationServiceStatusChangeNotification = @"发发发发你妹的";
//    [self startLocate:NO];
//    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didBecomeActive:) name:UIApplicationDidBecomeActiveNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didEnterBackground:) name:UIApplicationDidEnterBackgroundNotification object:nil];
}

#pragma mark - CLLocationManagerDelegate

- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status
{
    switch ([CLLocationManager authorizationStatus]) {
        case kCLAuthorizationStatusNotDetermined:
            self.status = BIFLocationServiceStatusNotDetermined;
            if (SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(@"8.0")) {
                [self.locationManager requestWhenInUseAuthorization];
            }
            break;
            
        case kCLAuthorizationStatusAuthorizedWhenInUse:
        case kCLAuthorizationStatusAuthorizedAlways:
            self.status = BIFLocationServiceStatusOpen;
            break;
            
        case kCLAuthorizationStatusDenied:
        case kCLAuthorizationStatusRestricted:
            self.status = BIFLocationServiceStatusDenied;
            break;
            
        default:
            break;
    }    
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations
{
    self.location = [locations firstObject];
    if (!self.location) {
        return;
    }
    
    CLGeocoder *geo = [[CLGeocoder alloc] init];
    [geo reverseGeocodeLocation:self.location
              completionHandler:^(NSArray *placeMarkArray, NSError *error)
    {
        CLPlacemark *placemark = [placeMarkArray firstObject];
        if (!placemark) {
            return;
        }
        NSString *cityName = placemark.addressDictionary[@"State"];
        if (![self isZhixiashi:cityName]) {
            cityName = placemark.addressDictionary[@"City"];
        }
        if ([cityName hasSuffix:@"市"]) {
            cityName = [cityName substringToIndex:cityName.length - 1];
        }
        
        self.cityName = cityName;
        self.status = BIFLocationServiceStatusSucceeded;
        [self broadcastNotification];
    }];
}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
    self.errorMessage = error.localizedDescription;
    
    self.status = BIFLocationServiceStatusFailed;
    [self broadcastNotification];
}

#pragma mark - privates

- (void)broadcastNotification
{
    dispatch_async(dispatch_get_main_queue(), ^()
                   {
                       [[NSNotificationCenter defaultCenter] postNotificationName:self.BIFLocationServiceStatusChangeNotification
                                                                           object:nil
                                                                         userInfo:nil];
                   });
}

- (BOOL)isZhixiashi:(NSString *)cityName
{
    NSArray *array = @[@"北京市", @"上海市", @"天津市", @"重庆市"];
    for (NSString *city in array) {
        if ([cityName isEqualToString:city]) {
            return YES;
        }
    }
    
    return NO;
}

#pragma mark - notifications

- (void)didBecomeActive:(NSNotification *)notification
{
    [self startLocate:YES];
}

- (void)didEnterBackground:(NSNotification *)notification
{
    [self stopLocate];
}

@end
