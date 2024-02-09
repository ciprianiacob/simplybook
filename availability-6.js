function initAvailability() {
    (function() {
        var processingCompletedOne = false;
        var processingCompletedTwo = false;

        if (typeof $ !== 'undefined') {
            if (!processingCompletedTwo) {
                var constructURLOne = function(locatie, category, service, count, addons, provider, date) {
                    var baseURL = 'https://dohomeart.co.uk/v2/booking/time-slots/';
                    return baseURL + '?from=' + date + '&to=' + date + '&location=' + locatie + '&provider=' + provider + '&service=' + service + '&count=' + count + '&booking_id=&date=' + date;
                };

                var processDayOnElementsOne = function() {
                    var calendar = $('#sb-main-container .datetime-step .calendar');

                    if (calendar.length > 0) {
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

                                    $.getJSON(constructedProviderURLOne, function(data) {
                                        if (data.length > 0 && data[0].type === "free") {
                                            $(this).parent().addClass("slot-available");
                                        } else {
                                            $(this).parent().addClass("slot-not-available");
                                        }

                                        var newHref = constructedProviderURLOne + "/time/08:00:00/";
                                        $(this).attr('href', newHref);
                                    }.bind(this));
                                }
                            });
                        }
                    }
                };

                processDayOnElementsOne();
            }

            var processDayOnElementsTwo = function() {
                var calendar = $('#sb-main-container .datetime-step .calendar');
                if (calendar.length > 0) {
                    calendar.addClass('both-true');
                }

                if (processingCompletedTwo) {
                    return;
                }

                var aDayOn = $('a.day-on');

                if (aDayOn.length > 0) {
                    var mockEvent = new MouseEvent('mouseover');
                    aDayOn.each(function(index, element) {
                        handleMouseover.call(element, mockEvent);
                    });
                }

                processingCompletedTwo = true;

                if (processingCompletedOne && processingCompletedTwo) {
                    calendar.removeClass('both-true').addClass('both-false');
                } else {
                    calendar.removeClass('both-true').addClass('both-false');
                }
            };

            processDayOnElementsTwo();
        }
    })();
}
