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
            $('#sb_booking_content .category-item').each(async function (providerIndex) {
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
                        for (const service of categoryServices) {
                            // Check if service.providers is defined
                            if (service.providers && service.providers.length > 0) {
                                // Log the provider IDs from services
                                console.log('Provider IDs for Service:', service.providers);

                                // Iterate through each provider for the service
                                for (const providerId of service.providers) {
                                    console.log('Checking provider with id: ' + providerId);

                                    // Find the provider in the providers array
                                    var foundProvider = providers.find(provider => Number(provider.id) === Number(providerId));

                                    if (foundProvider) {
                                        console.log('Found Provider:', foundProvider);

                                        // Update the DOM with the found provider
                                        var providerTitle = $(this).find('.item__content > .title--h4');
                                        var providerImage = $(this).find('.item__content .kitchen-installers-slider img.motion-reduce');
                                        providerTitle.text(foundProvider.name);
                                        providerImage.attr('src', foundProvider.picture_path);
                                    } else {
                                        console.error('Could not find a valid provider with id: ' + providerId);
                                        console.log('All providers:', providers);
                                    }
                                }
                            } else {
                                console.error('No providers found for the service:', service);
                            }
                        }
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

async function groupServicesByCommonName() {
    try {
        const services = await fetchServices();

        // Create an object to store services grouped by common name
        const groupedServices = {};

        // Iterate through each service
        services.forEach(service => {
            // Extract common name using a regular expression
            const commonNameMatch = service.name.match(/^(.*?) \(\w{2}(\d+)\)$/);
            if (commonNameMatch) {
                const commonName = commonNameMatch[1];
                const providerIdentifier = commonNameMatch[2];

                // Check if the common name already exists in the groupedServices object
                if (!groupedServices[commonName]) {
                    groupedServices[commonName] = [];
                }

                // Add service information to the corresponding common name group
                groupedServices[commonName].push({
                    service,
                    providerIdentifier
                });
            }
        });

        // Log the grouped services
        console.log('Grouped Services:', groupedServices);
    } catch (error) {
        console.error('Error:', error);
    }
}

groupServicesByCommonName();
processData();
