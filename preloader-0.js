let domContentLoadedPlusLoadSeconds = 0; // Global variable to store the sum of DOMContentLoaded and Load times

// Function to calculate and output finish time, DOMContentLoaded, and Load times
function calculateNetworkStatistics() {
    try {
        const resourceEntries = performance.getEntriesByType('resource');

        if (resourceEntries.length === 0) {
            console.log("No resource entries found.");
            return;
        }

        const totalRequests = resourceEntries.length;
        const totalTransferredSize = resourceEntries.reduce((acc, resource) => acc + resource.transferSize, 0);
        const totalResourceSize = resourceEntries.reduce((acc, resource) => acc + resource.decodedBodySize, 0);

        console.log(`${totalRequests} / ${totalTransferredSize} requests`);
        console.log(`${(totalTransferredSize / 1024).toFixed(1)} kB / ${(totalResourceSize / 1024).toFixed(1)} kB transferred`);
        console.log(`${(totalResourceSize / (1024 * 1024)).toFixed(1)} MB / ${(performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(1)} MB resources`);
    } catch (error) {
        console.error("Error calculating network statistics:", error);
    }
}

// Function to calculate and output finish time, DOMContentLoaded, and Load times
function calculateTimingStatistics() {
    try {
        const timing = performance.timing;

        if (!timing || timing.domContentLoadedEventEnd <= 0 || timing.loadEventEnd <= 0) {
            console.warn("Timing data is incomplete or invalid.");
            return;
        }

        const finishTime = timing.domComplete;
        const domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart;
        const loadTime = timing.loadEventEnd - timing.navigationStart;

        const finishTimeSeconds = finishTime / 1000;
        const domContentLoadedTimeSeconds = domContentLoadedTime / 1000;
        const loadTimeSeconds = loadTime / 1000;

        console.log(`Finish: ${(finishTimeSeconds / 60).toFixed(1)} min`);
        console.log(`DOMContentLoaded: ${domContentLoadedTimeSeconds.toFixed(2)} s`);
        console.log(`Load: ${loadTimeSeconds.toFixed(2)} s`);
    } catch (error) {
        console.error("Error calculating timing statistics:", error);
    }
}

async function setPreloaderStatus() {
    await calculateTimingStatistics();
    const delayValue = domContentLoadedPlusLoadSeconds * 1000; // Convert seconds to milliseconds

    // Measure page load time
    await calculateNetworkStatistics();
    await delay(delayValue); // Use the delay value calculated based on DOMContentLoaded and Load times

    var preloader = document.getElementById('preloader');
    var isRunning = preloader && isElementAnimating(preloader);
    var targetElement = document.querySelector("html");

    if (isRunning) {
        targetElement.classList.add("preloader-is-not-active");
    } else {
        targetElement.classList.remove("preloader-is-not-active");
    }
}

function delay(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

function isElementAnimating(element) {
    var isAnimating = false;
    var computedStyle = window.getComputedStyle(element);

    if (computedStyle.getPropertyValue('display') === 'none') {
        isAnimating = true;
    }

    return isAnimating;
}

var preloaderElement = document.getElementById('preloader');
if (preloaderElement) {
    var observer = new MutationObserver(function(mutationsList, observer) {
        setPreloaderStatus();
    });

    observer.observe(preloaderElement, {
        attributes: true,
        attributeFilter: ['style'],
        childList: true
    });
}

setPreloaderStatus();
