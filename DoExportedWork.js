Java.perform(function() {
  var Manifest = Java.use('android.content.pm.ManifestParser');
  var activityInfo = Java.use('android.content.pm.ActivityInfo');

  var currentApplication = Java.use('android.app.ActivityThread').currentApplication();
  var packageName = currentApplication.getPackageName();
  var context = currentApplication.getApplicationContext();
  
  var appInfo = context.getPackageManager().getApplicationInfo(packageName, 0);
  var manifestParser = Manifest.$new();
  
  var xmlResourceParser = appInfo.sourceDir.value.getXml();
  manifestParser.parse(xmlResourceParser);

  var activities = manifestParser.getActivities();
  
  for (var i = 0; i < activities.length; i++) {
    var activity = activities[i];
    var activityName = activityInfo.getName.call(activity);
    var exported = activityInfo.getExported.call(activity);
    
    if (exported) {
      console.log('Exported activity: ' + activityName);
    }
  }
});