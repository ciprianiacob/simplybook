async function fetchProviders() {
	try {
		const response = await fetch('https://dohomeart.co.uk/v2/provider/');
		const providers = await response.json();
		return providers;
	} catch (error) {
		console.error('Error fetching providers:', error);
		throw error;
	}
}

async function processData() {
	try {
		const [providers] = await Promise.all([fetchProviders()]);
		$(document).ready(function() {
			$('#sb_booking_content .category-item').each(function(providerIndex) {
				// Skip the first category-item
				if (providerIndex === 0) {
					return true; // Skip to the next iteration
				}

				var providerTitle = $(this).find('.item__content > .title--h4');
				var providerImage = $(this).find('.item__content .kitchen-installers-slider img.motion-reduce');

				if (providers[providerIndex] && providers[providerIndex].name) {
					providerTitle.text(providers[providerIndex].name);
				} else {
					console.error('Data at index ' + (providerIndex) + ' does not have the expected structure.');
				};

				if (providers[providerIndex] && providers[providerIndex].picture_path) {
					providerImage.attr('src', providers[providerIndex].picture_path);
				} else {
					console.error('Data at index ' + (providerIndex) + ' does not have the expected structure.');
				}
			});
		});
		console.log('Providers:', providers);


	} catch (error) {
		console.error('Error:', error);
	}
}

processData();
