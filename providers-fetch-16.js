const jsonProviderUrl = 'https://dohomeart.co.uk/v2/provider/';
const jsonServicesUrl = 'https://dohomeart.co.uk/v2/service/';

fetch(jsonProviderUrl)
    .then(response => response.json())
    .then(providerData => {
        fetch(jsonServicesUrl)
            .then(response => response.json())
            .then(serviceData => {
                $(document).ready(function () {
                    $('#sb_booking_content .category-item').each(function () {
                        // Extrage categoryId din link-ul categoriei
                        var categoryId = $(this).find('a').attr('href').match(/category\/(\d+)/)[1];
                        console.log("categoryId: ", categoryId);

                        // Găsește serviciul corespunzător categoriei curente și care are un singur provider
                        var serviceForCategory = serviceData.find(service =>
                            service.categories.includes(categoryId) &&
                            Array.isArray(service.providers) &&
                            service.providers.length === 1
                        );

                        // Verifică dacă am găsit un serviceForCategory valid
                        if (!serviceForCategory) {
                            console.error('Could not find a valid serviceForCategory for categoryId: ' + categoryId);
                            return; // Skip to the next iteration
                        }

                        // Extrage providerId din serviciul găsit
                        var providerId = serviceForCategory.providers[0];

                        // Găsește index-ul providerului în datele furnizorilor
                        var providerIndex = providerData.findIndex(provider => provider.id === providerId);

                        // Verifică dacă am găsit un providerIndex valid
                        if (providerIndex === -1) {
                            console.error('Could not find a valid providerIndex for providerId: ' + providerId);
                            return; // Skip to the next iteration
                        }

                        var providerTitle = $(this).find('.item__content > .title--h4');
                        var providerImage = $(this).find('.item__content .kitchen-installers-slider img.motion-reduce');

                        if (providerData[providerIndex] && providerData[providerIndex].name) {
                            providerTitle.text(providerData[providerIndex].name);
                        } else {
                            console.error('Data at index ' + (providerIndex) + ' does not have the expected structure.');
                        }

                        if (providerData[providerIndex] && providerData[providerIndex].picture_path) {
                            providerImage.attr('src', providerData[providerIndex].picture_path);
                        } else {
                            console.error('Data at index ' + (providerIndex) + ' does not have the expected structure.');
                        }

                        // Acum asociază serviciile cu categoria și furnizorul corespunzător
                        var categoryServices = serviceData.filter(service =>
                            service.categories.includes(categoryId) &&
                            Array.isArray(service.providers) &&
                            service.providers.includes(providerData[providerIndex].id)
                        );

                        console.log('Services for Category ' + categoryId + ' and Provider ' + providerData[providerIndex].id + ':', categoryServices);
                        // Actualizează vizualizarea serviciilor pentru categoria curentă și furnizorul curent
                        // Implementați codul necesar pentru a afișa aceste informații în mod corespunzător
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
