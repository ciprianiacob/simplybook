// Function to calculate and output network statistics
function calculateNetworkStatistics() {
    try {
        // Retrieve resource entries
        const resourceEntries = performance.getEntriesByType('resource');

        // Check if resource entries are available
        if (resourceEntries.length === 0) {
            console.log("No resource entries found.");
            return;
        }

        // Total number of requests
        const totalRequests = resourceEntries.length;

        // Total transferred size in bytes
        const totalTransferredSize = resourceEntries.reduce((acc, resource) => acc + resource.transferSize, 0);

        // Total size of resources in bytes
        const totalResourceSize = resourceEntries.reduce((acc, resource) => acc + resource.decodedBodySize, 0);

        // Output the network statistics
        console.log(`${totalRequests} requests`);
        console.log(`${(totalTransferredSize / 1024).toFixed(1)} kB transferred`);
        console.log(`${(totalResourceSize / 1024 / 1024).toFixed(1)} MB resources`);
    } catch (error) {
        console.error("Error calculating network statistics:", error);
    }
}

// Function to calculate and output finish time, DOMContentLoaded, and Load times
function calculateTimingStatistics() {
    try {
        const timing = performance.timing;

        // Finish time in milliseconds
        const finishTime = timing.domComplete;

        // DOMContentLoaded time in milliseconds
        const domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart;

        // Load time in milliseconds
        const loadTime = timing.loadEventEnd - timing.navigationStart;

        // Convert milliseconds to seconds
        const finishTimeSeconds = finishTime / 1000;
        const domContentLoadedTimeSeconds = domContentLoadedTime / 1000;
        const loadTimeSeconds = loadTime / 1000;

        // Output the timing statistics
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
