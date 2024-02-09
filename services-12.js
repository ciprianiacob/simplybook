function filterServices() {
    (function() {
        // Define variables for checkbox elements
        var baseUnitsCheckbox = document.querySelector('.checkBaseUnits');
        var wallUnitsCheckbox = document.querySelector('.checkWallUnits');
        var towerUnitsCheckbox = document.querySelector('.checkTowerUnits');
        // Define variable for quantity filter input element
        var quantityFilterInput = document.querySelector('#serviceQuantityFilter');

        // Debounce function to delay execution of callback
        function debounce(callback, delay) {
            var timerId;
            return function() {
                clearTimeout(timerId);
                timerId = setTimeout(callback, delay);
            };
        }

        // Function to display error message
        function displayErrorMessage(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked, quantityFilterInput) {
            var noResultsMessage = document.querySelectorAll('.service-item .service-item-no-results');
            var quantityFilterValue = parseInt(quantityFilterInput.value) || 0;

            // Define variables for quantity range
            var quantityMin = parseInt(quantityFilterInput.dataset.min) || 0;
            var quantityMax = parseInt(quantityFilterInput.dataset.max) || 36;

            // Check if there are any displayed items
            var displayedItems = document.querySelectorAll('.service-item[style="display: block;"]');

            if (
                (!baseUnitsChecked && !wallUnitsChecked && !towerUnitsChecked) && 
                quantityFilterValue > 0 // When none of the checkboxes are checked and quantity is entered
            ) {
                // Show error message
                noResultsMessage.forEach(function(element) {
                    var grandparent = element.parentElement.parentElement.parentElement.parentElement;
                    if (grandparent) {
                        grandparent.style.display = "block";
                        element.querySelector('.errorMessage').style.display = "block";
                        element.classList.remove('alert-light');
                        element.classList.add('alert-danger');
                    }
                });
            } else if (
                (displayedItems.length === 0 && quantityFilterValue < quantityMin) || 
                quantityFilterValue > quantityMax || 
                displayedItems.length === null || 
                displayedItems.length === 0 || 
                quantityFilterValue < quantityMin || 
                quantityFilterValue > quantityMax ||
                (!baseUnitsChecked && !wallUnitsChecked && !towerUnitsChecked) // When all three checkboxes are not checked
            ) {
                // If no items are displayed or quantity is out of range, show the error message
                noResultsMessage.forEach(function(element) {
                    var grandparent = element.parentElement.parentElement.parentElement.parentElement;
                    if (grandparent) {
                        grandparent.style.display = "block";
                        element.querySelector('.errorMessage').style.display = "block";
                        element.classList.remove('alert-light');
                        element.classList.add('alert-danger');
                    }
                });
            } else {
                // If there are displayed items and quantity is within range, hide the error message
                noResultsMessage.forEach(function(element) {
                    var grandparent = element.parentElement.parentElement.parentElement.parentElement;
                    if (grandparent) {
                        grandparent.style.display = "none";
                        element.querySelector('.errorMessage').style.display = "none";
                        element.classList.remove('alert-danger');
                        element.classList.add('alert-light');
                    }
                });
            }
        }

        // Core filtering function
        function filterItemsCore(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked, quantityFilterInput) {
            // Get the quantity filter input value
            var quantityFilterValue = parseInt(quantityFilterInput.value) || 0;
            var serviceItems = document.querySelectorAll('.service-item .service-item-details');

            // Loop through service items and apply filtering
            serviceItems.forEach(function(item) {
                var baseUnit = item.dataset.baseUnit === 'true';
                var wallUnit = item.dataset.wallUnit === 'true';
                var towerUnit = item.dataset.towerUnit === 'true';

                var showItem = (!baseUnitsChecked || baseUnit) &&
                               (!wallUnitsChecked || wallUnit) &&
                               (!towerUnitsChecked || towerUnit);

                // Check if the quantity is within the specified range (only if a non-zero value is entered)
                if (quantityFilterValue > 0) {
                    var qtyMin = parseInt(item.dataset.qtyMin) || 1;
                    var qtyMax = parseInt(item.dataset.qtyMax) || Infinity;
                    showItem = showItem && (quantityFilterValue >= qtyMin && quantityFilterValue <= qtyMax);
                } else {
                    showItem = false; // Quantity is not entered or is not greater than 0
                }

                item.closest('.service-item').style.display = showItem ? 'block' : 'none';
            });

            // Call the displayErrorMessage function with checkbox states
            displayErrorMessage(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked, quantityFilterInput);
        }

        // Debounced version of filterItemsCore
        var filterItemsCoreDebounced = debounce(filterItemsCore, 300); // 300ms delay

        // Function to handle filtering
        function filterItems() {
            // Delay filtering for input events
            if (this === quantityFilterInput) {
                filterItemsCoreDebounced(
                    baseUnitsCheckbox.checked, 
                    wallUnitsCheckbox.checked, 
                    towerUnitsCheckbox.checked, 
                    quantityFilterInput
                );
                return;
            }

            // Call the filtering function
            filterItemsCore(
                baseUnitsCheckbox.checked, 
                wallUnitsCheckbox.checked, 
                towerUnitsCheckbox.checked, 
                quantityFilterInput
            );
        }

        var filterItemsDebounced = debounce(filterItems, 300); // Define filterItemsDebounced here
        // Add event listeners
        baseUnitsCheckbox.addEventListener('change', filterItems);
        wallUnitsCheckbox.addEventListener('change', filterItems);
        towerUnitsCheckbox.addEventListener('change', filterItems);
        quantityFilterInput.addEventListener('input', filterItemsDebounced);
    })();
}
