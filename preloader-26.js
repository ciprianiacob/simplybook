// Function to calculate and output network statistics
function calculateNetworkStatistics() {
    // Total number of requests
    const totalRequests = performance.getEntriesByType('resource').length;

    // Total transferred size in bytes
    const totalTransferredSize = performance.getEntriesByType('resource').reduce((acc, resource) => acc + resource.transferSize, 0);

    // Total size of resources in bytes
    const totalResourceSize = performance.getEntriesByType('resource').reduce((acc, resource) => acc + resource.decodedBodySize, 0);

    // Output the network statistics
    console.log(`${totalRequests} / ${totalTransferredSize} requests`);
    console.log(`${(totalTransferredSize / 1024).toFixed(1)} kB / ${(totalResourceSize / 1024).toFixed(1)} kB transferred`);
    console.log(`${(totalResourceSize / (1024 * 1024)).toFixed(1)} MB / ${(performance.navigation.redirectCount / 1024 * 1024).toFixed(1)} MB resources`);
}

// Function to calculate and output finish time, DOMContentLoaded, and Load times
function calculateTimingStatistics() {
    // Finish time in milliseconds
    const finishTime = performance.timing.domComplete;

    // DOMContentLoaded time in milliseconds
    const domContentLoadedTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;

    // Load time in milliseconds
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;

    // Convert milliseconds to seconds
    const finishTimeSeconds = finishTime / 1000;
    const domContentLoadedTimeSeconds = domContentLoadedTime / 1000;
    const loadTimeSeconds = loadTime / 1000;

    // Output the timing statistics
    console.log(`Finish: ${(finishTimeSeconds / 60).toFixed(1)} min`);
    console.log(`DOMContentLoaded: ${domContentLoadedTimeSeconds.toFixed(2)} s`);
    console.log(`Load: ${loadTimeSeconds.toFixed(2)} s`);
}

// Call functions to calculate and output network statistics and timing statistics
calculateNetworkStatistics();
calculateTimingStatistics();
