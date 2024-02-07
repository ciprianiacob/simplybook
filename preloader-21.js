async function measurePageLoadTime() {

// Catch errors since some browsers throw when using the new `type` option.
// https://bugs.webkit.org/show_bug.cgi?id=209216
try {
  const po = new PerformanceObserver((entryList) => {
    const firstInput = entryList.getEntries()[0];

    // Measure First Input Delay (FID).
    const firstInputDelay = firstInput.processingStart - firstInput.startTime;

    // Measure the time it takes to run all event handlers
    // Note: this does not include work scheduled asynchronously using
    // methods like `requestAnimationFrame()` or `setTimeout()`.
    const firstInputProcessingTime = firstInput.processingEnd - firstInput.processingStart;

    // Measure the entire duration of the event, from when input is received by
    // the browser until the next frame can be painted after processing all
    // event handlers.
    // Note: similar to above, this value does not include work scheduled
    // asynchronously using `requestAnimationFrame()` or `setTimeout()`.
    // And for security reasons, this value is rounded to the nearest 8ms.
    const firstInputDuration = firstInput.duration;

    // Log these values the console.
    console.log({
      firstInputDelay,
      firstInputProcessingTime,
      firstInputDuration,
    });
  });

  po.observe({type: 'first-input', buffered: true});
} catch (error) {
  // Do nothing if the browser doesn't support this API.
}
  
    return new Promise(resolve => {
        // Listen for the 'readystatechange' event to ensure all resources are loaded
        document.addEventListener('readystatechange', function() {
            if (document.readyState === 'complete') {
                // Access performance timing data after all resources are loaded
                const timing = performance.timing;

                // Calculate Load, DOMContentLoaded, and page load times
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                const domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart;
                const pageLoadTime = loadTime - domContentLoadedTime;

                // Ensure the values are positive
                const loadTimeSeconds = loadTime >= 0 ? loadTime / 1000 : 0;
                const domContentLoadedTimeSeconds = domContentLoadedTime >= 0 ? domContentLoadedTime / 1000 : 0;
                const pageLoadTimeSeconds = pageLoadTime >= 0 ? pageLoadTime / 1000 : 0;

                // Output the Load event time
                console.log(`Load: ${loadTimeSeconds.toFixed(2)} s`);

                // Output the DOMContentLoaded event time
                console.log(`DOMContentLoaded: ${domContentLoadedTimeSeconds.toFixed(2)} s`);

                // Output the page load time
                console.log(`Page loaded in ${pageLoadTimeSeconds.toFixed(2)} s`);

                // Resolve the promise with page load time
                resolve(pageLoadTimeSeconds); // convert to seconds
            }
        });
    });
}
measurePageLoadTime();

async function setPreloaderStatus() {
  // Measure page load time
  const pageLoadTimeSeconds = await measurePageLoadTime();
    
  // Output the page load time
  console.log(`Page loaded in ${pageLoadTimeSeconds.toFixed(2)} s`);
  
	delay(0).then(function() {
		var preloader = document.getElementById('preloader');
		var isRunning = preloader && isElementAnimating(preloader);
		var targetElement = document.querySelector("html");

		if (isRunning) {
			targetElement.classList.add("preloader-is-not-active");
		} else {
			targetElement.classList.remove("preloader-is-not-active");
		}
	});
}

function delay(ms) {
	return new Promise(function(resolve) {
		setTimeout(resolve, ms);
	});
}

function isElementAnimating(element) {
	var isAnimating = false;
	var computedStyle = window.getComputedStyle(element);

	if (computedStyle.getPropertyValue('display') === 'none') {
		isAnimating = true;
	}

	return isAnimating;
}

var preloaderElement = document.getElementById('preloader');
if (preloaderElement) {
	var observer = new MutationObserver(function(mutationsList, observer) {
		setPreloaderStatus();
	});

	observer.observe(preloaderElement, {
		attributes: true,
		attributeFilter: ['style'],
		childList: true
	});
}

setPreloaderStatus();
