function filterItems() {
	(function() {
			// Get the state of the unit type checkboxes
			var baseUnitsChecked = document.querySelector('.checkBaseUnits').checked;
			var wallUnitsChecked = document.querySelector('.checkWallUnits').checked;
			var towerUnitsChecked = document.querySelector('.checkTowerUnits').checked;

			// Check if only one checkbox is checked
			if (isNoOneChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked)) {
				processNoneCheckbox(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked);
			} else if (isOnlyOneChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked)) {
				processSingleCheckbox(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked);
			} else if (areTwoChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked)) {
				processTwoCheckboxes(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked);
			} else if (areAllChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked)) {
				processAllThreeCheckboxes(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked);
			}

			// Call the function to display error message
			displayErrorMessage();
		}

		function isNoOneChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
			return (
				(baseUnitsChecked ? 1 : 0) + (wallUnitsChecked ? 1 : 0) + (towerUnitsChecked ? 1 : 0) === 0
			);
		}

		function isOnlyOneChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
			return (
				(baseUnitsChecked ? 1 : 0) + (wallUnitsChecked ? 1 : 0) + (towerUnitsChecked ? 1 : 0) === 1
			);
		}

		function areTwoChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
			return (
				(baseUnitsChecked ? 1 : 0) + (wallUnitsChecked ? 1 : 0) + (towerUnitsChecked ? 1 : 0) === 2
			);
		}

		function areAllChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
			return baseUnitsChecked && wallUnitsChecked && towerUnitsChecked;
		}

		function displayErrorMessage() {
			var noResultsMessage = document.querySelectorAll('.service-item .service-item-no-results');
			var quantityFilterInput = document.querySelector('#serviceQuantityFilter');
			var quantityFilterValue = parseInt(quantityFilterInput.value) || 0;
			var quantityMin = parseInt(quantityFilterInput.dataset.min) || 0;
			var quantityMax = parseInt(quantityFilterInput.dataset.max) || 36;

			// Check if there are any displayed items
			var displayedItems = document.querySelectorAll('.service-item[style="display: block;"]');

			if ((displayedItems.length === 0 && quantityFilterValue < quantityMin) || quantityFilterValue > quantityMax || displayedItems.length === null || displayedItems.length === 0 || quantityFilterValue < quantityMin || quantityFilterValue > quantityMax) {
				// If no items are displayed, show the error message
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
				// If there are displayed items, hide the error message
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

		function processNoneCheckbox(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
			// Process when all three checkboxes are checked
			var serviceItems = document.querySelectorAll('.service-item .service-item-details');
			// Get the quantity filter input value
			var quantityFilterValue = parseInt(document.querySelector('.serviceQuantityFilter').value) || 0;
			serviceItems.forEach(function(item) {
				var baseUnit = item.dataset.baseUnit === 'true';
				var wallUnit = item.dataset.wallUnit === 'true';
				var towerUnit = item.dataset.towerUnit === 'true';
				var showItem = !baseUnitsChecked && !wallUnitsChecked && !towerUnitsChecked;

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
			// Get the quantity filter input element
			var quantityFilterInput = document.querySelector('#serviceQuantityFilter');
			// Validate input to allow only positive integers
			var quantityFilterValue = validateQuantityInput(quantityFilterInput);
		}

		function processSingleCheckbox(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
			// Process when only one checkbox is checked
			var serviceItems = document.querySelectorAll('.service-item .service-item-details');
			// Get the quantity filter input value
			var quantityFilterValue = parseInt(document.querySelector('#serviceQuantityFilter').value) || 0;
			serviceItems.forEach(function(item) {
				var baseUnit = item.dataset.baseUnit === 'true';
				var wallUnit = item.dataset.wallUnit === 'true';
				var towerUnit = item.dataset.towerUnit === 'true';
				var showItem =
					(baseUnitsChecked && baseUnit && !wallUnit && !towerUnit) ||
					(wallUnitsChecked && !baseUnit && wallUnit && !towerUnit) ||
					(towerUnitsChecked && !baseUnit && !wallUnit && towerUnit);

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
			// Get the quantity filter input element
			var quantityFilterInput = document.querySelector('#serviceQuantityFilter');
			// Validate input to allow only positive integers
			var quantityFilterValue = validateQuantityInput(quantityFilterInput);
		}

		function processTwoCheckboxes(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
			// Process when two checkboxes are checked
			var serviceItems = document.querySelectorAll('.service-item .service-item-details');
			// Get the quantity filter input value
			var quantityFilterValue = parseInt(document.querySelector('#serviceQuantityFilter').value) || 0;
			serviceItems.forEach(function(item) {
				var baseUnit = item.dataset.baseUnit === 'true';
				var wallUnit = item.dataset.wallUnit === 'true';
				var towerUnit = item.dataset.towerUnit === 'true';
				var showItem =
					(baseUnitsChecked && wallUnitsChecked && baseUnit && wallUnit && !towerUnit) ||
					(wallUnitsChecked && towerUnitsChecked && !baseUnit && wallUnit && towerUnit) ||
					(baseUnitsChecked && towerUnitsChecked && baseUnit && !wallUnit && towerUnit);

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
			// Get the quantity filter input element
			var quantityFilterInput = document.querySelector('#serviceQuantityFilter');
			// Validate input to allow only positive integers
			var quantityFilterValue = validateQuantityInput(quantityFilterInput);
		}

		function processAllThreeCheckboxes(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
			// Process when all three checkboxes are checked
			var serviceItems = document.querySelectorAll('.service-item .service-item-details');
			// Get the quantity filter input value
			var quantityFilterValue = parseInt(document.querySelector('#serviceQuantityFilter').value) || 0;
			serviceItems.forEach(function(item) {
				var baseUnit = item.dataset.baseUnit === 'true';
				var wallUnit = item.dataset.wallUnit === 'true';
				var towerUnit = item.dataset.towerUnit === 'true';
				var showItem =
					baseUnitsChecked && wallUnitsChecked && towerUnitsChecked && baseUnit && wallUnit && towerUnit;

				// Check if the quantity is within the specified range (only if a non-zero value is entered)
				if (quantityFilterValue > 0) {
					var qtyMin = parseInt(item.dataset.qtyMin) || 1;
					var qtyMax = parseInt(item.dataset.qtyMax) || 36;
					showItem = showItem && (quantityFilterValue >= qtyMin && quantityFilterValue <= qtyMax);
				} else {
					showItem = false; // Quantity is not entered or is not greater than 0
				}

				item.closest('.service-item').style.display = showItem ? 'block' : 'none';
			});
			// Get the quantity filter input element
			var quantityFilterInput = document.querySelector('#serviceQuantityFilter');
			// Validate input to allow only positive integers
			var quantityFilterValue = validateQuantityInput(quantityFilterInput);
		}

		function validateQuantityInput(inputElement) {
			// Validate input to allow only positive integers
			var inputValue = inputElement.value.trim();

			// If the input value is empty, return without changing it
			if (inputValue === '') {
				return inputValue;
			}

			// Remove any non-digit characters
			var sanitizedValue = inputValue.replace(/\D/g, '');

			// Ensure the value is a non-negative integer
			var intValue = parseInt(sanitizedValue, 10);
			if (isNaN(intValue) || intValue < 0) {
				intValue = 0; // Set to 0 if not a valid positive integer
			}

			// Update the input value
			inputElement.value = intValue;

			return intValue;
		})();;
}
