package com.xinyi.fy360.getui;

/**
 * Created by zhouxiaojian on 16/4/13.
 */
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

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

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    @ReactMethod
    public void getClientId(Callback responseSenderBlock) {
        responseSenderBlock.invoke(clientId);
    }

    public void handleRemoteNotificationReceived(String eventName, String params) {
        Log.d("handle", "handleRemoteNotificationReceived...");

        try {
            this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
        } catch (RuntimeException e) {
            e.printStackTrace();
        }
    }
}
