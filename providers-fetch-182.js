(function() {
	function setPreloaderStatus() {
		delay(3000).then(function() {
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

	var loadingClassTimeout;

	function addLoadingClass() {
		var categoryItems = document.querySelectorAll('#sb_booking_content .category-item');
		categoryItems.forEach(function(categoryItem) {
			categoryItem.classList.add('cat-loading-element');
		});
	}

	addLoadingClass();
	async function handleLoadingClass() {
		await delay(0);
		setPreloaderStatus();
	}



	function removeLoadingClass() {
		var categoryLoadingItems = document.querySelectorAll('#sb_booking_content .cat-loading-element');
		categoryLoadingItems.forEach(function(categoryItem) {
			loadingClassTimeout = setTimeout(function() {
				categoryItem.classList.remove('cat-loading-element');
			}, 2000);
		});
	}

	function clearLoadingClassTimeout() {
		if (loadingClassTimeout) {
			clearTimeout(loadingClassTimeout);
		}
	}

	async function fetchProviders() {
		try {
			const response = await fetch('https://dohomeart.co.uk/v2/provider/');
			return await response.json();
		} catch (error) {
			// console.error('Error fetching providers:', error);
			throw error;
		}
	}

	async function fetchServices() {
		try {
			const response = await fetch('https://dohomeart.co.uk/v2/service/');
			return await response.json();
		} catch (error) {
			// console.error('Error fetching services:', error);
			throw error;
		}
	}

	async function constructURLOne(location, provider, service) {
		var baseURL = 'https://dohomeart.co.uk/v2/booking/first-working-day';
		var url = baseURL + '?location=' + location + '&provider=' + provider + '&service=' + service + '&timeline=modern_week';
		console.log(url);
		return url;
	}

	async function processData() {
		try {
			const providers = await fetchProviders();
			const services = await fetchServices();

			$(document).ready(function() {
				const targetCommonName = "Pre-installation of Wall units only • 10 to 12 units in total";

				const filteredServices = services.filter(service => {
					const commonNameMatch = service.name.match(new RegExp(`^${targetCommonName} \\(\\w{2}\\d+\\)$`));
					return commonNameMatch !== null;
				});

				for (const service of filteredServices) {
					if (service.providers && service.providers.length > 0) {
						for (const providerId of service.providers) {
							const foundProvider = providers.find(provider => Number(provider.id) === Number(providerId));

							if (foundProvider) {
								const correspondingService = filteredServices.find(filteredService => filteredService.providers.includes(providerId));

								if (correspondingService) {
									$('#sb_booking_content .category-item').each(async function(providerIndex) {
										if (providerIndex === 0) {
											return true;
										}

										const categoryItem = $(this);

										async function processCategoryItem() {
											const categoryLink = categoryItem.find('a');
											const categoryIdMatch = categoryLink.attr('href').match(/category\/(\d+)/);

											if (categoryIdMatch) {
												const categoryId = categoryIdMatch[1];
												const locationMatch = categoryLink.attr('href').match(/location\/(\d+)/);
												const locationValue = locationMatch ? locationMatch[1] : null;

												const categoryServices = services.filter(service => service.categories.includes(categoryId));

												for (const service of categoryServices) {
													if (service.providers && service.providers.length > 0) {
														for (const providerId of service.providers) {
															const foundProvider = providers.find(provider => Number(provider.id) === Number(providerId));

															if (foundProvider) {
																const correspondingService = filteredServices.find(filteredService => filteredService.providers.includes(providerId));

																if (correspondingService) {
																	// Set the service ID directly on the categoryItem or any appropriate data attribute
																	categoryItem.attr('data-service-id', correspondingService.id);

																	const providerTitle = categoryItem.find('.item__content > .title--h4');
																	const providerImage = categoryItem.find('.item__content .kitchen-installers-slider img.motion-reduce');
																	const priceElement = categoryItem.find('.price-item');
																	const providerProp = categoryItem.find('.item__content .kitchen-installers-slider');

																	providerTitle.text(foundProvider.name);
																	providerImage.attr('src', foundProvider.picture_path);

																	const servicePrice = correspondingService.price;
																	const serviceDuration = correspondingService.duration;
																	const roundedPrice = Math.round(servicePrice / (serviceDuration / 15) * 4).toFixed(2);
																	priceElement.text(roundedPrice);

																	providerProp.attr('data-provider-name', foundProvider.name);
																	providerProp.attr('data-provider-hourly-rate', roundedPrice);
																	providerProp.attr('data-provider-reviews', "");

																	if (providerProp.attr('data-provider-availability-first-day') === "null") {
																		try {
																			const constructedUrl = await constructURLOne(locationValue, providerId, correspondingService.id);

																			console.log("Constructed URL for provider:", foundProvider.name, constructedUrl);

																			const response = await fetch(constructedUrl);
																			const jsonResponse = await response.json();

																			const firstWorkDay = jsonResponse.date;

																			console.log("Constructed URL:", constructedUrl);
																			console.log("First work day for provider:", foundProvider.name, firstWorkDay);

																			providerProp.attr('data-provider-availability-first-day', firstWorkDay);

																			const iframe = categoryItem.find('.modal iframe.sb-widget-iframe');

const canvasCalendar = categoryItem.find('.canvas-calendar');

// Create a canvas element
const calendarCanvas = document.createElement('canvas');
calendarCanvas.width = 300; // Set the desired width
calendarCanvas.height = 200; // Set the desired height
calendarCanvas.setAttribute('class', 'calendar-canvas');

// Append the canvas to the canvas-calendar div
canvasCalendar.append(calendarCanvas);

// ... (existing code)

if (iframe.length > 0) {
    const iframeSrc = `?widget-type=iframe#book/location/${locationValue}/category/${categoryId}/service/${correspondingService.id}/count/1/addons/no/provider/${providerId}/`;

    // Set the iframe source
    iframe.attr('src', iframeSrc);

    // Draw the content of the iframe onto the calendarCanvas
    const canvasContext = calendarCanvas.getContext('2d');

    // Use a delay to allow the iframe content to load before capturing
    setTimeout(function () {
        // Draw the iframe content onto the canvas
        canvasContext.fillStyle = 'white'; // Set background color if needed
        canvasContext.fillRect(0, 0, calendarCanvas.width, calendarCanvas.height);
        canvasContext.drawWindow(window, 0, 0, calendarCanvas.width, calendarCanvas.height, 'transparent');

        // Convert canvas to data URL
        const dataURL = calendarCanvas.toDataURL('image/png');

        // Create an image element and set its source to the data URL
        const imageElement = document.createElement('img');
        imageElement.src = dataURL;

        // Append the image element to the body or any desired location
        document.body.appendChild(imageElement);

        // Add a class to the screenshot for styling
        imageElement.classList.add('screenshot');
    }, 1000); // Adjust the delay as needed
}

// ...


                                      
																		} catch (error) {
																			// console.error('Error processing category item:', error);
																		}
																	}
																} else {
																	// console.error('Could not find a corresponding service for provider with id: ' + providerId);
																}
															} else {
																// console.error('Could not find a valid provider with id: ' + providerId);
															}
														}
													} else {
														// console.error('No providers found for the service:', service);
													}
												}
											} else {
												// console.error('Could not extract category ID from link:', categoryLink);
											}
										}

										await processCategoryItem();
									});

									removeLoadingClass();
								} else {
									// console.error('Could not find a corresponding service for provider with id: ' + providerId);
								}
							} else {
								// console.error('Could not find a valid provider with id: ' + providerId);
							}
						}
					} else {
						// console.error('No providers found for the service:', service);
					}
				}
			});
		} catch (error) {
			// console.error('Error:', error);
		}
	}

	processData();

	async function handlePreloaderActions() {
		await delay(3000);
		clearLoadingClassTimeout();
		addLoadingClass();
		processData();
	}



	$(document).on('click', '.item__footer .btn.select, #sb_back_button a, .steps-nav li a', async function() {
		if ($('#sb_booking_content').find('.category-step').length > 0) {
			await handleLoadingClass();
			await handlePreloaderActions();
		} else {
			handleLoadingClass();
			handlePreloaderActions();
		}
	});
	$(window).on('hashchange', function() {
		handleLoadingClass();
		handlePreloaderActions();
	});
	document.addEventListener('DOMContentLoaded', function() {
		handleLoadingClass();
		handlePreloaderActions();
	});
	$(document).ready(function() {
		handleLoadingClass();
		handlePreloaderActions();
	});
})();