const jsonProviderUrl = 'https://dohomeart.co.uk/v2/provider/';
const jsonServicesUrl = 'https://dohomeart.co.uk/v2/service/';

fetch(jsonProviderUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(providerData => {
        fetch(jsonServicesUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(serviceData => {
                $(document).ready(function () {
                    $('#sb_booking_content .category-item').each(function () {
                        var categoryLink = $(this).find('a');
                        var categoryIdMatch = categoryLink.attr('href').match(/category\/(\d+)/);
                        
                        if (categoryIdMatch) {
                            var categoryId = categoryIdMatch[1];
                            console.log('Processing category with ID:', categoryId);

                            // Find all services that match the category
                            var categoryServices = serviceData.filter(service => service.categories.includes(Number(categoryId)));
                            console.log('Services for Category ' + categoryId + ':', categoryServices);

                          // Verificare dacă categoryId există în array-ul de servicii
                          if (categoryServices.some(service => service.categories.includes(Number(categoryId)))) {
                              var x = categoryServices.length;
                              console.log('x:', x);
                              var y = categoryServices[0].providers.length;
                              console.log('y:', y);
                          } else {
                              console.error('Invalid data structure for category ID:', categoryId);
                          }


                            // Check if there's a valid provider for the category
                            if (categoryServices.length > 0 && categoryServices[0].providers.length === 1) {
                                var providerId = Number(categoryServices[0].providers[0]);
                                console.log('providerId:', providerId);
                                var provider = providerData.find(providerObj => providerObj.id === providerId);
                                console.log('provider:', provider);

                                if (provider) {
                                    // Update HTML elements with provider information
                                    var providerTitle = $(this).find('.item__content > .title--h4');
                                    var providerImage = $(this).find('.item__content .kitchen-installers-slider img.motion-reduce');

                                    if (provider.name) {
                                        providerTitle.text(provider.name);
                                    } else {
                                        console.error('Provider does not have the expected structure.');
                                    }

                                    if (provider.picture_path) {
                                        providerImage.attr('src', provider.picture_path);
                                    } else {
                                        console.error('Provider does not have the expected structure.');
                                    }

                                    console.log('Services for Category ' + categoryId + ' and Provider ' + providerId + ':', categoryServices);
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
                console.error('Error fetching or parsing the Service JSON data:', error);
            });
    })
    .catch(error => {
        console.error('Error fetching or parsing the Provider JSON data:', error);
    });
