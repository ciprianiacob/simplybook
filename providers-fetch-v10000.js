const jsonUrl = 'https://dohomeart.co.uk/v2/provider/';

fetch(jsonUrl)
  .then(response => response.json())
  .then(data => {
    $(document).ready(function() {
      $('#sb_booking_content .category-item').each(function(providerIndex) {
        var target = $(this).find('.item__content > .title--h4');
        // Check if data[providerIndex] exists before accessing its 'name' property
        if (data[providerIndex] && data[providerIndex].name) {
          target.text(data[providerIndex].name);
        } else {
          console.error('Data at index ' + providerIndex + ' does not have the expected structure.');
        }
      });
    });

    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching the JSON data:', error);
  });
