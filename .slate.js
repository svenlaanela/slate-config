// Configuration file for slate (https://github.com/jigish/slate)
// 
// This configuration file maps the ctrl,alt,cmd,shift+key (i.e. hyper+key) combination to opening a 
// specific app. The application will gain focus if it is not currently focused (and will be started
// in the background if not running). Clicking the same key combination again will return focus to 
// the application that had focus previously.
//
// Pressing the ctrl,alt,cmd,shift keys at the same time is rather cumbersome. However, the caps lock
// key (which I personally do not use) can be mapped to that specific key combination so you could just
// press capslock+key to achieve the same. This remapping can be done by following the instructions here:
// http://stevelosh.com/blog/2012/10/a-modern-space-cadet/#hyper
slate.config("orderScreensLeftToRight", true);

var moveToScreen1 = slate.operation("move", {
  "screen": "0",
  "x": "screenOriginX",
  "y": "screenOriginY",
  "width": "screenSizeX",
  "height": "screenSizeY"
});

var moveToScreen2 = slate.operation("move", {
  "screen": "1",
  "x": "screenOriginX",
  "y": "screenOriginY",
  "width": "screenSizeX",
  "height": "screenSizeY"
});

var moveToScreen3 = slate.operation("move", {
  "screen": "2",
  "x": "screenOriginX",
  "y": "screenOriginY",
  "width": "screenSizeX",
  "height": "screenSizeY"
});

slate.layout("1monitors", {
  "Google Chrome": {
    "operations": [moveToScreen1],
    "repeat": true
  },
  "Sublime Text": {
    "operations": [moveToScreen1],
    "repeat": true
  },
  "IntelliJ IDEA CE": {
    "operations": [moveToScreen1],
    "repeat": true
  }
});

slate.layout("2monitors", {
  "Google Chrome": {
    "operations": [moveToScreen1],
    "repeat": true
  },
  "Sublime Text": {
    "operations": [moveToScreen2],
    "repeat": true
  },
  "IntelliJ IDEA CE": {
    "operations": [moveToScreen2],
    "repeat": true
  }
});

slate.layout("3monitors", {
  "Google Chrome": {
    "operations": [moveToScreen2],
    "repeat": true
  },
  "Sublime Text": {
    "operations": [moveToScreen3],
    "repeat": true
  },
  "IntelliJ IDEA CE": {
    "operations": [moveToScreen3],
    "repeat": true
  }
});

slate.def(["2560x1600"], "1monitors");
slate.def(["2560x1600","1920x1200"], "2monitors");
slate.def(["2560x1600","1920x1200","1920x1200"], "3monitors");

// for debugging
//slate.bind("1:ctrl,alt,cmd,shift", slate.operation("move", {"name": "1monitors"}))
//slate.bind("2:ctrl,alt,cmd,shift", slate.operation("move", {"name": "2monitors"}))
//slate.bind("3:ctrl,alt,cmd,shift", slate.operation("move", {"name": "3monitors"}))

slate.bind("1:ctrl,alt,cmd,shift", moveToScreen1)
slate.bind("2:ctrl,alt,cmd,shift", moveToScreen2)
slate.bind("3:ctrl,alt,cmd,shift", moveToScreen3)

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
