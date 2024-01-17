const jsonProviderUrl = 'https://dohomeart.co.uk/v2/provider/';

fetch(jsonProviderUrl)
	.then(response => response.json())
	.then(data => {
		$(document).ready(function() {
			$('#sb_booking_content .category-item').each(function(providerIndex) {
				// Skip the first category-item
				if (providerIndex === 0) {
					return true; // Skip to the next iteration
				}

				var providerTitle = $(this).find('.item__content > .title--h4');
				var providerImage = $(this).find('.item__content .kitchen-installers-slider img.motion-reduce');

				if (data[providerIndex] && data[providerIndex].name) {
					providerTitle.text(data[providerIndex ].name);
				} else {
					console.error('Data at index ' + (providerIndex) + ' does not have the expected structure.');
				};

				if (data[providerIndex] && data[providerIndex].picture_path) {
					providerImage.attr('src', data[providerIndex].picture_path);
				} else {
					console.error('Data at index ' + (providerIndex) + ' does not have the expected structure.');
				}
			});
		});

		console.log(data);
	})
	.catch(error => {
		console.error('Error fetching the JSON data:', error);
	});
