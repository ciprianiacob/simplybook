// Define fetchProviders outside processData
async function fetchProviders() {
    try {
        const response = await fetch('https://dohomeart.co.uk/v2/provider/');
        const providers = await response.json();
        return providers;
    } catch (error) {
        console.error('Error fetching providers:', error);
        throw error;
    }
}

async function fetchServices() {
    try {
        const response = await fetch('https://dohomeart.co.uk/v2/service/');
        const services = await response.json();
        return services;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
}

async function processData() {
    try {
        const providers = await fetchProviders();
        const services = await fetchServices();

        console.log('Providers:', providers);
        console.log('Services:', services);

        $(document).ready(function () {
            $('#sb_booking_content .category-item').each(function (providerIndex) {
                // Skip the first category-item
                if (providerIndex === 0) {
                    return true; // Skip to the next iteration
                }

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
                                        // Add your logic to update the DOM with the found provider
                                    } else {
                                        console.error('Could not find a valid provider with id: ' + providerId);
                                        console.log('All providers:', providers);
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

// Call processData after the definitions
processData();
