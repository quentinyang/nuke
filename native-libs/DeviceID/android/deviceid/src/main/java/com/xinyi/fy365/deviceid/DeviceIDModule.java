package com.xinyi.fy365.deviceid;

/**
 * Created by angejia on 16/5/9.
 */

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import android.telephony.TelephonyManager;
import android.content.Context;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.Nullable;

public class DeviceIDModule extends ReactContextBaseJavaModule {
    TelephonyManager mTelephonyMgr;

    public DeviceIDModule(ReactApplicationContext reactContext) {
        super(reactContext);

        mTelephonyMgr = (TelephonyManager) reactContext.getSystemService(Context.TELEPHONY_SERVICE);
    }

    @Override
    public String getName() {
        return "DeviceID";
    }

    @Override
    public @Nullable Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<String, Object>();

        constants.put("deviceId", mTelephonyMgr.getDeviceId());
        return constants;
    }
}
