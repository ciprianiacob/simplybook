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

function updateProviderInfo(provider, element) {
  element.find('.item__content > .title--h4').text(provider.name);
  element.find('.item__content .kitchen-installers-slider img.motion-reduce').attr('src', provider.picture_path);
}

function updateServiceInfo(service, element) {
  const servicePrice = service.price;
  const serviceDuration = service.duration;

  // Round the calculated value using Math.round()
  const roundedPrice = Math.round(servicePrice / (serviceDuration / 15) * 4);

  element.find('.price-item').text(roundedPrice);
  // Add code to update the duration in the DOM if needed
}

async function processData() {
  try {
    const providers = await fetchProviders();
    const services = await fetchServices();

    console.log('Providers:', providers);
    console.log('Services:', services);

    // Specify the common name you want to filter
    const targetCommonName = "Pre-installation of Wall units only • 10 to 12 units in total";

    // Filter services based on the common name
    const filteredServices = services.filter(service => {
      const commonNameMatch = service.name.match(new RegExp(`^${targetCommonName} \\(\\w{2}\\d+\\)$`));
      return commonNameMatch !== null;
    });

    // Log the filtered services
    console.log('Filtered Services:', filteredServices);

    $(document).ready(async function () {
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

                    // Update the DOM with the found provider and price
                    updateProviderInfo(foundProvider, $(this));
                    updateServiceInfo(service, $(this));
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

processData();