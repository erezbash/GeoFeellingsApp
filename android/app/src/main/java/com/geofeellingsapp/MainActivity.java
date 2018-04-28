package com.geofeellingsapp;

import com.reactnativenavigation.controllers.SplashActivity;
import android.content.Intent;

public class MainActivity extends SplashActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    protected String getMainComponentName() {
        return "GeoFeellingsApp";
    }
}
