function initAvailability() {
    (function() {
        var processingCompletedOne = false;
        var processingCompletedTwo = false;
        var calendar = $('#sb-main-container .datetime-step .calendar');

        if (typeof $ !== 'undefined') {
            if (!processingCompletedTwo && calendar.length) {
                var constructURLOne = function(locatie, category, service, count, addons, provider, date) {
                    var baseURL = 'https://dohomeart.co.uk/v2/booking/time-slots/';
                    var url = baseURL + '?from=' + date + '&to=' + date + '&location=' + locatie + '&provider=' + provider + '&service=' + service + '&count=' + count + '&booking_id=&date=' + date;
                    return url;
                };

                var handleMouseover = function(event) {
                    if (!$(this).data('modificationApplied')) {
                        var currentHref = $(this).attr('href');
                        if (currentHref.indexOf("time/08:00:00/") === -1) {
                            var newHref = currentHref + "time/08:00:00/";
                            $(this).attr('href', newHref);
                        }
                        $(this).data('modificationApplied', true);
                    }
                    event.stopPropagation();
                    console.log('handleMouseover executed:', newHref);
                };

                var processDayOnElementsOne = function() {
                    console.log("Running the function for all 'a.day-on' elements");
                    var aDayOn = $('a.day-on');
                    if (aDayOn.length > 0) {
                        aDayOn.each(function() {
                            var href = $(this).attr('href');
                            var match = href.match(/location\/(\d+)\/category\/(\d+)\/service\/(\d+)\/count\/(\d+)\/addons\/([^\/]+)\/provider\/(\d+)\/date\/(\d{4}-\d{2}-\d{2})/);
                            if (match) {
                                var locatie = match[1];
                                var category = match[2];
                                var service = match[3];
                                var count = match[4];
                                var addons = match[5];
                                var provider = match[6];
                                var date = match[7];
                                var constructedProviderURLOne = constructURLOne(locatie, category, service, count, addons, provider, date);
                                console.log("Constructed URL:", constructedProviderURLOne);
                                $.getJSON(constructedProviderURLOne, function(data) {
                                    var parent = $(this).parent();
                                    if (data.length > 0 && data[0].type === "free") {
                                        parent.addClass("slot-available");
                                    } else {
                                        parent.addClass("slot-not-available");
                                    }
                                }.bind(this));
                            }
                        });
                    }
                    console.log('Finished processing Day-On elements');
                };

                processDayOnElementsOne();

                var processDayOnElementsTwo = function() {
                    console.log("Running the function for all 'a.day-on' elements");
                    if (processingCompletedTwo) {
                        console.log("Processing already completed. Skipping...");
                        return;
                    }
                    var mockEvent = new MouseEvent('mouseover');
                    $('a.day-on').each(function(index, element) {
                        handleMouseover.call(element, mockEvent);
                    });
                    console.log("Finished processing 'a.day-on' elements");
                    processingCompletedTwo = true;
                };

                processDayOnElementsTwo();

                if (processingCompletedOne && processingCompletedTwo) {
                    if (calendar.length) {
                        calendar.removeClass('both-true').addClass('both-false');
                    }
                } else {
                    if (calendar.length) {
                        calendar.removeClass('both-true').addClass('both-false');
                    }
                }
            }
        }
    })();
}
