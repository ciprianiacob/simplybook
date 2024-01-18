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
                            console.warn('Could not find a valid serviceForCategory for categoryId: ' + categoryId);
                            return; // Skip to the next iteration
                        }

                        var providerId = serviceForCategory.providers[0];

                        // Convert providerId to a number explicitly
                        providerId = Number
