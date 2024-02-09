async function initBookingSteps() {
    await checkPreloaderStatus();
    const targetElement = document.querySelector("html");
    const root = document.querySelector(":root");

    if (typeof finalDelayDoHomeArtValue === 'number' && !isNaN(finalDelayDoHomeArtValue)) {
        setTimeout(async function() {
            const stepContent = document.querySelector('.step-content');

            if (stepContent) {
                targetElement.classList.remove("preloader-is-not-active");
                domDoHomeArtDomContentLoadedTime = 0;
                domDoHomeArtDomLoadTime = 0;
                delayDoHomeArtValue = (domDoHomeArtDomContentLoadedTime + domDoHomeArtDomLoadTime) * 1000;
                finalDelayDoHomeArtValue = 0;
                preloaderDoHomeArtElement = null;
                root.style.setProperty("--main-content-bg", 'rgba(255,255,255,1)');
                await checkPreloaderStatus();

                switch (true) {
                    case stepContent.classList.contains('location-step') && !document.getElementById('sb_prerequisites_step_container'):
                        setTimeout(filterLocations, 500); // Reduced timeout to 500ms
                        break;
                    case stepContent.classList.contains('category-step'):
                        setTimeout(initProviders, 500); // Reduced timeout to 500ms
                        break;
                    case stepContent.classList.contains('service-step'):
                        setTimeout(filterServices, 500); // Reduced timeout to 500ms
                        break;
                    case stepContent.classList.contains('paid-attribute-step'):
                        break;
                    case stepContent.classList.contains('datetime-step'):
                        setTimeout(initAvailability, 500); // Reduced timeout to 500ms
                        break;
                    default:
                        // No action needed
                }
            }
        }, 100); // Reduced initial timeout to 100ms
    } else {
        console.error("Error: finalDelayDoHomeArtValue is not a valid number.");
    }
}

async function waitUntilCheckPreloaderStatusCompletion() {
    await waitForCheckPreloaderStatusCompletion();
    const delayValue = await calculateDoHomeArtTimingStatistics();
    setTimeout(initBookingSteps, 100); // Reduced timeout to 100ms
}

waitUntilCheckPreloaderStatusCompletion();
