function filterServices() {
	(function() {
		var checkBaseUnits, checkWallUnits, checkTowerUnits, serviceQuantityFilter;
		checkBaseUnits = document.querySelector('.checkBaseUnits');
		checkWallUnits = document.querySelector('.checkWallUnits');
		checkTowerUnits = document.querySelector('.checkTowerUnits');
		serviceQuantityFilter = document.querySelector('#serviceQuantityFilter');
		if (checkBaseUnits) {
			checkBaseUnits.addEventListener('change', filterItems)
		}
		if (checkWallUnits) {
			checkWallUnits.addEventListener('change', filterItems)
		}
		if (checkTowerUnits) {
			checkTowerUnits.addEventListener('change', filterItems)
		}
		if (serviceQuantityFilter) {
			serviceQuantityFilter.addEventListener('input', filterItems)
		}

		var unitTypesParent = document.querySelector('.service-filter-units-type .form-units-type');
		var unitTypesParentLabel = document.querySelector('.units-type-label-message');
		function noUnitTypeChecked() {
			if (unitTypesParent && unitTypesParentLabel) {
				unitTypesParent.style.borderColor = "red";
				unitTypesParentLabel.style.borderColor = "red";
			}
		}

		function unitTypeChecked() {
			if (unitTypesParent && unitTypesParentLabel) {
				unitTypesParent.style.borderColor = "#9cb38b";
				unitTypesParentLabel.style.borderColor = "#9cb38b";
			}
		}

		function filterItems() {
			var baseUnitsChecked = document.querySelector('.checkBaseUnits').checked;
			var wallUnitsChecked = document.querySelector('.checkWallUnits').checked;
			var towerUnitsChecked = document.querySelector('.checkTowerUnits').checked;

			if (isNoOneChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked)) {
				processNoneCheckbox(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked);
				noUnitTypeChecked()
			} else if (isOnlyOneChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked)) {
				processSingleCheckbox(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked);
				unitTypeChecked()
			} else if (areTwoChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked)) {
				processTwoCheckboxes(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked);
				unitTypeChecked()
			} else if (areAllChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked)) {
				processAllThreeCheckboxes(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked);
				unitTypeChecked()
			}

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
			var quantityMin = parseInt(quantityFilterInput.dataset.min) || 3;
			var quantityMax = parseInt(quantityFilterInput.dataset.max) || 40;

			var displayedItems = document.querySelectorAll('.service-item[style="display: block;"]');

			if ((displayedItems.length === 0 && (quantityFilterValue < quantityMin || quantityFilterValue > quantityMax)) || (displayedItems.length === null && (quantityFilterValue < quantityMin || quantityFilterValue > quantityMax)) || displayedItems.length === 0 || quantityFilterValue < quantityMin || quantityFilterValue > quantityMax) {
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
				noResultsMessage.forEach(function(element) {
					var grandparent = element.parentElement.parentElement.parentElement.parentElement;
					if (grandparent) {
						grandparent.style.display = "none";
						element.querySelector('.errorMessage').style.display = "none";
						element.classList.remove('alert-danger');
						element.classList.add('alert-light');
						quantityFilterInput.style.borderColor = "#9cb38b";
					}
				});
			}
			var unitTypesParentLabel = document.querySelector('.units-quantity-label-message');
			if (quantityFilterValue < quantityMin || quantityFilterValue > quantityMax) {
				quantityFilterInput.style.borderColor = "red";
				if (unitTypesParent) {
					unitTypesParentLabel.style.borderColor = "red";
				}
			} else {
				quantityFilterInput.style.borderColor = "#9cb38b";
				if (unitTypesParent) {
					unitTypesParentLabel.style.borderColor = "#9cb38b";
				}
			}
		}

		function processNoneCheckbox(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
			var serviceItems = document.querySelectorAll('.service-item .service-item-details');
			var quantityFilterValue = parseInt(document.querySelector('.serviceQuantityFilter').value) || 0;
			var quantityFilterInput = document.querySelector('#serviceQuantityFilter');
			serviceItems.forEach(function(item) {
				var baseUnit = item.dataset.baseUnit === 'true';
				var wallUnit = item.dataset.wallUnit === 'true';
				var towerUnit = item.dataset.towerUnit === 'true';
				var showItem = !baseUnitsChecked && !wallUnitsChecked && !towerUnitsChecked;

				if (quantityFilterValue > 2) {
					var qtyMin = parseInt(item.dataset.qtyMin) || 3;
					var qtyMax = parseInt(item.dataset.qtyMax) || 40;
					showItem = showItem && (quantityFilterValue >= qtyMin && quantityFilterValue <= qtyMax);
				} else {
					showItem = false;
				}

				item.closest('.service-item').style.display = showItem ? 'block' : 'none';
			});
			var quantityFilterValue = validateQuantityInput(quantityFilterInput);
		}

		function processSingleCheckbox(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
			var serviceItems = document.querySelectorAll('.service-item .service-item-details');
			var quantityFilterValue = parseInt(document.querySelector('#serviceQuantityFilter').value) || 0;
			var quantityFilterInput = document.querySelector('#serviceQuantityFilter');
			serviceItems.forEach(function(item) {
				var baseUnit = item.dataset.baseUnit === 'true';
				var wallUnit = item.dataset.wallUnit === 'true';
				var towerUnit = item.dataset.towerUnit === 'true';
				var showItem =
					(baseUnitsChecked && baseUnit && !wallUnit && !towerUnit) ||
					(wallUnitsChecked && !baseUnit && wallUnit && !towerUnit) ||
					(towerUnitsChecked && !baseUnit && !wallUnit && towerUnit);

				if (quantityFilterValue > 2) {
					var qtyMin = parseInt(item.dataset.qtyMin) || 3;
					var qtyMax = parseInt(item.dataset.qtyMax) || 40;
					showItem = showItem && (quantityFilterValue >= qtyMin && quantityFilterValue <= qtyMax);
				} else {
					showItem = false;
				}

				item.closest('.service-item').style.display = showItem ? 'block' : 'none';
			});
			var quantityFilterValue = validateQuantityInput(quantityFilterInput);
		}

		function processTwoCheckboxes(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
			var serviceItems = document.querySelectorAll('.service-item .service-item-details');
			var quantityFilterValue = parseInt(document.querySelector('#serviceQuantityFilter').value) || 0;
			var quantityFilterInput = document.querySelector('#serviceQuantityFilter');
			serviceItems.forEach(function(item) {
				var baseUnit = item.dataset.baseUnit === 'true';
				var wallUnit = item.dataset.wallUnit === 'true';
				var towerUnit = item.dataset.towerUnit === 'true';
				var showItem =
					(baseUnitsChecked && wallUnitsChecked && baseUnit && wallUnit && !towerUnit) ||
					(wallUnitsChecked && towerUnitsChecked && !baseUnit && wallUnit && towerUnit) ||
					(baseUnitsChecked && towerUnitsChecked && baseUnit && !wallUnit && towerUnit);

				if (quantityFilterValue > 2) {
					var qtyMin = parseInt(item.dataset.qtyMin) || 3;
					var qtyMax = parseInt(item.dataset.qtyMax) || 40;
					showItem = showItem && (quantityFilterValue >= qtyMin && quantityFilterValue <= qtyMax);
				} else {
					showItem = false;
				}

				item.closest('.service-item').style.display = showItem ? 'block' : 'none';
			});
			var quantityFilterValue = validateQuantityInput(quantityFilterInput);
		}

		function processAllThreeCheckboxes(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
			var serviceItems = document.querySelectorAll('.service-item .service-item-details');
			var quantityFilterValue = parseInt(document.querySelector('#serviceQuantityFilter').value) || 0;
			var quantityFilterInput = document.querySelector('#serviceQuantityFilter');
			serviceItems.forEach(function(item) {
				var baseUnit = item.dataset.baseUnit === 'true';
				var wallUnit = item.dataset.wallUnit === 'true';
				var towerUnit = item.dataset.towerUnit === 'true';
				var showItem =
					baseUnitsChecked && wallUnitsChecked && towerUnitsChecked && baseUnit && wallUnit && towerUnit;

				if (quantityFilterValue > 2) {
					var qtyMin = parseInt(item.dataset.qtyMin) || 3;
					var qtyMax = parseInt(item.dataset.qtyMax) || 40;
					showItem = showItem && (quantityFilterValue >= qtyMin && quantityFilterValue <= qtyMax);
				} else {
					showItem = false;
				}

				item.closest('.service-item').style.display = showItem ? 'block' : 'none';
			});
			var quantityFilterValue = validateQuantityInput(quantityFilterInput);
		}

		function validateQuantityInput(inputElement) {
			var inputValue = inputElement.value.trim();

			if (inputValue === '') {
				return inputValue;
			}

			var sanitizedValue = inputValue.replace(/\D/g, '');

			var intValue = parseInt(sanitizedValue, 10);
			if (isNaN(intValue) || intValue < 0) {
				intValue = 0;
			}

			inputElement.value = intValue;

			return intValue;
		}

	})();
}
