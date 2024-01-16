// External link to the JSON file
const jsonUrl = 'https://dohomeart.co.uk/v2/provider/';

// Fetch data from the external JSON file
fetch(jsonUrl)
	.then(response => response.json())
	.then(data => {
		$(document).ready(function() {
			$('#sb_booking_content .category-item').each(function(providerIndex) {
				$(this).find('.item__content > .title--h4').text(data[providerIndex].name);
			});
		});

		console.log(data);
	})
	.catch(error => {
		console.error('Error fetching the JSON data:', error);
	});
