function filterServices() {
	(function() {
		var baseUnitsCheckbox = document.querySelector('.checkBaseUnits');
		var wallUnitsCheckbox = document.querySelector('.checkWallUnits');
		var towerUnitsCheckbox = document.querySelector('.checkTowerUnits');
		var quantityFilterInput = document.querySelector('#serviceQuantityFilter');

		function debounce(callback, delay) {
			var timerId;
			return function() {
				clearTimeout(timerId);
				timerId = setTimeout(callback, delay);
			};
		}

		function filterItems() {
			if (this === quantityFilterInput) {
				filterItemsDebounced();
				return;
			}

			var baseUnitsChecked = baseUnitsCheckbox.checked;
			var wallUnitsChecked = wallUnitsCheckbox.checked;
			var towerUnitsChecked = towerUnitsCheckbox.checked;

			filterItemsCore(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked);
		}

		var filterItemsDebounced = debounce(filterItems, 300);

		baseUnitsCheckbox.addEventListener('change', filterItems);
		wallUnitsCheckbox.addEventListener('change', filterItems);
		towerUnitsCheckbox.addEventListener('change', filterItems);
		quantityFilterInput.addEventListener('input', filterItemsDebounced);

		function filterItemsCore(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
			var quantityFilterValue = parseInt(quantityFilterInput.value) || 0;
			var serviceItems = document.querySelectorAll('.service-item .service-item-details');

			serviceItems.forEach(function(item) {
				var baseUnit = item.dataset.baseUnit === 'true';
				var wallUnit = item.dataset.wallUnit === 'true';
				var towerUnit = item.dataset.towerUnit === 'true';

				var showItem = (!baseUnitsChecked || baseUnit) &&
					(!wallUnitsChecked || wallUnit) &&
					(!towerUnitsChecked || towerUnit);

				if (quantityFilterValue > 0) {
					var qtyMin = parseInt(item.dataset.qtyMin) || 1;
					var qtyMax = parseInt(item.dataset.qtyMax) || Infinity;
					showItem = showItem && (quantityFilterValue >= qtyMin && quantityFilterValue <= qtyMax);
				} else {
					showItem = false;
				}

				item.closest('.service-item').style.display = showItem ? 'block' : 'none';
			});

			displayErrorMessage();
		}

		function displayErrorMessage(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
			var noResultsMessage = document.querySelectorAll('.service-item .service-item-no-results');
			var quantityFilterValue = parseInt(quantityFilterInput.value) || 0;

			var quantityMin = parseInt(quantityFilterInput.dataset.min) || 0;
			var quantityMax = parseInt(quantityFilterInput.dataset.max) || 36;

			var displayedItems = document.querySelectorAll('.service-item[style="display: block;"]');

			if ((displayedItems.length === 0 && quantityFilterValue < quantityMin) || quantityFilterValue > quantityMax || displayedItems.length === null || displayedItems.length === 0 || quantityFilterValue < quantityMin || quantityFilterValue > quantityMax ||
    (!baseUnitsChecked && !wallUnitsChecked && !towerUnitsChecked)) {
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
					}
				});
			}
		}
	})();
}
