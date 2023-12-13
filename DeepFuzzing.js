Java.perform(function() {
  var Intent = Java.use('android.content.Intent');
  
  // Hook getData method
  Intent.getData.implementation = function() {
    var data = this.getData();
    
	//logData(Intent)
	var extras = this.getExtras();
    if (extras !== null) {
      var keys = extras.keySet();
      var iterator = keys.iterator();
      while (iterator.hasNext()) {
        var key = iterator.next();
		console.log('[getData] Data:', data);
        console.log('[Extra] ' + key + ':', extras.get(key));
      }
    }
    return Java.use("android.net.Uri").$new("https://www.google.com")
  };
  
  function logData(intent) {
    var data = intent.getData();
    if (data !== null) {
      console.log('[Data]:', data.toString());
      logExtras(intent);
    }
  }

  function logExtras(intent) {
    var extras = intent.getExtras();
    if (extras !== null) {
      var keys = extras.keySet();
      var iterator = keys.iterator();
      while (iterator.hasNext()) {
        var key = iterator.next();
        console.log('[Extra] ' + key + ':', extras.get(key));
      }
    }
  }
  
  function logStringValues(intent) {
    var stringValues = [];
    var extras = intent.getExtras();
    if (extras !== null) {
      var keys = extras.keySet();
      var iterator = keys.iterator();
      while (iterator.hasNext()) {
        var key = iterator.next();
        var value = extras.get(key);
        if (value.getClass().getName() === 'java.lang.String') {
          stringValues.push(value);
        }
      }
    }
    if (stringValues.length > 0) {
      console.log('[String Values]:', stringValues);
    }
  }
});