package com.geofeellingsapp;

import android.location.*;
import android.os.*;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;

import android.os.Bundle;


import org.json.JSONObject;
import org.json.JSONException;
import com.android.volley.*;
import java.net.URLEncoder;
import java.io.UnsupportedEncodingException;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.Map;
import java.util.HashMap;


public class MyService extends Service{

    @Override
    public IBinder onBind(Intent intent) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void onCreate() {
        Log.v("ReactNative", "---------MyService onCreate()---------");
    }

    @Override
    public void onStart(Intent intent, int startId) {
        boolean isGPSEnabled = false;
        boolean isNetworkEnabled = false;
        Location location;
        double latitude = 0;
        double longitude = 0;
        String userId = "";
        String provider;
        LocationManager locationManager;

        Log.v("ReactNative", "----MyService onStart()---- " + System.currentTimeMillis());

        locationManager = (LocationManager)getBaseContext().getSystemService(LOCATION_SERVICE);

        // getting GPS status
        isGPSEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);

        // getting network status
        isNetworkEnabled = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);

        if (!isGPSEnabled && !isNetworkEnabled) {
            // no network provider is enabled. DEFAULT COORDINATES


        }
        else {
            if (isNetworkEnabled) {
                if (locationManager != null) {
                    location = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                    if (location != null) {
                        latitude = location.getLatitude();
                        longitude = location.getLongitude();
                    }
                }

            }
            // if GPS Enabled get lat/long using GPS Services
            if (isGPSEnabled) {
                if (locationManager != null) {
                    location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                    if (location != null) {
                        latitude = location.getLatitude();
                        longitude = location.getLongitude();
                    }
                }
            }
        }
        //userId = System.getProperty("USERID");
        Bundle bundle = intent.getExtras();
        userId = (String) bundle.getCharSequence("extraData");
        Log.v("ReactNative", "---------latitude---------" + latitude);
        Log.v("ReactNative", "---------longitude---------" + longitude);
        Log.v("ReactNative", "------user------" + userId);
        postData(latitude, longitude, userId);
        stopSelf();
    }
    @Override
    public void onDestroy(){
        Log.v("ReactNative", "---------onDestroy---------" );
        super.onDestroy();
    }

    public void postData(double latitude, double longitude, String user) {
        final String userId = user;
        String url = "http://132.72.23.65:8080/api/admin/user";
        JSONObject jsonBody = new JSONObject();
        JSONObject jsonLocation = new JSONObject();
        try {
                jsonLocation.put("latitude", latitude);
                jsonLocation.put("longitude", longitude);
                jsonBody.put("Location",jsonLocation);
            } catch (JSONException e) {
                //some exception handler code.
            }

        final String mRequestBody = jsonBody.toString();
        RequestQueue queue = Volley.newRequestQueue(this);
        StringRequest stringRequest = new StringRequest(Request.Method.PATCH, url,null,null)
        {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String>  params = new HashMap<String, String>();
                params.put("Content-Type","application/json");
                params.put("userId",userId);

                return params;
            }
            @Override
            public byte[] getBody() throws AuthFailureError {
                try {
                    return mRequestBody == null ? null : mRequestBody.getBytes("utf-8");
                } catch (UnsupportedEncodingException uee) {
                    VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s", mRequestBody, "utf-8");
                    return null;
            }
          }

        };
        queue.add(stringRequest);
    }

}


