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
	setStepBackLink.setAttribute('href', '#book/count/1/');
}

async function initBookingSteps() {
	await checkPreloaderStatus();

	if (typeof finalDelayDoHomeArtValue === 'number' && !isNaN(finalDelayDoHomeArtValue)) {
		setTimeout(async function() {
			const stepContent = document.querySelector('.step-content');

			if (stepContent) {
				resetToInitialValues();

				switch (true) {
					case stepContent.classList.contains('location-step') && !document.getElementById('sb_prerequisites_step_container'):
						setTimeout(initLinksLocations, 1000);
						setTimeout(filterLocations, 1000);
						break;
					case stepContent.classList.contains('category-step'):
						setTimeout(initProvidersFetch, 1000);
						break;
					case stepContent.classList.contains('service-step'):
						setTimeout(setStepServiceBackLink, 1000);
						setTimeout(filterServices, 1000);
						break;
					case stepContent.classList.contains('paid-attribute-step'):
						break;
					case stepContent.classList.contains('provider-step'):
						setTimeout(initProviders, 1000);
						break;
					case stepContent.classList.contains('datetime-step'):
						setTimeout(initAvailability, 2000);
						break;
					case stepContent.classList.contains('detail-step'):
						setTimeout(initAvailability, 2000);
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

$(window).on('hashchange', function() {
	resetToInitialValues();
	waitUntilCheckPreloaderStatusCompletion();
});
