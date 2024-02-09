var finalDelayDoHomeArtValue = 0;
var preloaderDoHomeArtElement = null;

async function resetToInitialValues() {
    const htmlElement = document.querySelector("html");
    const rootElement = document.querySelector(":root");
    
    try {
        htmlElement.classList.remove("preloader-is-not-active", "content-is-not-loading");
        rootElement.style.setProperty("--main-content-bg", 'rgba(255,255,255,1)');
        await checkPreloaderStatus();
    } catch (error) {
        // console.error("Error resetting to initial values:", error);
    }
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
                        setTimeout(filterLocations, 1000);
                        break;
                    case stepContent.classList.contains('category-step'):
                        setTimeout(initProviders, 1000);
                        break;
                    case stepContent.classList.contains('service-step'):
                        setTimeout(filterServices, 1000);
                        break;
                    case stepContent.classList.contains('paid-attribute-step'):
                        break;
                    case stepContent.classList.contains('datetime-step'):
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
