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
                        // Extrage categoryId din link-ul categoriei
                        var categoryId = $(this).find('a').attr('href').match(/category\/(\d+)/)[1];

                        // Extrage providerId din serviciile care corespund categoriei curente
                        var serviceForCategory = serviceData.find(service => service.categories.includes(categoryId) && service.providers && service.providers.length === 1);

                        // Verifică dacă am găsit un serviceForCategory valid
                        if (!serviceForCategory) {
                            console.error('Could not find a valid serviceForCategory for categoryId: ' + categoryId);
                            return; // Skip to the next iteration
                        }

                        var providerId = serviceForCategory.providers[0];

                        // Convert providerId to a number explicitly
                        providerId = Number(providerId);

                        var provider;
                        providerData.forEach(function (providerObj) {
                            console.log('Comparing provider.id (' + providerObj.id + ') with providerId (' + providerId + ')');
                            if (providerObj.id === providerId) {
                                provider = providerObj;
                            }
                        });

                        // Verifică dacă am găsit un provider valid
                        if (!provider) {
                            console.error('Could not find a valid provider for providerId: ' + providerId);
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

                        // Acum asociază serviciile cu categoria și furnizorul corespunzător
                        var categoryServices = serviceData.filter(service => service.categories.includes(categoryId) && service.providers && service.providers.includes(provider.id));

                        console.log('Services for Category ' + categoryId + ' and Provider ' + provider.id + ':', categoryServices);
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
