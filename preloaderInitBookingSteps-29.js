var domDoHomeArtDomContentLoadedTime = 0;
var domDoHomeArtDomLoadTime = 0;
var delayDoHomeArtValue = (domDoHomeArtDomContentLoadedTime + domDoHomeArtDomLoadTime) * 1000;
var finalDelayDoHomeArtValue = 0;
var preloaderDoHomeArtElement = null;

async function calculateDoHomeArtTimingStatistics() {
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
		finalDelayDoHomeArtValue = Number((domContentLoadedTimeSeconds + loadTimeSeconds).toFixed(2));

		console.log(`DOMContentLoaded: ${domContentLoadedTimeSeconds.toFixed(2)} s`);
		console.log(`Load: ${loadTimeSeconds.toFixed(2)} s`);
		console.log(`DELAY TIME IN SECONDS: ${(domContentLoadedTimeSeconds + loadTimeSeconds).toFixed(2)} s`);
		console.log("FINAL DELAY TIME IN SECONDS: ", finalDelayDoHomeArtValue);

		return finalDelayDoHomeArtValue;
	} catch (error) {
		console.error("Error calculating timing statistics:", error);
	}
}

async function setDoHomeArtPreloaderStatus() {
	var targetElement = document.querySelector("html");
	console.log("Current classes:", targetElement.classList);
	if (targetElement.classList.contains("preloader-is-not-active")) {
		console.log("Preloader is already inactive.");
		return;
	}

	console.log("Calculating timing statistics...");
	await calculateDoHomeArtTimingStatistics();

	console.log("Delaying...");
	await delayDoHomeArt(finalDelayDoHomeArtValue);
	preloaderDoHomeArtElement = document.getElementById('preloader');
	var isRunning = preloaderDoHomeArtElement && isDoHomeArtElementAnimating(preloaderDoHomeArtElement);

	if (isRunning) {
		console.log("Preloader is running. Adding class..." + finalDelayDoHomeArtValue * 1000);
		targetElement.classList.add("preloader-is-not-active");
	} else {
		console.log("Preloader is not running. Removing class...");
		targetElement.classList.remove("preloader-is-not-active");
	}

	console.log("Updated classes:", targetElement.classList);
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
	console.log("Preloader element not found. Cannot set up MutationObserver.");
} else {
	console.log("Preloader element found. Setting up MutationObserver...");
	var observerDoHomeArt = new MutationObserver(function(mutationsList, observerDoHomeArt) {
		console.log("Mutation observed. Calling setDoHomeArtPreloaderStatus...");
		setDoHomeArtPreloaderStatus();
	});

	observerDoHomeArt.observe(preloaderDoHomeArtElement, {
		attributes: true,
		attributeFilter: ['style'],
		childList: true
	});
}

console.log("Calling setDoHomeArtPreloaderStatus...");

function setStepServiceBackLink() {
	var setStepBackLink = document.querySelector('#steps-content #sb_back_button a');
	if (setStepBackLink) {
		setStepBackLink.setAttribute('href', '#book/count/1/');
		setStepBackLink.style.pointerEvents = "all";
	}
}

function buildAppendedPreloader() {
	if (!document.getElementById('appendedPreloader')) {
		var preloaderDiv = document.createElement('div');
		preloaderDiv.id = 'appendedPreloader';
		preloaderDiv.className = 'theme-preloader';
		preloaderDiv.innerHTML = '<div class="theme-preloader__body"><svg class="theme-preloader__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;display:block" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="rotate(0 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(30 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(60 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(90 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(120 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(150 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(180 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(210 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(240 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(270 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(300 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(330 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate></rect></g></svg></div></div>';
		document.body.appendChild(preloaderDiv);
	}
}

async function initBookingSteps() {
	if (typeof finalDelayDoHomeArtValue === 'number' && !isNaN(finalDelayDoHomeArtValue)) {
		setTimeout(async function() {
			const stepContent = document.querySelector('.step-content');
			var setStepBackLink = document.querySelector('#steps-content #sb_back_button a');
			if (setStepBackLink) {
				setStepBackLink.style.pointerEvents = "none";
			}

			if (stepContent) {

				switch (true) {
					case stepContent.classList.contains('location-step') && !document.getElementById('sb_prerequisites_step_container'):
						initLinksLocations();
						filterLocations();
						buildAppendedPreloader();
						document.querySelector("html").classList.add("content-is-loaded");
						if (setStepBackLink) {
							setStepBackLink.style.pointerEvents = "all";
						}
						console.log('Case 1: step-content has class location-step');
						break;
					case stepContent.classList.contains('category-step'):
						// initProvidersFetch();
						if (setStepBackLink) {
							setStepBackLink.style.pointerEvents = "all";
						}
						console.log('Case 1: step-content has class category-step');
						break;
					case stepContent.classList.contains('service-step'):
						// setStepServiceBackLink();
						// filterServices();
						console.log('Case 1: step-content has class service-step');
						break;
					case stepContent.classList.contains('paid-attribute-step'):
						if (setStepBackLink) {
							setStepBackLink.style.pointerEvents = "all";
						}
						console.log('Case 1: step-content has class paid-attribute-step');
						break;
					case stepContent.classList.contains('provider-step'):
						// initProviders();
						if (setStepBackLink) {
							setStepBackLink.style.pointerEvents = "all";
						}
						console.log('Case 1: step-content has class provider-step');
						break;
					case stepContent.classList.contains('datetime-step'):
						// initAvailability();
						if (setStepBackLink) {
							setStepBackLink.style.pointerEvents = "all";
						}
						console.log('Case 1: step-content has class datetime-step');
						break;
					case stepContent.classList.contains('detail-step'):
						// initAvailability();
						if (setStepBackLink) {
							setStepBackLink.style.pointerEvents = "all";
						}
						console.log('Case 1: step-content has class detail-step');
						break;
					default:
				}
			}
		}, 1);
	} else {
		console.error("Error: finalDelayDoHomeArtValue is not a valid number.");
	}
}

async function checkPreloaderStatus() {
	while (true) {
		await setDoHomeArtPreloaderStatus();
		var targetElement = document.querySelector("html");
		if (targetElement.classList.contains("preloader-is-not-active")) {
			setTimeout(initBookingSteps, finalDelayDoHomeArtValue * 1000);
			console.log("Preloader is not active anymore. Exiting loop.");
			break;
		} else {
			console.log("Preloader is still active. Continuing...");
		}
	}
}

async function resetToInitialValues() {
	document.querySelector("html").classList.remove("preloader-is-not-active", "content-is-loaded");
	domDoHomeArtDomContentLoadedTime = 0;
	domDoHomeArtDomLoadTime = 0;
	delayDoHomeArtValue = (domDoHomeArtDomContentLoadedTime + domDoHomeArtDomLoadTime) * 1000;
	finalDelayDoHomeArtValue = 0;
	preloaderDoHomeArtElement = null;
	document.querySelector(":root").style.setProperty("--main-content-bg", 'rgba(255,255,255,1)');
	await checkPreloaderStatus();
}

resetToInitialValues();

window.addEventListener('hashchange', function() {
	resetToInitialValues();
});

async function waitForCheckPreloaderStatusCompletion() {
	await new Promise(resolve => setTimeout(resolve, finalDelayDoHomeArtValue));
	console.log("Check Preloader Status has finished running.");
	return true;
}
