async function measurePageLoadTime() {
    return new Promise(resolve => {
        // Listen for the 'load' event to capture the Load event time
        window.addEventListener('load', function() {
            const loadTimeSeconds = (performance.timing.loadEventEnd - performance.timing.navigationStart) / 1000;
            
            // Output the Load event time
            console.log(`Load: ${loadTimeSeconds.toFixed(2)} s`);

            // Calculate DOMContentLoaded time based on the previous event
            const domContentLoadedTimeSeconds = (performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart) / 1000;
            
            // Output the DOMContentLoaded event time
            console.log(`DOMContentLoaded: ${domContentLoadedTimeSeconds.toFixed(2)} s`);

            // Calculate the page load time
            const pageLoadTimeSeconds = loadTimeSeconds - domContentLoadedTimeSeconds;
            
            // Output the page load time
            console.log(`Page loaded in ${pageLoadTimeSeconds.toFixed(2)} s`);

            // Resolve the promise
            resolve();
        });
    });
}

// Call the function to start measuring page load time
measurePageLoadTime().then(() => {
    console.log("Page load time measurement complete.");
});





async function setPreloaderStatus() {
  await measurePageLoadTime();
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
