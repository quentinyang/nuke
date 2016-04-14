package com.xinyi.fy360.getui;

/**
 * Created by zhouxiaojian on 16/4/13.
 */
import android.bluetooth.BluetoothAdapter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.provider.Settings.Secure;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;


import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Nullable;

public class GeTuiModule extends ReactContextBaseJavaModule {
    ReactApplicationContext reactContext;

    private String clientId = "";
    private static GeTuiModule single = null;

    public GeTuiModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "GeTui";
    }

    public static GeTuiModule getInstance(ReactApplicationContext reactContext) {
        if (single == null) {
            single = new GeTuiModule(reactContext);
        }
        return single;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    @ReactMethod
    public void getClientId(Callback responseSenderBlock) {
        responseSenderBlock.invoke(clientId);
    }

    public void handleRemoteNotificationReceived(String eventName, @Nullable WritableMap params) {
        this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}
