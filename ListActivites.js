Java.perform(function() {
  var PackageManager = Java.use("android.content.pm.PackageManager");
  var ComponentName = Java.use("android.content.ComponentName");
  var Intent = Java.use("android.content.Intent");

  var ActivityThread = Java.use("android.app.ActivityThread");
  var currentApplication = ActivityThread.currentApplication();
  var context = currentApplication.getApplicationContext();
  var packageManager = context.getPackageManager();
  var packageName = context.getPackageName();

  try {
    var packageInfo = packageManager.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);
  } catch (e) {
    console.log("Failed to get package info for " + packageName);
    return;
  }

  var activities = packageInfo.activities;
  for (var i = 0; i < activities.length; i++) {
    var activityInfo = activities[i];
    var componentName = ComponentName.$new(packageName, activityInfo.name);
    var intent = Intent.$new();
    intent.setComponent(componentName);

    console.log("Activity Name: " + activityInfo.name);
    console.log("Intent: " + intent.toUri(Intent.URI_INTENT_SCHEME));
    console.log("----------------------");
  }
});