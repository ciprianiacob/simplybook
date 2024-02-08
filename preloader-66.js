var domDoHomeArtDomContentLoadedTime = 0;
var domDoHomeArtDomLoadTime = 0;
var delayDoHomeArtValue =  (domDoHomeArtDomContentLoadedTime + domDoHomeArtDomLoadTime) * 1000;
var finalDelayDoHomeArtValue = 0;

// Function to calculate and output finish time, DOMContentLoaded, and Load times
function calculateDoHomeArtTimingStatistics() {
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
        var domContentLoadedTimeSeconds = (domContentLoadedTime + 5) / 1000;
        var loadTimeSeconds = (loadTime + 5) / 1000;
        finalDelayDoHomeArtValue = `${(domContentLoadedTimeSeconds + loadTimeSeconds).toFixed(2)}`;

        console.log(`Finish: ${(finishTimeSeconds / 60).toFixed(2)} min`);
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
    if (targetElement.classList.contains("preloader-is-not-active")) {
        return; // Stop further execution if the preloader is not active
    }

    await calculateDoHomeArtTimingStatistics();
  
    await delayDoHomeArt(finalDelayDoHomeArtValue); // Use the delay value calculated based on DOMContentLoaded and Load times
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

setDoHomeArtPreloaderStatus();
