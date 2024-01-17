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
                        var categoryId = $(this).find('a').attr('href').match(/category\/(\d+)/)[1];
                        var providerIndex = serviceData.findIndex(service => service.categories.includes(categoryId) && service.providers.length === 1);

                        if (providerIndex === -1) {
                            console.error('Could not find a valid providerIndex for categoryId: ' + categoryId);
                            return;
                        }

                        var providerTitle = $(this).find('.item__content > .title--h4');
                        var providerImage = $(this).find('.item__content .kitchen-installers-slider img.motion-reduce');

                        if (providerData[providerIndex] && providerData[providerIndex].name) {
                            providerTitle.text(providerData[providerIndex].name);
                        } else {
                            console.error('Data at index ' + (providerIndex) + ' does not have the expected structure.');
                        };

                        if (providerData[providerIndex] && providerData[providerIndex].picture_path) {
                            providerImage.attr('src', providerData[providerIndex].picture_path);
                        } else {
                            console.error('Data at index ' + (providerIndex) + ' does not have the expected structure.');
                        }

                        var categoryServices = serviceData.filter(service => service.categories.includes(categoryId) && service.providers.includes(providerData[providerIndex].id));

                        console.log('Services for Category ' + categoryId + ' and Provider ' + providerData[providerIndex].id + ':', categoryServices);

                        // Afiseaza serviciile in consola
                        categoryServices.forEach(service => {
                            console.log('Service Name:', service.name);
                            console.log('Service Description:', service.description);

                            // Adauga codul necesar pentru a actualiza vizualizarea
                            // Exemplu: creaza elemente HTML si adauga-le in DOM
                            var serviceElement = $('<div class="service-item"></div>');
                            serviceElement.append('<h4>' + service.name + '</h4>');
                            serviceElement.append('<p>' + service.description + '</p>');

                            // Adauga elementul in DOM
                            $(this).append(serviceElement);
                        });
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
