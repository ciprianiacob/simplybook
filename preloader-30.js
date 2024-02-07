// Function to calculate and output network statistics
function calculateNetworkStatistics() {
    try {
        const resourceEntries = performance.getEntriesByType('resource');

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

        const finishTimeSeconds = (timing.domComplete - timing.navigationStart) / 1000;
        const domContentLoadedTimeSeconds = (timing.domContentLoadedEventEnd - timing.navigationStart) / 1000;
        const loadTimeSeconds = (timing.loadEventEnd - timing.navigationStart) / 1000;

        console.log(`Finish: ${(finishTimeSeconds / 60).toFixed(1)} min`);
        console.log(`DOMContentLoaded: ${domContentLoadedTimeSeconds.toFixed(2)} s`);
        console.log(`Load: ${loadTimeSeconds.toFixed(2)} s`);
    } catch (error) {
        console.error("Error calculating timing statistics:", error);
    }
}

// Call functions to calculate and output network statistics and timing statistics
calculateNetworkStatistics();
calculateTimingStatistics();
