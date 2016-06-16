/**
 * Maps application names to application executables.
 * This map is used to move back to the previously focused application.
 */
var appNameToExecutable = [];

function mapAppToExecutable(appName, appExecutable) {
  if (appExecutable === undefined) {
    appExecutable = "/Applications/"+appName+".app";
  }
  appNameToExecutable[appName] = appExecutable;
}

/**
 * Introduces slate.bindApp function which allows to map a keyboard shortcut to open a
 * specific application. Supports refocusing the last focused app.
 */
var lastFocusedApp = "";

slate.bindApp = function(shortcut, appName, appExecutable) {
  mapAppToExecutable(appName, appExecutable);

  slate.bindWithHyper(shortcut, function(windowObject) {
    if (windowObject === undefined || windowObject.app() === undefined) {
      slate.runApp(appName);
    } else {
      // store current app name
      var currentAppName = windowObject.app().name();
      if (currentAppName !== appName) {
        lastFocusedApp = currentAppName;
        slate.runApp(appName);
      } else {
        slate.runApp(lastFocusedApp);
        lastFocusedApp = currentAppName;
      }
    }
  });
}

/**
 * Introduces slate.bindWithHyper function which can be used to map shortcuts in the
 * form of s:hyper. The :hyper string is replaced with :ctrl,alt,cmd,shift before calling
 * slate.bind()
 */
slate.bindWithHyper = function(keystroke, action, repeat) {
  var ixHyper = keystroke.indexOf(":hyper");
  if (ixHyper !== -1) {
    keystroke = keystroke.substring(0, ixHyper) + ":ctrl,alt,cmd,shift" + keystroke.substring(ixHyper + 6);
  }
  slate.bind(keystroke, action, repeat); 
}

/**
 * Introduces slate.runApp function which can be used to open the specific application.
 */
slate.runApp = function(appName) {
  var appExecutable = appNameToExecutable[appName];
  slate.log("opening " + appName + ": " + appExecutable);
  var stdout = slate.shell("/usr/bin/open \"" + appExecutable + "\"", true)
  slate.log("got: " + stdout);
}

/**
 * Slate binding for specific applications
 */
slate.bindApp("s:hyper", "Sublime Text");
slate.bindApp("e:hyper", "Google Chrome");
slate.bindApp("b:hyper", "iBooks");
slate.bindApp("i:hyper", "IntelliJ IDEA CE", "/Applications/IntelliJ IDEA CE.app");
slate.bindApp("a:hyper", "AppCode", "/Applications/AppCode.app");
slate.bindApp("t:hyper", "Things");
slate.bindApp("p:hyper", "Spotify");
slate.bindApp("r:hyper", "Preview");
slate.bindApp("l:hyper", "Slack");
slate.bindApp("f:hyper", "Finder");
