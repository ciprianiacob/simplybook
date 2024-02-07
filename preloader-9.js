async function measurePageLoadTime() {
    const startTime = performance.now();
    await waitForPageLoad();
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    console.log(`Page loaded in ${loadTime} milliseconds.`);
}

function waitForPageLoad() {
    return new Promise(resolve => {
        window.addEventListener('load', resolve);
    });
}

measurePageLoadTime();

async function setPreloaderStatus() {
  await waitForPageLoad();
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
