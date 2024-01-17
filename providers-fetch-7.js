const jsonProviderUrl = 'https://dohomeart.co.uk/v2/provider/';

fetch(jsonProviderUrl)
  .then(response => response.json())
  .then(data => {
    $(document).ready(function () {
      $('#sb_booking_content .category-item:gt(0)').each(function () {
        var categoryId = $(this).find('.item__tab a').attr('href').match(/category\/(\d+)/)[1];
        var provider = data.find(provider => provider.id === categoryId);

        if (provider) {
          var providerTitle = $(this).find('.item__content > .title--h4');
          var providerImage = $(this).find('.item__content .kitchen-installers-slider img.motion-reduce');

          providerTitle.text(provider.name);

          if (provider.picture_path) {
            providerImage.attr('src', provider.picture_path);
          }

          // Puteți adăuga și alte informații despre furnizor în funcție de necesități
          // Exemplu: $(this).find('.item__content .provider-description').text(provider.description);
        } else {
          console.error('Provider not found for category ' + categoryId);
        }
      });
    });

    console.log("Provider:", data);
  })
  .catch(error => {
    console.error('Error fetching the JSON data:', error);
  });
