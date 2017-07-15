chrome.app.runtime.onLaunched.addListener(() => {
  chrome.app.window.create('blank.html', {
    outerBounds: {
      width: 796,
      height: 520
    }
  });
});
