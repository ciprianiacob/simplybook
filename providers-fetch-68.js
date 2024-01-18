async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getProviders() {
    return fetchData('https://dohomeart.co.uk/v2/provider/');
}

async function getCategories() {
    return fetchData('https://dohomeart.co.uk/v2/ext/category/');
}

async function getServices() {
    return fetchData('https://dohomeart.co.uk/v2/service/');
}

async function processData() {
    try {
        const [providers, categories, services] = await Promise.all([getProviders(), getCategories(), getServices()]);

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
                    if (categoryServices && categoryServices.length > 0) {
                        console.log('A valid provider found for categoryId: ' + categoryId);

                        // Iterate through each service for the category
                        categoryServices.forEach(service => {
                            // Check if service.providers is defined
                            if (service.providers && service.providers.length > 0) {
                                // Iterate through each provider for the service
                                service.providers.forEach(providerId => {
                                    console.log('Checking provider with id: ' + providerId);

                                    // Find the provider in the providers array
                                    var foundProvider = providers.find(provider => provider.id === providerId);

                                    if (foundProvider) {
                                        console.log('Found Provider:', foundProvider);
                                    } else {
                                        console.error('Could not find a valid provider with id: ' + providerId);
                                    }
                                });
                            } else {
                                console.error('No providers found for the service:', service);
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
    } catch (error) {
        console.error('Error:', error);
    }
}

processData();
