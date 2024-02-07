// Wait for the page to fully load
window.addEventListener('load', function() {
    // Get timing information
    var timing = window.performance.timing;

    // Calculate timing statistics
    var navigationStart = timing.navigationStart;
    var pageLoadTime = timing.loadEventEnd - navigationStart;
    var domContentLoadedTime = timing.domContentLoadedEventEnd - navigationStart;

    console.log('DOM content loaded: ' + domContentLoadedTime + ' milliseconds');
    console.log('Page load time: ' + pageLoadTime + ' milliseconds');

    // Get network resources timing information
    var resources = window.performance.getEntriesByType('resource');

    // Calculate and log network statistics
    resources.forEach(function(resource) {
        console.log('Resource URL: ' + resource.name);
        console.log('Resource load time: ' + resource.duration + ' milliseconds');
        console.log('Resource size: ' + resource.transferSize + ' bytes');
    });
});
