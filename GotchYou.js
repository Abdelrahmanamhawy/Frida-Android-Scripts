Java.perform(function() {
  var classCount = 0;
  var classNames = [];
  var functionNames = new Set();

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
   // if (!classNames.includes("targetClass")) {
      classNames.push(className);
      console.log('[+] New class loaded:', className);
      enumerateClassMethods(loadedClass);
    //}
    return loadedClass;
  };

  function enumerateClassMethods(javaClass) {
    var methods = javaClass.class.getDeclaredMethods();
    for (var i = 0; i < methods.length; i++) {
      var method = methods[i];
      if (!method.isSynthetic()) {
        functionNames.add(method.toString());
      }
    }
  }

  Java.choose('java.lang.reflect.Method', {
    onMatch: function(method) {
      if (!method.isSynthetic()) {
        functionNames.add(method.toString());
      }
    },
    onComplete: function() {
      console.log('[*] Initial function count:', functionNames.size);
    }
  });

  Interceptor.attach(Module.findExportByName(null, 'dlopen'), {
    onEnter: function(args) {
      var path = Memory.readCString(args[0]);
      if (path.includes(".so")) {
        console.log('[+] Dynamic library loaded:', path);
        enumerateLibraryFunctions(path);
      }
    }
  });

  function enumerateLibraryFunctions(libraryPath) {
    var exports = Module.enumerateExportsSync(libraryPath);
    for (var i = 0; i < exports.length; i++) {
      var exp = exports[i];
      functionNames.add(exp.name);
    }
  }

  setInterval(function() {
    console.log('[*] Current class count:', classCount);
    console.log('[*] Current function count:', functionNames.size);
  }, 5000);
});