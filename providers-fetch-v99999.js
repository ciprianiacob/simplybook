const jsonProviderUrl = 'https://dohomeart.co.uk/v2/provider/';

fetch(jsonProviderUrl)
  .then(response => response.json())
  .then(data => {
    $(document).ready(function() {
      $('#sb_booking_content .category-item').each(function(providerIndex) {
        var target = $(this).find('.item__content > .title--h4');
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
