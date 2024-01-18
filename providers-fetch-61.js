// ... (existing code)

Promise.all([getProviders(), getCategories(), getServices()])
    .then(data => {
        const [providers, categories, services] = data;
        // Aici poți utiliza providers, categories și services pentru a continua procesarea datelor
        console.log('Providers:', providers);
        console.log('Categories:', categories);
        console.log('Services:', services);

        $(document).ready(function () {
            $('#sb_booking_content .category-item').each(function () {
                var categoryLink = $(this).find('a');
                var categoryIdMatch = categoryLink.attr('href').match(/category\/(\d+)/);

                if (categoryIdMatch) {
                    var categoryId = categoryIdMatch[1];
                    console.log('Processing category with ID:', categoryId);

                    // Find all services that match the category
                    var categoryServices = services.filter(service => service.categories.includes(categoryId));
                    console.log('Services for Category ' + categoryId + ':', categoryServices);

                    // Check if there's a valid provider for the category
                    if (categoryServices && categoryServices.length > 0 && categoryServices[0].providers && categoryServices[0].providers.length > 0) {
                        console.log('A valid provider found for categoryId: ' + categoryId);

                        // Iterate through each provider for the category
                        categoryServices[0].providers.forEach(providerId => {
                            console.log('Checking provider with id: ' + providerId);

                            // Find the provider in the providers array
                            var foundProvider = providers.find(provider => provider.id === providerId);

                            if (foundProvider) {
                                console.log('Selected Provider:', foundProvider);
                            } else {
                                console.error('Could not find a valid provider with id: ' + providerId);
                                console.log('All providers:', providers); // Add this line to log all providers
                            }
                        });
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
        console.error('Error:', error);
    });