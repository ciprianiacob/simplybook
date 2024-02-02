function setPreloaderStatus() {
	delay(3000).then(function() {
		var preloader = document.getElementById('preloader');
		if (preloader) {
			var isRunning = preloader && isElementAnimating(preloader);
		}
		var targetElement = document.querySelector("html");

		if (isRunning && targetElement) {
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
	if (computedStyle) {
		var isThisAnimating = computedStyle && computedStyle.getPropertyValue('display') === 'none';
	}
	if (isThisAnimating) {
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
	if (categoryItems) {
		categoryItems.forEach(function(categoryItem) {
			categoryItem.classList.add('cat-loading-element');
		});
	}
}

addLoadingClass();
async function handleLoadingClass() {
	await delay(0);
	setPreloaderStatus();
}
$(document).on('click', '.item__footer .btn.select, #sb_back_button a, .steps-nav li a', async function() {
	var categoryStep = $('#sb_booking_content').find('.category-step');
	if (categoryStep.length > 0) {
		await handleLoadingClass();
	} else {
		handleLoadingClass();
	}
});
$(window).on('hashchange', function() {
	handleLoadingClass();
});
document.addEventListener('DOMContentLoaded', handleLoadingClass);
$(document).ready(handleLoadingClass);

function removeLoadingClass() {
	var categoryLoadingItems = document.querySelectorAll('#sb_booking_content .cat-loading-element');
	if (categoryLoadingItems) {
		categoryLoadingItems.forEach(function(categoryItem) {
			loadingClassTimeout = setTimeout(function() {
				categoryItem.classList.remove('cat-loading-element');
			}, 2000);
		});
	}
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

		$(document).ready(async function() {
			const targetCommonName = "Pre-installation of";

			const filteredServices = services.filter(service => {
				const commonNameMatch = service.name.match(new RegExp(`^${targetCommonName} \\(\\w{2}\\d+\\)$`));
				return commonNameMatch !== null;
			});

			var categoryItem = $('#sb_booking_content .category-item');
			if (categoryItem) {
				categoryItem.each(async function(providerIndex) {
					if (providerIndex === 0) {
						return true;
					}

					const categoryItem = $(this);
					const categoryLink = categoryItem.find('a');
					if (categoryLink) {
						const categoryIdMatch = categoryLink.attr('href').match(/category\/(\d+)/);
					}
					if (categoryIdMatch) {
						const categoryId = categoryIdMatch[1];
						const locationMatch = categoryLink.attr('href').match(/location\/(\d+)/);
						const locationValue = locationMatch ? locationMatch[1] : null;

						const categoryServices = services.filter(service => service.categories.includes(categoryId));
						const dynamicServiceId = findDynamicServiceId(filteredServices, categoryId);

						for (const service of categoryServices) {
							if (service.providers && service.providers.length > 0) {
								for (const providerId of service.providers) {
									const foundProvider = providers.find(provider => Number(provider.id) === Number(providerId));

									if (foundProvider) {
										const correspondingService = filteredServices.find(filteredService => filteredService.providers.includes(providerId));

										if (correspondingService) {
											const providerTitle = categoryItem.find('.item__content > .title--h4');
											const providerImage = categoryItem.find('.item__content .kitchen-installers-slider img.motion-reduce');
											const priceElement = categoryItem.find('.price-item');
											const providerProp = categoryItem.find('.item__content .kitchen-installers-slider');

											if (providerTitle) {
												providerTitle.text(foundProvider.name);
											}
											if (providerImage) {
												providerImage.attr('src', foundProvider.picture_path);
											}


											const servicePrice = correspondingService.price;
											const serviceDuration = correspondingService.duration;
											const roundedPrice = Math.round(servicePrice / (serviceDuration / 15) * 4).toFixed(2);
											priceElement.text(roundedPrice);

											if (providerProp) {
												providerProp.attr('data-provider-name', foundProvider.name);
												providerProp.attr('data-provider-hourly-rate', roundedPrice);
												providerProp.attr('data-provider-reviews', "");
											}
											if () {

											}


											if (providerProp && providerProp.attr('data-provider-availability-first-day') === "null") {
												try {
													const constructedUrl = await constructURLOne(locationValue, foundProvider.id, dynamicServiceId);

													console.log("Constructed URL for provider:", foundProvider.name, constructedUrl);

													const response = await fetch(constructedUrl);
													const jsonResponse = await response.json();

													const firstWorkDay = jsonResponse.date;

													console.log("Constructed URL:", constructedUrl);
													console.log("First work day for provider:", foundProvider.name, firstWorkDay);

													providerProp.attr('data-provider-availability-first-day', firstWorkDay);
												} catch (error) {
													console.error('Error processing category item:', error);
												}
											}
										} else {
											console.error('Could not find a corresponding service for provider with id: ' + providerId);
										}
									} else {
										console.error('Could not find a valid provider with id: ' + providerId);
									}
								}
							} else {
								console.error('No providers found for the service:', service);
							}
						}
					} else {
						console.error('Could not extract category ID from link:', categoryLink);
					}
				});
			}

			removeLoadingClass();
		});
	} catch (error) {
		console.error('Error:', error);
	}
}

// Call processData to start the process
processData();

async function handlePreloaderActions() {
	await delay(3000);
	clearLoadingClassTimeout();
	addLoadingClass();
	processData();
}
$(document).on('click', '.item__footer .btn.select, #sb_back_button a, .steps-nav li a', async function() {
	var categoryStep = $('#sb_booking_content').find('.category-step');
	if (categoryStep.length > 0) {
		await handlePreloaderActions();
	} else {
		handlePreloaderActions();
	}
});
$(window).on('hashchange', function() {
	handlePreloaderActions();
});
document.addEventListener('DOMContentLoaded', handlePreloaderActions);
$(document).ready(handlePreloaderActions);
