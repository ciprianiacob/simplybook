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
                        var categoryId = $(this).find('a').attr('href').match(/category\/(\d+)/)[1];
                        console.log('Processing category with ID:', categoryId);

                        // Find all services that match the category
                        var categoryServices = serviceData.filter(service => service.categories.includes(categoryId));
                        console.log('Services for Category ' + categoryId + ':', categoryServices);

                        // Iterate through each service and check if the provider is available
                        var provider;
                        for (var i = 0; i < categoryServices.length; i++) {
                            var service = categoryServices[i];
                            if (service.providers && service.providers.length === 1) {
                                provider = providerData.find(providerObj => providerObj.id === Number(service.providers[0]));
                                break; // Stop iterating if a valid provider is found
                            }
                        }

                        if (!provider) {
                            console.error('Could not find a valid provider for categoryId: ' + categoryId);
                            console.log('All providers:', providerData);
                            console.log('All services:', serviceData);
                            return; // Skip to the next iteration
                        }

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

                        console.log('Services for Category ' + categoryId + ' and Provider ' + provider.id + ':', categoryServices);
                        console.log('Selected Provider:', provider);
                        // Actualizează vizualizarea serviciilor pentru categoria curentă și furnizorul curent
                        // Implementați codul necesar pentru a afișa aceste informații în mod corespunzător
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
