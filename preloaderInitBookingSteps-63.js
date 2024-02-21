// Function to set background color for a pseudo-element
function setBeforePseudoElementBackground(color) {
    document.querySelector(":root").style.setProperty("--main-content-bg", color);
}

// Function to toggle preloader display status
function togglePreloader(active) {
    const preloader = document.getElementById('appendedPreloader');
    if (preloader) {
        preloader.style.display = active ? 'block' : 'none';
    }
}

// Function to calculate timing statistics
function calculateTimingStatistics() {
    const timing = performance.timing;
    if (!timing || timing.domContentLoadedEventEnd <= 0 || timing.loadEventEnd <= 0) {
        console.warn("Timing data is incomplete or invalid.");
        return null;
    }
    const domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    return {
        domContentLoadedTime: (domContentLoadedTime + 5) / 1000,
        loadTime: (loadTime + 5) / 1000
    };
}

// Function to delay execution
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to handle preloader status
async function handlePreloaderStatus(finalDelayValue) {
    const isRunning = isElementAnimating(document.getElementById('preloader'));
    if (isRunning) {
        await buildAppendedPreloader();
        togglePreloader(false);
        setBeforePseudoElementBackground('rgba(255,255,255,0)');
    } else {
        togglePreloader(true);
    }
    await delay(finalDelayValue);
}

// Function to check if an element is animating
function isElementAnimating(element) {
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.getPropertyValue('display') === 'none';
}

// Function to initialize booking steps
async function initializeBookingSteps(finalDelayValue) {
    await delay(finalDelayValue);
    const stepContent = document.querySelector('.step-content');
    const setStepBackLink = document.querySelector('#steps-content #sb_back_button a');
    const appendedPreloader = document.querySelector('#appendedPreloader');
    const root = document.querySelector(":root");

    if (!stepContent || !setStepBackLink || !appendedPreloader || !root) {
        return;
    }

    root.style.setProperty("--main-content-bg", 'rgba(255,255,255,0.5)');
    appendedPreloader.style.display = 'block';
    setStepBackLink.style.pointerEvents = "none";

    if (stepContent.classList.contains('location-step') && !document.getElementById('sb_prerequisites_step_container')) {
        // Handle location step
    } else if (stepContent.classList.contains('category-step')) {
        // Handle category step
    } else if (stepContent.classList.contains('service-step')) {
        // Handle service step
    } else if (stepContent.classList.contains('paid-attribute-step')) {
        // Handle paid attribute step
    } else if (stepContent.classList.contains('provider-step')) {
        // Handle provider step
    } else if (stepContent.classList.contains('datetime-step')) {
        // Handle datetime step
    } else if (stepContent.classList.contains('detail-step')) {
        // Handle detail step
    } else {
        // Default case
    }
}

// Function to reset to initial values
async function resetToInitialValues() {
    const root = document.querySelector(":root");
    if (root) {
        root.classList.remove("preloader-is-not-active", "content-is-loaded");
        root.style.setProperty("--main-content-bg", 'rgba(255,255,255,1)');
        root.style.setProperty("--main-content-before-content", '');
    }
    await checkPreloaderStatus();
}

// Function to check preloader status
async function checkPreloaderStatus() {
    while (true) {
        await handlePreloaderStatus(finalDelayDoHomeArtValue);
        const targetElement = document.querySelector("html");
        if (targetElement.classList.contains("preloader-is-not-active")) {
            await initializeBookingSteps(finalDelayDoHomeArtValue);
            console.log("Preloader is not active anymore. Exiting loop.");
            break;
        }
    }
}

// Function to initialize the application
async function initializeApplication() {
    const timingStats = calculateTimingStatistics();
    if (!timingStats) {
        console.error("Error calculating timing statistics.");
        return;
    }
    const finalDelayDoHomeArtValue = Number((timingStats.domContentLoadedTime + timingStats.loadTime).toFixed(2));
    await resetToInitialValues();
}

// Event listener for hashchange event
window.addEventListener('hashchange', resetToInitialValues);

// Initialize the application
initializeApplication();
