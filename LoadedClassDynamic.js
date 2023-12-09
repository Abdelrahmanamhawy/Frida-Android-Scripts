Java.perform(function() {
  var classCount = 0;
  var classNames = [];

  Java.enumerateLoadedClasses({
    onMatch: function(className) {
      classCount++;
      classNames.push(className);
    },
    onComplete: function() {
      console.log('[*] Initial class count:', classCount);
    }
  });

  var classLoader = Java.use('java.lang.ClassLoader');
  var loadClass = classLoader.loadClass;

  // Specify the desired overload of loadClass()
  loadClass.overload('java.lang.String').implementation = function(className) {
    var loadedClass = loadClass.call(this, className);
    if (!(classNames.includes(className))&&className.includes("targetClass")) {
      classNames.push(className);
      console.log('[+] New class loaded:', className);
    }
    return loadedClass;
  };
});
