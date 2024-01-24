async function fetchProviders() {
	try {
		const response = await fetch('https://dohomeart.co.uk/v2/provider/');
		const providers = await response.json();
		return providers;
	} catch (error) {
		// console.error('Error fetching providers:', error);
		throw error;
	}
}

async function fetchServices() {
	try {
		const response = await fetch('https://dohomeart.co.uk/v2/service/');
		const services = await response.json();
		return services;
	} catch (error) {
		// console.error('Error fetching services:', error);
		throw error;
	}
}

async function processData() {
	try {
		const providers = await fetchProviders();
		const services = await fetchServices();

		// console.log('Providers:', providers);
		// console.log('Services:', services);

		$(document).ready(function() {
			// ...

			// Log the filtered services
			// console.log('Filtered Services:', filteredServices);

			$('#sb_booking_content .category-item').each(async function(providerIndex) {
				// ...

				if (categoryServices && categoryServices.length > 0) {
					// console.log('A valid provider found for categoryId: ' + categoryId);

					// ...

					for (const service of categoryServices) {
						// ...

						if (service.providers && service.providers.length > 0) {
							// console.log('Provider IDs for Service:', service.providers);

							for (const providerId of service.providers) {
								// console.log('Checking provider with id: ' + providerId);

								var foundProvider = providers.find(provider => Number(provider.id) === Number(providerId));

								if (foundProvider) {
									// console.log('Found Provider:', foundProvider);

									var correspondingService = filteredServices.find(filteredService => filteredService.providers.includes(providerId));

									if (correspondingService) {
										// ...

										// console.log('Could not find a corresponding service for provider with id: ' + providerId);
									} else {
										// console.error('Could not find a corresponding service for provider with id: ' + providerId);
									}
								} else {
									// console.error('Could not find a valid provider with id: ' + providerId);
									// console.log('All providers:', providers);
								}
							}
						} else {
							// console.error('No providers found for the service:', service);
						}
					}
				} else {
					// console.error('No valid provider found for categoryId: ' + categoryId);
				}
			});
		});
	} catch (error) {
		// console.error('Error:', error);
	}
}

processData();

$(document).on('click', '.item__footer .btn.select, #sb_back_button a, .steps-nav li a', function() {
	processData();
});
