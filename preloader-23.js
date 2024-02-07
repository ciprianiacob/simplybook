async function measurePageLoadTime() {
    return new Promise(resolve => {
        // Listen for the 'load' event to ensure the page has fully loaded
        window.addEventListener('load', function() {
            // Access performance timing data after the 'load' event
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
            resolve({ loadTimeSeconds, domContentLoadedTimeSeconds, pageLoadTimeSeconds });
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
