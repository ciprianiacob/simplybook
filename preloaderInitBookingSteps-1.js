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
		setTimeout(setBeforePseudoElementBackground, domContentLoadedTimeSeconds * 1000);
		var loadTimeSeconds = (loadTime + 5) / 1000;
		finalDelayDoHomeArtValue = Number((domContentLoadedTimeSeconds + loadTimeSeconds).toFixed(2));
		return finalDelayDoHomeArtValue;

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
		console.log("Preloader is running. Adding class...");
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

async function checkPreloaderStatus() {
	while (true) {
		await setDoHomeArtPreloaderStatus();
		var targetElement = document.querySelector("html");
		if (targetElement.classList.contains("preloader-is-not-active")) {
			async function resetToInitialValues() {
				document.querySelector("html").classList.remove("preloader-is-not-active");
				domDoHomeArtDomContentLoadedTime = 0;
				domDoHomeArtDomLoadTime = 0;
				delayDoHomeArtValue = (domDoHomeArtDomContentLoadedTime + domDoHomeArtDomLoadTime) * 1000;
				finalDelayDoHomeArtValue = 0;
				preloaderDoHomeArtElement = null;
				document.querySelector(":root").style.setProperty("--main-content-bg", 'rgba(255,255,255,1)');
				await checkPreloaderStatus();
			}

			function setStepServiceBackLink() {
				var setStepBackLink = document.querySelector('#steps-content #sb_back_button a');
				if (setStepBackLink) {
					setStepBackLink.setAttribute('href', '#book/count/1/');
					setTimeout(function() {
						setStepBackLink.style.pointerEvents = "all";
					}, 1000);
				}
			}

			async function initBookingSteps() {
				await checkPreloaderStatus();

				if (typeof finalDelayDoHomeArtValue === 'number' && !isNaN(finalDelayDoHomeArtValue)) {
					setTimeout(async function() {
						const stepContent = document.querySelector('.step-content');
						var setStepBackLink = document.querySelector('#steps-content #sb_back_button a');
						if (setStepBackLink) {
							setStepBackLink.style.pointerEvents = "none";
						}

						if (stepContent) {
							resetToInitialValues();

							switch (true) {
								case stepContent.classList.contains('location-step') && !document.getElementById('sb_prerequisites_step_container'):
									setTimeout(initLinksLocations, 2000);
									setTimeout(filterLocations, 1000);
									if (setStepBackLink) {
										setStepBackLink.style.pointerEvents = "all";
									}
									break;
								case stepContent.classList.contains('category-step'):
									// setTimeout(initProvidersFetch, 1000);
									if (setStepBackLink) {
										setStepBackLink.style.pointerEvents = "all";
									}
									break;
								case stepContent.classList.contains('service-step'):
									// setTimeout(setStepServiceBackLink, 2000);
									// setTimeout(filterServices, 2000);
									break;
								case stepContent.classList.contains('paid-attribute-step'):
									if (setStepBackLink) {
										setStepBackLink.style.pointerEvents = "all";
									}
									break;
								case stepContent.classList.contains('provider-step'):
									// setTimeout(initProviders, 1000);
									if (setStepBackLink) {
										setStepBackLink.style.pointerEvents = "all";
									}
									break;
								case stepContent.classList.contains('datetime-step'):
									// setTimeout(initAvailability, 2000);
									if (setStepBackLink) {
										setStepBackLink.style.pointerEvents = "all";
									}
									break;
								case stepContent.classList.contains('detail-step'):
									// setTimeout(initAvailability, 2000);
									if (setStepBackLink) {
										setStepBackLink.style.pointerEvents = "all";
									}
									break;
								default:
							}
						}
					}, 100);
				} else {
					console.error("Error: finalDelayDoHomeArtValue is not a valid number.");
				}
			}

			async function waitUntilCheckPreloaderStatusCompletion() {
				await waitForCheckPreloaderStatusCompletion();
				const delayValue = await calculateDoHomeArtTimingStatistics();
				setTimeout(initBookingSteps, 500);
			}

			waitUntilCheckPreloaderStatusCompletion();

			window.addEventListener('hashchange', function() {
				resetToInitialValues();
				waitUntilCheckPreloaderStatusCompletion();
			});
			console.log("Preloader is not active anymore. Exiting loop.");
			break;
		} else {
			console.log("Preloader is still active. Continuing...");
		}
	}
}

function setBeforePseudoElementBackground() {
	const root = document.querySelector(":root");
	if (root) {
		root.style.setProperty("--main-content-bg", 'rgba(255,255,255,0.5)');
	} else {
		console.warn("Root not found.");
	}
}

checkPreloaderStatus();

async function waitForCheckPreloaderStatusCompletion() {
	await new Promise(resolve => setTimeout(resolve, finalDelayDoHomeArtValue));
	console.log("Check Preloader Status has finished running.");
	return true;
}
