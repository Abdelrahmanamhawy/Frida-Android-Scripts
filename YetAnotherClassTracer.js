function tracer(target){
Java.perform(function () {
  var targetClass = Java.use(target);

  // Iterate over each method of the target class
  targetClass.class.getDeclaredMethods().forEach(function (method) {
    // Hook the method to trace its calls
    targetClass[method.getName()].overload.apply(targetClass, method.getParameterTypes()).implementation = function () {
      // Print the method name
      console.log('Calling method: ' + method.getName());

      // Print the arguments
      for (var i = 0; i < arguments.length; i++) {
        console.log('Argument ' + i + ': ' + arguments[i]);
      }

      // Call the original method
      var result = this[method.getName()].apply(this, arguments);

      // Print the return value
      console.log('Return value: ' + result);

      // Return the result
      return result;
    };
  });
});
}

