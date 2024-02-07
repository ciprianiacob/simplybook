const performanceTiming = performance.timing;
const navigationStart = performanceTiming.navigationStart;
const loadEventStart = performanceTiming.loadEventStart;
const pageLoadTime = loadEventStart - navigationStart;
console.log({pageLoadTime});
