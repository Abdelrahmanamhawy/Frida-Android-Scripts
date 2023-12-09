Java.perform(function() {
  var targetClass = "java.lang.Double"; // Replace with the desired class name

  var targetClassHandle = Java.use(targetClass);
  var methods = targetClassHandle.class.getDeclaredMethods();

  methods.forEach(function(method) {
    var methodName = method.getName();
    console.log("Tracing method: " + methodName);

    var targetMethod = targetClassHandle[methodName];
    var overloadCount = targetMethod.overloads.length;

    for (var i = 0; i < overloadCount; i++) {
      targetMethod.overloads[i].implementation = function() {
        console.log("Method called: " + methodName);
		if(methodName=="targetMethod"){
			
			
			console.log("Are we about to do something great and cool with you Frida ?")
			console.log("If you want to backtrace , uncomment the following lines :");
			
          //Java.perform(function() {
           // Java.use("java.lang.Thread").currentThread().getStackTrace().forEach(function(stackTraceElement) {
             // console.log(stackTraceElement.getClassName() + "." + stackTraceElement.getMethodName());
            //});
          //});
		
		}
		
        // You can add your custom logic here

        // Call the original method
        var result = this[methodName].apply(this, arguments);

        // You can process the result or add additional logging here

        return result;
      }
    }
  });
});
