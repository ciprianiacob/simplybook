function getProviders() {
	return fetch('https://dohomeart.co.uk/v2/provider/')
		.then(response => response.json())
		.catch(error => {
			console.error('Error fetching providers:', error);
			return [];
		});
}

function getCategories() {
	return fetch('https://dohomeart.co.uk/v2/ext/category/')
		.then(response => response.json())
		.catch(error => {
			console.error('Error fetching categories:', error);
			return [];
		});
}

function getServices() {
	return fetch('https://dohomeart.co.uk/v2/service/')
		.then(response => response.json())
		.catch(error => {
			console.error('Error fetching services:', error);
			return [];
		});
}

Promise.all([getProviders(), getCategories(), getServices()])
	.then(data => {
		const [providers, categories, services] = data;
		// Aici poți utiliza providers, categories și services pentru a continua procesarea datelor
		console.log('Providers:', providers);
		console.log('Categories:', categories);
		console.log('Services:', services);

		$(document).ready(function() {
			$('#sb_booking_content .category-item').each(function() {
				var categoryLink = $(this).find('a');
				var categoryIdMatch = categoryLink.attr('href').match(/category\/(\d+)/);

				if (categoryIdMatch) {
					var categoryId = categoryIdMatch[1];
					console.log('Processing category with ID:', categoryId);

					// Find all services that match the category
					var categoryServices = services.filter(service => service.categories.includes(categoryId));
					console.log('Services for Category ' + categoryId + ':', categoryServices);

					// Check if there's a valid provider for the category
					if (categoryServices && categoryServices.length > 0 && categoryServices[0].providers && categoryServices[0].providers.length === 1) {
						console.log('A valid provider found for categoryId: ' + categoryId);

						var providerId = categoryServices[0].providers[0];
						console.log('A valid provider found with id: ' + providerId);

						// Find the index of the provider in the providers array
						var providerIndex = providers.findIndex(providerObj => providerObj.id === providerId);

						if (providerIndex !== -1) {
							console.log('A valid provider found with id: ' + providerId);

							// Get the provider using the index
							var provider = providers[providerIndex];

							// Rest of your code...
							console.log('Selected Provider:', provider);
						} else {
							console.error('Could not find a valid provider for categoryId: ' + categoryId);
						}

					} else {
						console.error('No valid provider found for categoryId: ' + categoryId);
					}

				} else {
					console.error('Could not extract category ID from link:', categoryLink);
				}
			});
		});
	})
	.catch(error => {
		console.error('Error:', error);
	});