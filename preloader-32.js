window.addEventListener('load', function() {
    

// Get network resources timing information
var resources = window.performance.getEntriesByType('resource');

// Calculate network statistics
resources.forEach(function(resource) {
    console.log('Resource URL: ' + resource.name);
    console.log('Resource load time: ' + resource.duration + ' milliseconds');
    console.log('Resource size: ' + resource.transferSize + ' bytes');
    // Add more calculations as needed
});

// Get timing information
var timing = window.performance.timing;

// Calculate timing statistics
var navigationStart = timing.navigationStart;
var domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart;
var pageLoadTime = timing.loadEventEnd - timing.navigationStart;

console.log('DOM content loaded: ' + domContentLoadedTime + ' milliseconds');
console.log('Page load time: ' + pageLoadTime + ' milliseconds');
});

