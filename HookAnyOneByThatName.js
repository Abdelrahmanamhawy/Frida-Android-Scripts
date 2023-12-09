function InspectAndHook(){
Java.perform(function () {
  Java.enumerateLoadedClassesSync().forEach(function (className) {
    if (className.includes('your_class_name_goes_here')) {
      console.log('Loaded class:', className);
      var targetClass = Java.use(className);
      var methods = targetClass.class.getDeclaredMethods();
      methods.forEach(function (method) {
        var methodName = method.getName();
        console.log('Hooking method:', methodName);
        targetClass[methodName].implementation = function () {
          console.log('Intercepted method:', methodName);
		  console.log("Of class:",targetClass)
          var args = Array.prototype.slice.call(arguments);
          console.log('Arguments:', JSON.stringify(args));
           if (methodName === 'your_target_method_name_goes_here') {
			   //Do something 
         
           }
          var result = this[methodName].apply(this, args);
          console.log('Return value:', result);
          return result;
        };
      });
    }
  });
});
}