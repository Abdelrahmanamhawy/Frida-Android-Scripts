function trace_uri(){

Java.perform(function () {
  var Uri = Java.use('android.net.Uri');
  var Exception = Java.use('java.lang.Exception');
  Uri.parse.overload('java.lang.String').implementation = function (uriString) {
    console.log('Uri.parse called with uriString:', uriString);
    
    
    if (uriString.includes('javascript')) {
      console.log('URI with javascript in it was found ! ', uriString);
 try {
        throw Exception.$new('Trace');
      } catch (e) {
        var stackTrace = e.getStackTrace();
        if (stackTrace.length > 1) {
          var callerClass = stackTrace[1].getClassName();
          console.log('Class that called/created the URI string:', callerClass);
        }
      }	  



//
    return this.parse(uriString);
  };
});

}
}

function IntentMonitor(){
	Java.perform(function () {
   var act = Java.use("android.app.Activity");
   act.getIntent.overload().implementation = function () {
     var intent = this.getIntent()
     var cp = intent.getComponent()
     console.log("Starting " + cp.getPackageName() + "/" + cp.getClassName())
     var ext = intent.getExtras();
     if (ext) {
       var keys = ext.keySet()
       var iterator = keys.iterator()
       while (iterator.hasNext()) {
         var k = iterator.next().toString()
         var v = ext.get(k)
         console.log("\t" + v.getClass().getName())
         console.log("\t" + k + ' : ' + v.toString())
       }
     }
   return intent;
   };
})
	
}




function DirtyFix(){
Java.perform(function() {
  var Intent = Java.use('android.content.Intent');
  var ActivityThread = Java.use('android.app.ActivityThread');

  var currentApplication = ActivityThread.currentApplication();
  var context = currentApplication.getApplicationContext();
  var packageName = context.getPackageName();

  var intent = Intent.$new();
  intent.setClassName(packageName, 'targetActivity');
  intent.setFlags(268435456); // Intent.FLAG_ACTIVITY_NEW_TASK value
  context.startActivity(intent);

  
});
}
trace_uri()
DirtyFix()
//IntentMonitor()
