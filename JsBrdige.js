Java.perform(function() {
  var webViewClass = Java.use("android.webkit.WebView");
  var addJavascriptInterface = webViewClass.addJavascriptInterface;

  addJavascriptInterface.overload('java.lang.Object', 'java.lang.String').implementation = function(obj, interfaceName) {
    console.log("JavaScript bridge hooked!");

    // Add your custom code here to perform actions on the JavaScript bridge

    // Call the original addJavascriptInterface method to maintain functionality
    addJavascriptInterface.call(this, obj, interfaceName);
  };
});