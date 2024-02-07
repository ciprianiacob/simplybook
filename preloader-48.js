var doHomeArtCodeAlreadyExecuted = false; // Flag to track if the code has been executed
if (!doHomeArtCodeAlreadyExecuted) {
	var domDoHomeArtContentLoadedPlusLoadSeconds = 0; // Global variable to store the sum of DOMContentLoaded and Load times

	async function executeDoHomeArtPreloader() {
		try {
			await calculateDoHomeArtTimingStatistics();
			await calculateDoHomeArtNetworkStatistics();
			await setDoHomeArtPreloaderStatus();
			doHomeArtCodeAlreadyExecuted = true;
		} catch (error) {
			console.error("Error executing code:", error);
		}
	}

	executeDoHomeArtPreloader();
}

// Function to calculate and output finish time, DOMContentLoaded, and Load times
function calculateDoHomeArtNetworkStatistics() {
	if (domDoHomeArtContentLoadedPlusLoadSeconds !== 0) return; // Stop execution if domDoHomeArtContentLoadedPlusLoadSeconds is not 0

	try {
		var resourceEntries = performance.getEntriesByType('resource');

		if (resourceEntries.length === 0) {
			console.log("No resource entries found.");
			return;
		}

		var totalRequests = resourceEntries.length;
		var totalTransferredSize = resourceEntries.reduce((acc, resource) => acc + resource.transferSize, 0);
		var totalResourceSize = resourceEntries.reduce((acc, resource) => acc + resource.decodedBodySize, 0);

		console.log(`${totalRequests} / ${totalTransferredSize} requests`);
		console.log(`${(totalTransferredSize / 1024).toFixed(1)} kB / ${(totalResourceSize / 1024).toFixed(1)} kB transferred`);
		console.log(`${(totalResourceSize / (1024 * 1024)).toFixed(1)} MB / ${(performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(1)} MB resources`);
	} catch (error) {
		console.error("Error calculating network statistics:", error);
	}
}

// Function to calculate and output finish time, DOMContentLoaded, and Load times
function calculateDoHomeArtTimingStatistics() {
	if (domDoHomeArtContentLoadedPlusLoadSeconds !== 0) return; // Stop execution if domDoHomeArtContentLoadedPlusLoadSeconds is not 0

	try {
		var timing = performance.timing;

		if (!timing || timing.domContentLoadedEventEnd <= 0 || timing.loadEventEnd <= 0) {
			console.warn("Timing data is incomplete or invalid.");
			return;
		}

		var finishTime = timing.domComplete;
		var domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart;
		var loadTime = timing.loadEventEnd - timing.navigationStart;

		var finishTimeSeconds = finishTime / 1000;
		var domContentLoadedTimeSeconds = domContentLoadedTime / 1000;
		var loadTimeSeconds = loadTime / 1000;

		console.log(`Finish: ${(finishTimeSeconds / 60).toFixed(1)} min`);
		console.log(`DOMContentLoaded: ${domContentLoadedTimeSeconds.toFixed(2)} s`);
		console.log(`Load: ${loadTimeSeconds.toFixed(2)} s`);
	} catch (error) {
		console.error("Error calculating timing statistics:", error);
	}
}

async function setDoHomeArtPreloaderStatus() {
	if (domDoHomeArtContentLoadedPlusLoadSeconds !== 0) return; // Stop execution if domDoHomeArtContentLoadedPlusLoadSeconds is not 0

	var targetElement = document.querySelector("html");
	if (targetElement.classList.contains("preloader-is-not-active")) {
		return; // Stop further execution if the preloader is not active
	}

	await calculateDoHomeArtTimingStatistics();
	var delayDoHomeArtValue = (domDoHomeArtContentLoadedPlusLoadSeconds * 1000) + 10; // Convert seconds to milliseconds

	// Measure page load time
	await calculateDoHomeArtNetworkStatistics();
	await delayDoHomeArt(delayDoHomeArtValue); // Use the delay value calculated based on DOMContentLoaded and Load times

	var preloader = document.getElementById('preloader');
	var isRunning = preloader && isDoHomeArtElementAnimating(preloader);

	if (isRunning) {
		targetElement.classList.add("preloader-is-not-active");
	} else {
		targetElement.classList.remove("preloader-is-not-active");
	}
}

function delayDoHomeArt(ms) {
	return new Promise(function(resolve) {
		setTimeout(resolve, ms);
	});
}

function isDoHomeArtElementAnimating(element) {
	var isAnimating = false;
	var computedStyle = window.getComputedStyle(element);

	if (computedStyle.getPropertyValue('display') === 'none') {
		isAnimating = true;
	}

	return isAnimating;
}

var preloaderDoHomeArtElement = document.getElementById('preloader');
if (preloaderDoHomeArtElement) {
	var observerDoHomeArt = new MutationObserver(function(mutationsList, observerDoHomeArt) {
		setDoHomeArtPreloaderStatus();
	});

	observerDoHomeArt.observe(preloaderDoHomeArtElement, {
		attributes: true,
		attributeFilter: ['style'],
		childList: true
	});
}
