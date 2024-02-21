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
						setTimeout(initLinksLocations, 1000);
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
