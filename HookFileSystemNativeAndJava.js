function HookFileSys(){
	
	Java.perform(function () {
  var File = Java.use("java.io.File");
  var FileInputStream = Java.use("java.io.FileInputStream");
  var FileOutputStream = Java.use("java.io.FileOutputStream");

  // Hooking the open method
  var open = File.$init.overload('java.lang.String');
  open.implementation = function (path) {
    console.log("[*] File opened: " + path);
    return open.call(this, path);
  };

  // Hooking the read method
  var read = FileInputStream.read.overload('[B');
  read.implementation = function (buffer) {
    console.log("[*] File read: " + buffer.length + " bytes");
    return read.call(this, buffer);
  };

  // Hooking the write method
  var write = FileOutputStream.write.overload('[B');
  write.implementation = function (buffer) {
    console.log("[*] File write: " + buffer.length + " bytes");
    return write.call(this, buffer);
  };

  // Hooking the close method
  var close = FileInputStream.close;
  close.implementation = function () {
    console.log("[*] File closed");
    return close.call(this);
  };

  // Hooking the close method
  var closeOutput = FileOutputStream.close;
  closeOutput.implementation = function () {
    console.log("[*] File closed");
    return closeOutput.call(this);
  };
});
	
	
}

function HookFileSysNative(){
	Interceptor.attach(Module.findExportByName(null, "open"), {
  onEnter: function (args) {
    var path = Memory.readUtf8String(args[0]);
    console.log("[*] File opened: " + path);
  }
});
	
	
}