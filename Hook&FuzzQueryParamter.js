function HookQueryParam(){
Java.perform(function () {
  var intentClass = Java.use("android.content.Intent");

  // Hooking the $init method of the Intent class
  intentClass.$init.overload('java.lang.String', 'android.net.Uri').implementation = function (action, uri) {
    // Calling the original $init method
    this.$init(action, uri);

    // Checking if the uri object is not null
    if (uri != null) {
      // Hooking the getQueryParameter() method
      uri.getQueryParameter.overload('java.lang.String').implementation = function (param) {
		  
       
		

        // You can modify or log the parameter value, or perform any other actions here
        // For example, you can log the return value of the getQueryParameter() method
        var result = this.getQueryParameter.overload('java.lang.String').call(this, param);
        console.log("getQueryParameter() returned: " + result);

        // Returning the original return value
		if(param=="redirect_uri"){
			 console.log("getQueryParameter() called with parameter: " + param);
        return Java.use('java.lang.String').$new("burpCollabratorUrl");
		  }
		  else 
			  return result 
      };
    }
  };
});
}

HookQueryParam()