Java.perform(function() {
  var Intent = Java.use('android.content.Intent');
  var ActivityThread = Java.use('android.app.ActivityThread');

  var currentApplication = ActivityThread.currentApplication();
  var context = currentApplication.getApplicationContext();
  var packageName = context.getPackageName();

  var intent = Intent.$new();
  intent.setClassName(packageName, 'targetActivtiyToStart');
  intent.setFlags(268435456); // Intent.FLAG_ACTIVITY_NEW_TASK value
  context.startActivity(intent);
});


