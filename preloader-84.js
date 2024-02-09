async function calculateDoHomeArtTimingStatistics() {
    try {
        var timing = performance.timing;

        if (!timing || timing.domContentLoadedEventEnd <= 0 || timing.loadEventEnd <= 0) {
            // console.warn("Timing data is incomplete or invalid.");
            return;
        }

        var domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart;
        var loadTime = timing.loadEventEnd - timing.navigationStart;

        var domContentLoadedTimeSeconds = (domContentLoadedTime + 5) / 1000;
        setTimeout(setBeforePseudoElementBackground, domContentLoadedTimeSeconds * 1000);
        var loadTimeSeconds = (loadTime + 5) / 1000;
        finalDelayDoHomeArtValue = Number((domContentLoadedTimeSeconds + loadTimeSeconds).toFixed(2));
        return finalDelayDoHomeArtValue;

        // console.log(`DOMContentLoaded: ${domContentLoadedTimeSeconds.toFixed(2)} s`);
        // console.log(`Load: ${loadTimeSeconds.toFixed(2)} s`);
        // console.log(`DELAY TIME IN SECONDS: ${(domContentLoadedTimeSeconds + loadTimeSeconds).toFixed(2)} s`);
        // console.log("FINAL DELAY TIME IN SECONDS: ", finalDelayDoHomeArtValue);

    } catch (error) {
        // console.error("Error calculating timing statistics:", error);
    }
}

async function setDoHomeArtPreloaderStatus() {
	var targetElement = document.querySelector("html");
	// console.log("Current classes:", targetElement.classList);
	if (targetElement.classList.contains("preloader-is-not-active")) {
		// console.log("Preloader is already inactive.");
		return;
	}

	// console.log("Calculating timing statistics...");
	await calculateDoHomeArtTimingStatistics();

	// console.log("Delaying...");
	await delayDoHomeArt(finalDelayDoHomeArtValue);
	preloaderDoHomeArtElement = document.getElementById('preloader');
	var isRunning = preloaderDoHomeArtElement && isDoHomeArtElementAnimating(preloaderDoHomeArtElement);

	if (isRunning) {
		// console.log("Preloader is running. Adding class...");
		targetElement.classList.add("preloader-is-not-active");
	} else {
		// console.log("Preloader is not running. Removing class...");
		targetElement.classList.remove("preloader-is-not-active");
	}

	// console.log("Updated classes:", targetElement.classList);
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

if (!preloaderDoHomeArtElement) {
	// console.log("Preloader element not found. Cannot set up MutationObserver.");
} else {
	// console.log("Preloader element found. Setting up MutationObserver...");
	var observerDoHomeArt = new MutationObserver(function(mutationsList, observerDoHomeArt) {
		// console.log("Mutation observed. Calling setDoHomeArtPreloaderStatus...");
		setDoHomeArtPreloaderStatus();
	});

	observerDoHomeArt.observe(preloaderDoHomeArtElement, {
		attributes: true,
		attributeFilter: ['style'],
		childList: true
	});
}

// console.log("Calling setDoHomeArtPreloaderStatus...");

async function checkPreloaderStatus() {
	while (true) {
		await setDoHomeArtPreloaderStatus();
		var targetElement = document.querySelector("html");
		if (targetElement.classList.contains("preloader-is-not-active")) {
			// console.log("Preloader is not active anymore. Exiting loop.");
			break;
		} else {
			// console.log("Preloader is still active. Continuing...");
		}
	}
}

function setBeforePseudoElementBackground() {
	const root = document.querySelector(":root");
	if (root) {
		root.style.setProperty("--main-content-bg", 'rgba(255,255,255,0.5)');
	} else {
		// console.warn("Root not found.");
	}
}

checkPreloaderStatus();

async function waitForCheckPreloaderStatusCompletion() {
	await new Promise(resolve => setTimeout(resolve, finalDelayDoHomeArtValue));
	// console.log("Check Preloader Status has finished running.");
	return true;
}
