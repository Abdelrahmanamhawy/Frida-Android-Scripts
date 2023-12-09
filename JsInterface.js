Java.perform(function() {
  var jsInterfaceClass = Java.use("android.webkit.JavascriptInterface");
  var methods = jsInterfaceClass.class.getDeclaredMethods();

  for (var i = 0; i < methods.length; i++) {
    var method = methods[i];
    console.log("Hooking method: " + method.getName());

    // Hook each method of the JavascriptInterface class
    method.implementation = function() {
      console.log("JavaScriptInterface method called: " + this.getName());

      // Add your custom code here to perform actions on the hooked method

      // Call the original method to maintain functionality
      return this.invoke.apply(this, arguments);
    };
  }
});