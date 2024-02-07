async function measurePageLoadTime() {
    return new Promise(resolve => {
        // Listen for the 'readystatechange' event to ensure all resources are loaded
        document.addEventListener('readystatechange', function() {
            if (document.readyState === 'complete') {

                // Call function to calculate and output network statistics
                calculateNetworkStatistics();

                // Call function to calculate and output timing statistics
                calculateTimingStatistics();
            }
        });
    });
}

// Function to calculate and output network statistics
function calculateNetworkStatistics() {
    // Total number of requests
    const totalRequests = performance.getEntriesByType('resource').length;

    // Total transferred size in bytes
    const totalTransferredSize = performance.getEntriesByType('resource').reduce((acc, resource) => acc + resource.transferSize, 0);

    // Total size of resources in bytes
    const totalResourceSize = performance.getEntriesByType('resource').reduce((acc, resource) => acc + resource.decodedBodySize, 0);

    // Output the network statistics
    console.log(`${totalRequests} / ${totalTransferredSize} requests`);
    console.log(`${(totalTransferredSize / 1024).toFixed(1)} kB / ${(totalResourceSize / 1024).toFixed(1)} kB transferred`);
    console.log(`${(totalResourceSize / (1024 * 1024)).toFixed(1)} MB / ${(performance.navigation.redirectCount / 1024 * 1024).toFixed(1)} MB resources`);
}

// Function to calculate and output finish time, DOMContentLoaded, and Load times
function calculateTimingStatistics() {
    // Finish time in milliseconds
    const finishTime = performance.timing.domComplete;

    // DOMContentLoaded time in milliseconds
    const domContentLoadedTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;

    // Load time in milliseconds
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;

    // Convert milliseconds to seconds
    const finishTimeSeconds = finishTime / 1000;
    const domContentLoadedTimeSeconds = domContentLoadedTime / 1000;
    const loadTimeSeconds = loadTime / 1000;

    // Output the timing statistics
    console.log(`Finish: ${(finishTimeSeconds / 60).toFixed(1)} min`);
    console.log(`DOMContentLoaded: ${domContentLoadedTimeSeconds.toFixed(2)} s`);
    console.log(`Load: ${loadTimeSeconds.toFixed(2)} s`);
}

// Call the function to start measuring page load time
measurePageLoadTime();


async function setPreloaderStatus() {
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
