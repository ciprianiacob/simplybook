(function() {
    var processingCompletedOne = false;
    var processingCompletedTwo = false;

    if (typeof $ !== 'undefined') {
    	if (!processingCompletedTwo) {
    		// Function to construct URL based on provided information
    		var constructURLOne = function(locatie, category, service, count, addons, provider, date) {
    			var baseURL = 'https://dohomeart.co.uk/v2/booking/time-slots/';
    			var url = baseURL + '?from=' + date + '&to=' + date + '&location=' + locatie + '&provider=' + provider + '&service=' + service + '&count=' + count + '&booking_id=&date=' + date;

    			return url;
    		};

    		// Function to be executed when the document is ready
    		var processDayOnElementsOne = function() {
    			console.log("Running the function for all 'a.day-on' elements");
    			// Set background color to red during execution
    			var calendar = $('#sb-main-container .datetime-step .calendar');

    			if (calendar) {
    				calendar.addClass('one-of-them-true');

    				var aDayOn = $('a.day-on');

    				if (aDayOn.length > 0) {
    					aDayOn.each(function(event) {
    						var href = $(this).attr('href');
    						var match = href.match(/location\/(\d+)\/category\/(\d+)\/service\/(\d+)\/count\/(\d+)\/addons\/([^\/]+)\/provider\/(\d+)\/date\/(\d{4}-\d{2}-\d{2})/);

    						if (match) {
    							console.log("Valid href format");

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
    								if (data.length > 0 && data[0].type === "free") {
    									console.log("Adding class 'slot-available' to the parent of 'a.day-on'");
    									$(this).parent().addClass("slot-available");
    								} else {
    									console.log("Adding class 'slot-not-available' to the parent of 'a.day-on'");
    									$(this).parent().addClass("slot-not-available");
    								}
    							}.bind(this));
    						}
    					});
    				}

    				// Set background color to transparent after execution
    				calendar.removeClass('one-of-them-true').addClass('both-true');
    			}
    		};

    		setTimeout(function() {
    			processDayOnElementsOne();
    		}, 4000);

    		$(document).on('click', '.item__footer .btn.select, #sb_back_button a, .steps-nav li a', function() {
    			console.log("Select button clicked!");

    			// Set background color to red during click
    			var calendar = $('#sb-main-container .datetime-step .calendar');

    			if (calendar) {
    				calendar.removeClass('both-false').addClass('both-true');

    				setTimeout(function() {
    					processingCompletedOne = false;
    					processDayOnElementsOne();

    					// Set background color to transparent after processing
    					calendar.removeClass('both-true').addClass('both-false');
    				}, 4000);
    			}
    		});

    		$(document).on('click mouseup', '#sb_prev_month, #sb_next_month', function() {
    			console.log("Month navigation button clicked!");

    			// Set background color to red during click
    			var calendar = $('#sb-main-container .datetime-step .calendar');
    			if (calendar) {
    				calendar.removeClass('both-false').addClass('both-true');

    				setTimeout(function() {
    					processingCompletedOne = false;
    					processDayOnElementsOne();

    					// Set background color to transparent after processing
    					calendar.removeClass('both-true').addClass('both-false');
    				}, 4000);
    			}
    		});

    		$(window).on('hashchange', function() {
    			setTimeout(function() {
    				processDayOnElementsOne();
    			}, 4000);
    		});

    		document.addEventListener('DOMContentLoaded', function() {
    			setTimeout(function() {
    				processDayOnElementsOne();
    			}, 4000);
    		});

    		$(document).ready(function() {
    			setTimeout(function() {
    				processDayOnElementsOne();
    			}, 4000);
    		});
    	}

    	var handleMouseover = function(event) {
    		var newHref;

    		if (!$(this).data('modificationApplied')) {
    			var currentHref = $(this).attr('href');

    			if (currentHref.indexOf("time/08:00:00/") === -1) {
    				newHref = currentHref + "time/08:00:00/";
    				$(this).attr('href', newHref);
    			}

    			$(this).data('modificationApplied', true);
    		}

    		var dateParent = $(this).closest('.date');
    		var dateClass = dateParent.attr('class');
    		var newAnchor = $('<a></a>');

    		if (newHref) {
    			newAnchor.attr('href', newHref);
    		} else {
    			newAnchor.attr('href', '#');
    		}

    		newAnchor.addClass(dateClass);
    		dateParent.replaceWith(newAnchor);
    		newAnchor.append(dateParent.contents());

    		if (event) {
    			event.stopPropagation();
    		}

    		console.log('handleMouseover executed:', newHref);
    	};

    	var processDayOnElementsTwo = function() {
    		console.log("Running the function for all 'a.day-on' elements");

    		// Set background color to red during execution
    		var calendar = $('#sb-main-container .datetime-step .calendar');
    		if (calendar) {
    			calendar.addClass('both-true');
    		}

    		var dateElements = $('.date');
    		if (dateElements) {
    			console.log('Number of elements with class "date":', dateElements.length);
    		}

    		if (processingCompletedTwo) {
    			console.log("Processing already completed. Skipping...");
    			return;
    		}

    		var aDayOn = $('a.day-on');

    		if (aDayOn.length > 0) {
    			var mockEvent = new MouseEvent('mouseover');
    			aDayOn.each(function(index, element) {
    				handleMouseover.call(element, mockEvent);
    			});
    		}

    		console.log("Finished processing 'a.day-on' elements");

    		processingCompletedTwo = true;

    		// Check if both processingCompletedOne and processingCompletedTwo are true after processing
    		if (processingCompletedOne && processingCompletedTwo) {
    			// Do something when both are true

    			// Set background color to transparent after execution
    			if (calendar) {
    				calendar.removeClass('both-true').addClass('both-false');
    			}
    		} else {
    			// Do something when either or both are false

    			// Set background color to transparent after execution
    			if (calendar) {
    				calendar.removeClass('both-true').addClass('both-false');
    			}
    		}
    	};

    	setTimeout(function() {
    		processDayOnElementsTwo();
    	}, 4000);

    	$(document).on('click', '.item__footer .btn.select, #sb_back_button a, .steps-nav li a', function() {
    		console.log("Select button clicked!");

    		// Set background color to red during click
    		var calendar = $('#sb-main-container .datetime-step .calendar');
    		if (calendar) {
    			calendar.removeClass('both-false').addClass('both-true');

    			setTimeout(function() {
    				processingCompletedTwo = false;
    				processDayOnElementsTwo();

    				// Set background color to transparent after processing
    				calendar.removeClass('both-true').addClass('both-false');
    			}, 4000);
    		}
    	});

    	$(document).on('click mouseup', '#sb_prev_month, #sb_next_month', function() {
    		console.log("Month navigation button clicked!");

    		// Set background color to red during click
    		var calendar = $('#sb-main-container .datetime-step .calendar');
    		if (calendar) {
    			calendar.removeClass('both-false').addClass('both-true');

    			setTimeout(function() {
    				processingCompletedTwo = false;
    				processDayOnElementsTwo();

    				// Set background color to transparent after processing
    				calendar.removeClass('both-true').addClass('both-false');
    			}, 4000);
    		}
    	});

    	$(window).on('hashchange', function() {
    		setTimeout(function() {
    			processDayOnElementsTwo();
    		}, 4000);
    	});

    	document.addEventListener('DOMContentLoaded', function() {
    		setTimeout(function() {
    			processDayOnElementsTwo();
    		}, 4000);
    	});

    	$(document).ready(function() {
    		setTimeout(function() {
    			processDayOnElementsTwo();
    		}, 4000);
    	});
    }
})();
