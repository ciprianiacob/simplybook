var domDoHomeArtDomContentLoadedTime = 0;
var domDoHomeArtDomLoadTime = 0;
var delayDoHomeArtValue = (domDoHomeArtDomContentLoadedTime + domDoHomeArtDomLoadTime) * 1000;
var finalDelayDoHomeArtValue = 0;
var preloaderDoHomeArtElement  = "";

function calculateDoHomeArtTimingStatistics() {
	try {
		var timing = performance.timing;

		if (!timing || timing.domContentLoadedEventEnd <= 0 || timing.loadEventEnd <= 0) {
			console.warn("Timing data is incomplete or invalid.");
			return;
		}

		var domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart;
		var loadTime = timing.loadEventEnd - timing.navigationStart;

		var domContentLoadedTimeSeconds = (domContentLoadedTime + 5) / 1000;
		var loadTimeSeconds = (loadTime + 5) / 1000;
		finalDelayDoHomeArtValue = `${(domContentLoadedTimeSeconds + loadTimeSeconds).toFixed(2)}`;

    preloaderDoHomeArtElement  = document.getElementById('preloader');

		console.log(`DOMContentLoaded: ${domContentLoadedTimeSeconds.toFixed(2)} s`);
		console.log(`Load: ${loadTimeSeconds.toFixed(2)} s`);
		console.log(`DELAY TIME IN SECONDS: ${(domContentLoadedTimeSeconds + loadTimeSeconds).toFixed(2)} s`);
		console.log("FINAL DELAY TIME IN SECONDS: ", finalDelayDoHomeArtValue);
	} catch (error) {
		console.error("Error calculating timing statistics:", error);
	}
}

async function setDoHomeArtPreloaderStatus() {
    var targetElement = document.querySelector("html");
    console.log("Current classes:", targetElement.classList); // Debug: Log current classes
    if (targetElement.classList.contains("preloader-is-not-active")) {
        console.log("Preloader is already inactive."); // Debug: Log preloader status
        return;
    }

    console.log("Calculating timing statistics..."); // Debug: Log calculation start
    await calculateDoHomeArtTimingStatistics();

    console.log("Delaying..."); // Debug: Log delay start
    await delayDoHomeArt(finalDelayDoHomeArtValue);
    var isRunning = preloaderDoHomeArtElement && isDoHomeArtElementAnimating(preloaderDoHomeArtElement);

    if (isRunning) {
        console.log("Preloader is running. Adding class..."); // Debug: Log preloader running
        targetElement.classList.add("preloader-is-not-active");
    } else {
        console.log("Preloader is not running. Removing class..."); // Debug: Log preloader not running
        targetElement.classList.remove("preloader-is-not-active");
    }

    console.log("Updated classes:", targetElement.classList); // Debug: Log updated classes
}

// Debug: Log function call
console.log("Calling setDoHomeArtPreloaderStatus...");
setDoHomeArtPreloaderStatus();

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
