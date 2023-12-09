Java.perform(function() {
  // Trace System.loadLibrary() call
  var System = Java.use('java.lang.System');
  var loadLibrary = System.loadLibrary;
  loadLibrary.implementation = function(libraryName) {
    console.log('[+] System.loadLibrary() called with library name: ' + libraryName);

    // Load the library
    loadLibrary.call(System, libraryName);

    // Hook the native functions in the loaded library class
    try {
      var libraryClass = Java.use(libraryName);
      var methods = libraryClass.class.getDeclaredMethods();
      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        if (method.isNative()) {
          var methodName = method.getName();
          console.log('[+] Hooking native function: ' + methodName);

          // Hook the native function
          var nativeFunction = libraryClass[methodName];
          Interceptor.attach(nativeFunction.implementation, {
            onEnter: function(args) {
              console.log('[+] Entered native function: ' + methodName);
              // You can print or manipulate the arguments here
            },
            onLeave: function(retval) {
              console.log('[+] Exited native function: ' + methodName);
              // You can print or manipulate the return value here
            }
          });
        }
      }
    } catch (error) {
      console.log('[-] Error: ' + error);
    }
  };
});
