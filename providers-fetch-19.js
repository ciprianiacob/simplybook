const jsonProviderUrl = 'https://dohomeart.co.uk/v2/provider/';
const jsonServicesUrl = 'https://dohomeart.co.uk/v2/service/';

fetch(jsonProviderUrl)
    .then(response => response.json())
    .then(providerData => {
        console.log('Provider Data:', providerData);
        fetch(jsonServicesUrl)
            .then(response => response.json())
            .then(serviceData => {
                console.log('Service Data:', serviceData);
                $(document).ready(function () {
                    $('#sb_booking_content .category-item').each(function () {
                        var categoryId = $(this).find('a').attr('href').match(/category\/(\d+)/)[1];

                        var serviceForCategory = serviceData.find(service =>
                            service.categories.includes(categoryId) &&
                            Array.isArray(service.providers) &&
                            service.providers.length === 1
                        );

                        if (!serviceForCategory) {
                            console.error('Could not find a valid serviceForCategory for categoryId: ' + categoryId);
                            return;
                        }

                        var providerId = serviceForCategory.providers[0];

                        var provider = providerData.find(provider => {
                            console.log('Comparing provider.id (' + provider.id + ') with providerId (' + providerId + ')');
                            return provider.id === providerId;
                        });

                        if (!provider) {
                            console.error('Could not find a valid provider for providerId: ' + providerId);
                            return;
                        }

                        var providerTitle = $(this).find('.item__content > .title--h4');
                        var providerImage = $(this).find('.item__content .kitchen-installers-slider img.motion-reduce');

                        console.log('Updating for Category ' + categoryId + ' and Provider ' + providerId);

                        if (provider.name) {
                            providerTitle.text(provider.name);
                        } else {
                            console.error('Provider data does not have the expected structure.');
                        }

                        if (provider.picture_path) {
                            providerImage.attr('src', provider.picture_path);
                        } else {
                            console.error('Provider data does not have the expected structure.');
                        }

                        var categoryServices = serviceData.filter(service =>
                            service.categories.includes(categoryId) &&
                            Array.isArray(service.providers) &&
                            service.providers.includes(providerId)
                        );

                        console.log('Services for Category ' + categoryId + ' and Provider ' + providerId + ':', categoryServices);
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching the Service JSON data:', error);
            });
    })
    .catch(error => {
        console.error('Error fetching the Provider JSON data:', error);
    });
