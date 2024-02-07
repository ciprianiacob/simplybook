async function measurePageLoadTime() {
    const domContentLoadedTime = performance.now();
    await waitForDOMContentLoaded();
    const loadTime = performance.now();
    
    const domContentLoadedDuration = loadTime - domContentLoadedTime;
    console.log(`DOMContentLoaded event fired in ${domContentLoadedDuration} milliseconds.`);
}

function waitForDOMContentLoaded() {
    return new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
    });
}

measurePageLoadTime();

async function setPreloaderStatus() {
  await measurePageLoadTime();
	delay(0).then(function() {
		var preloader = document.getElementById('preloader');
		var isRunning = preloader && isElementAnimating(preloader);
		var targetElement = document.querySelector("html");

		if (isRunning) {
			targetElement.classList.add("preloader-is-not-active");
		} else {
			targetElement.classList.remove("preloader-is-not-active");
		}
	});
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
