function setPreloaderStatus() {
    delay(3000).then(function () {
        var preloader = document.getElementById('preloader');
        var isRunning = preloader && isElementAnimating(preloader);
        var targetElement = document.querySelector("html");

        if (isRunning) {
            targetElement.classList.add("preloader-is-not-active");
        } else {
            targetElement.classList.remove("preloader-is-not-active");
        }
    });
}

function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

function isElementAnimating(element) {
    var isAnimating = false;
    var computedStyle = window.getComputedStyle(element);

    if (computedStyle.getPropertyValue('display') === 'none') {
        isAnimating = true;
    }

    return isAnimating;
}

var preloaderElement = document.getElementById('preloader');
if (preloaderElement) {
    var observer = new MutationObserver(function (mutationsList, observer) {
        setPreloaderStatus();
    });

    observer.observe(preloaderElement, {
        attributes: true,
        attributeFilter: ['style'],
        childList: true
    });
}
  
setPreloaderStatus();

var loadingClassTimeout;

function addLoadingClass(){
    var categoryItems = document.querySelectorAll('#sb_booking_content .category-item');
    categoryItems.forEach(function(categoryItem) {
        categoryItem.classList.add('cat-loading-element');
    });
}
addLoadingClass();

function removeLoadingClass(){
    var categoryLoadingItems = document.querySelectorAll('#sb_booking_content .cat-loading-element');
    categoryLoadingItems.forEach(function(categoryItem) {
        loadingClassTimeout = setTimeout(function() {
            categoryItem.classList.remove('cat-loading-element');
        }, 2000);
    });
}

function clearLoadingClassTimeout() {
    if (loadingClassTimeout) {
        clearTimeout(loadingClassTimeout);
    }
}

async function fetchProviders() {
    try {
        const response = await fetch('https://dohomeart.co.uk/v2/provider/');
        return await response.json();
    } catch (error) {
        // console.error('Error fetching providers:', error);
        throw error;
    }
}

async function fetchServices() {
    try {
        const response = await fetch('https://dohomeart.co.uk/v2/service/');
        return await response.json();
    } catch (error) {
        // console.error('Error fetching services:', error);
        throw error;
    }
}

async function processData() {
    try {
        const providers = await fetchProviders();
        const services = await fetchServices();

        $(document).ready(function () {
            // console.log('Providers:', providers);
            // console.log('Services:', services);

            const targetCommonName = "Pre-installation of Wall units only • 10 to 12 units in total";

            const filteredServices = services.filter(service => {
                const commonNameMatch = service.name.match(new RegExp(`^${targetCommonName} \\(\\w{2}\\d+\\)$`));
                return commonNameMatch !== null;
            });

            // console.log('Filtered Services:', filteredServices);

            $('#sb_booking_content .category-item').each(async function (providerIndex) {
                if (providerIndex === 0) {
                    return true;
                }

                var categoryLink = $(this).find('a');
                var categoryIdMatch = categoryLink.attr('href').match(/category\/(\d+)/);

                if (categoryIdMatch) {
                    var categoryId = categoryIdMatch[1];
                    // console.log('Processing category with ID:', categoryId);

                    var categoryServices = services.filter(service => service.categories.includes(categoryId));
                    // console.log('Services for Category ' + categoryId + ':', categoryServices);

                    if (categoryServices && categoryServices.length > 0) {
                        // console.log('A valid provider found for categoryId: ' + categoryId);

                        for (const service of categoryServices) {
                            if (service.providers && service.providers.length > 0) {
                                // console.log('Provider IDs for Service:', service.providers);

                                for (const providerId of service.providers) {
                                    // console.log('Checking provider with id: ' + providerId);

                                    var foundProvider = providers.find(provider => Number(provider.id) === Number(providerId));

                                    if (foundProvider) {
                                        // console.log('Found Provider:', foundProvider);

                                        var correspondingService = filteredServices.find(filteredService => filteredService.providers.includes(providerId));

                                        if (correspondingService) {
                                            var servicePrice = correspondingService.price;
                                            var serviceDuration = correspondingService.duration;

                                            var providerTitle = $(this).find('.item__content > .title--h4');
                                            var providerImage = $(this).find('.item__content .kitchen-installers-slider img.motion-reduce');
                                            var priceElement = $(this).find('.price-item');

                                            providerTitle.text(foundProvider.name);
                                            providerImage.attr('src', foundProvider.picture_path);

                                            const roundedPrice = Math.round(servicePrice / (serviceDuration / 15) * 4).toFixed(2);
                                            priceElement.text(roundedPrice);
                                        } else {
                                            // console.error('Could not find a corresponding service for provider with id: ' + providerId);
                                        }
                                    } else {
                                        // console.error('Could not find a valid provider with id: ' + providerId);
                                        // console.log('All providers:', providers);
                                    }
                                }
                            } else {
                                // console.error('No providers found for the service:', service);
                            }
                        }
                    } else {
                        // console.error('No valid provider found for categoryId: ' + categoryId);
                    }
                } else {
                    // console.error('Could not extract category ID from link:', categoryLink);
                }
            });
            removeLoadingClass();
        });
    } catch (error) {
        // console.error('Error:', error);
    }
}

processData();
$(document).on('click', '.item__footer .btn.select, #sb_back_button a, .steps-nav li a', function () {
    if ($('#sb_booking_content').find('.category-step').length > 0) {
        delay(3000).then(function () {
            setPreloaderStatus();
            clearLoadingClassTimeout();
            addLoadingClass();
            processData();
        });
    } else {
        setPreloaderStatus();
        clearLoadingClassTimeout();
        addLoadingClass();
        processData();
    }
});
$(window).on('hashchange', function() {
    setPreloaderStatus();
    clearLoadingClassTimeout();
    addLoadingClass();
    processData();
});
document.addEventListener('DOMContentLoaded', function() {
    setPreloaderStatus();
    clearLoadingClassTimeout();
    addLoadingClass();
    processData();
});
$(document).ready(function() {
    setPreloaderStatus();
    clearLoadingClassTimeout();
    addLoadingClass();
    processData();
});
