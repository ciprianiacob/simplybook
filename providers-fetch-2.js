function initProviders() {
	(function() {

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
			// console.log(url);
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

																				// console.log("Constructed URL for provider:", foundProvider.name, constructedUrl);

																				const response = await fetch(constructedUrl);
																				const jsonResponse = await response.json();

																				const firstWorkDay = jsonResponse.date;

																				// console.log("Constructed URL:", constructedUrl);
																				// console.log("First work day for provider:", foundProvider.name, firstWorkDay);

																				providerProp.attr('data-provider-availability-first-day', firstWorkDay);

																				const iframes = categoryItem.find('iframe.sb-widget-iframe');

																				if (iframes.length > 0) {
																					iframes.each(function(index) {
																						const iframe = $(this);
																						const iframeSrc = `?widget-type=iframe#book/location/${locationValue}/category/${categoryId}/service/${correspondingService.id}/count/1/addons/no/provider/${providerId}/`;
																						iframe.attr('src', iframeSrc);
																					});
																				}

																			} catch (error) {
																				// console.error('Error processing category item:', error);
																			}
																		}
																		categoryItem.classList.add("content-is-not-loading");
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
			await delay(200);
			clearLoadingClassTimeout();
			addLoadingClass();
			await processData();
		}
    
	})();
}
