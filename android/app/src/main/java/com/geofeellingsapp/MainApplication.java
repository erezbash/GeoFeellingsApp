package com.geofeellingsapp;

import android.app.Activity;
import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import ga.piroro.rnt.RNTPackage;

import com.reactnativenavigation.controllers.ActivityCallbacks;
import com.wix.reactnativenotifications.RNNotificationsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    @Override
    public void onCreate() {
        super.onCreate();
        setActivityCallbacks(new ActivityCallbacks() {
            @Override
            public void onActivityResult(int requestCode, int resultCode, Intent data) {
                super.onActivityResult(requestCode, resultCode, data);
                MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
            }
        });
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new FBSDKPackage(mCallbackManager),
                new RNTPackage(),
                new LocationReactPackage(),
                new RNNotificationsPackage(MainApplication.this));
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }
}
