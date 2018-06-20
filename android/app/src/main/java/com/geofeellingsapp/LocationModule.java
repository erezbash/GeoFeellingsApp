package com.geofeellingsapp;
import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.os.Bundle;
import java.util.Map;
import java.util.HashMap;

import android.content.Context;



import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.app.PendingIntent;
import android.app.AlarmManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.*;
import java.util.Calendar;


public class LocationModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext context;

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }
    @ReactMethod
    public void startSendLocation(String user) {
        //String myprop;
        //System.setProperty("USERID", user);
        startAlarmManager(user);
    }
    @ReactMethod
    public void stopLocation(){
         Log.v("ReactNative", "---------stopLocation---------");
         Intent intent = new Intent(context, MyService.class);
         PendingIntent pendingIntent = PendingIntent.getService(context, 0, intent, 0);
         AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
         alarmManager.cancel(pendingIntent);
    }
    @Override
    public String getName() {
        return "LocationExample";
    }

    public void startAlarmManager(String user)
        {
             AlarmManager alarmMgr;
             PendingIntent pendingIntent;
             Intent i = new Intent(context, MyService.class);
             boolean isWorking = (PendingIntent.getService(context, 0, i, PendingIntent.FLAG_NO_CREATE) != null);

             if (!isWorking){
                 Log.v("ReactNative", "---------startAlarmManager---------");
                 Bundle bundle = new Bundle();
                 bundle.putCharSequence("extraData", user);
                 context.startService(new Intent(context, MyService.class).putExtras(bundle));
                 Calendar cal = Calendar.getInstance();
                 Intent intent = new Intent(context, MyService.class);

                 intent.putExtras(bundle);

                 PendingIntent pintent = PendingIntent.getService(context, 0, intent, 0);


                 AlarmManager alarm = (AlarmManager)context.getSystemService(Context.ALARM_SERVICE);
                 // Start service every 10 minutes
                 alarm.setRepeating(AlarmManager.RTC_WAKEUP, cal.getTimeInMillis(),10 * 60 * 1000, pintent);
             }
             else
                Log.v("ReactNative", "---------Alarm is already active---------");
        }
}
