const jsonProviderUrl = 'https://dohomeart.co.uk/v2/provider/';
const jsonServicesUrl = 'https://dohomeart.co.uk/v2/service/';

fetch(jsonProviderUrl)
    .then(response => response.json())
    .then(providerData => {
        fetch(jsonServicesUrl)
            .then(response => response.json())
            .then(serviceData => {
                $(document).ready(function () {
                    $('#sb_booking_content .category-item').each(function (categoryIndex) {
                        // Skip the first category-item
                        if (categoryIndex === 0) {
                            return true; // Skip to the next iteration
                        }

                        var categoryId = categoryIndex + 1; // Id-ul categoriilor începe de la 1
                        var providerIndex = categoryIndex; // Furnizorii încep de la 0, verificați dacă asta este corect

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

                        // Acum asociază serviciile cu categoria și furnizorul corespunzător
                        var categoryServices = serviceData.filter(service => service.categories.includes(categoryId) && service.providers.includes(providerData[providerIndex].id));

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
