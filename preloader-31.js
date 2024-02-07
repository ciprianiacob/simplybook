// Function to calculate network and timing statistics
function calculateStatistics() {
  // Timing information
  const timing = window.performance.timing;

  // Calculate load time
  const loadTime = timing.loadEventEnd - timing.navigationStart;
  console.log('Page Load Time: ' + loadTime + ' milliseconds');

  // Calculate network statistics
  const resources = window.performance.getEntriesByType('resource');
  const numResources = resources.length;
  console.log('Number of Resources: ' + numResources);

  // Calculate average resource load time
  let totalResourceLoadTime = 0;
  for (let i = 0; i < numResources; i++) {
    totalResourceLoadTime += resources[i].duration;
  }
  const avgResourceLoadTime = totalResourceLoadTime / numResources;
  console.log('Average Resource Load Time: ' + avgResourceLoadTime + ' milliseconds');
}

// Call the function when the page has finished loading
window.addEventListener('load', calculateStatistics);
