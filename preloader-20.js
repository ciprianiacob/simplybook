async function measurePageLoadTime() {
    return new Promise(resolve => {
        // Listen for the 'readystatechange' event
        document.addEventListener('readystatechange', function() {
            // When the document's readyState is "interactive", calculate the Load time
            if (document.readyState === 'interactive') {
                // Calculate the Load time
                const loadTime = performance.now() - performance.timing.navigationStart;

                // Output the Load event time
                console.log(`Load: ${loadTime / 1000} s`);

                // Resolve the promise with Load time
                resolve(loadTime / 1000); // convert to seconds
            }
        });
    });
}
measurePageLoadTime();

async function setPreloaderStatus() {
  // Measure page load time
  const pageLoadTimeSeconds = await measurePageLoadTime();
    
  // Output the page load time
  console.log(`Page loaded in ${pageLoadTimeSeconds.toFixed(2)} s`);
  
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
