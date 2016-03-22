import {
    ActivityIndicatorIOS,
    ProgressBarAndroid,
    Platform
} from 'react-native';

module.exports = Platform.OS == 'ios' ? ActivityIndicatorIOS : ProgressBarAndroid;