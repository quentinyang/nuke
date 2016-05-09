var DeviceID = require('react-native').NativeModules.DeviceID;

module.exports = {
    getDeviceId: function() {
        return DeviceID.deviceId;
    }
};