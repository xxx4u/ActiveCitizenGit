package com.activecitizen;

import com.menu.*;

import android.os.Bundle;

//public class App extends DroidGap {
public class App extends DroidGapMenuActivity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	 
    	super.onCreate(savedInstanceState);
    	//super.setIntegerProperty("splashscreen", R.drawable.splash);
        //super.loadUrl("file:///android_asset/www/index.html", 20000);
        super.loadUrl("file:///android_asset/www/index.html");
        //super.appView.getSettings().setAppCacheEnabled(false);
    }
}