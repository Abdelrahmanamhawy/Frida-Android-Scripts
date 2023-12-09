Java.perform(function () {
  var View = Java.use('android.view.View');
  var OnClickListener = Java.use('android.view.View$OnClickListener');

  // Hook into the setOnClickListener method of all View instances
  View.setOnClickListener.overload('android.view.View$OnClickListener').implementation = function (listener) {
    // Intercept the setOnClickListener method and log the button click
    console.log('setOnClickListener called with listener:', listener);

    // Get the stack trace to determine the class and method handling the click
    var stackTrace = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
    console.log(stackTrace);

    // Create a new OnClickListener implementation
    var onClickListener = Java.registerClass({
      name: 'com.example.OnClickListener',
      implements: [OnClickListener],
      methods: {
        onClick: function (view) {
          // Log the button click
          console.log('Button clicked:');
          // Add additional code here to trace or modify the behavior
        }
      }
    });

    // Call the original setOnClickListener method with the new OnClickListener
    this.setOnClickListener(onClickListener.$new());
  };
});