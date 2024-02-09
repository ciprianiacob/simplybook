function filterServices() {
    (function () {
        const checkboxes = {
            base: document.querySelector('.checkBaseUnits'),
            wall: document.querySelector('.checkWallUnits'),
            tower: document.querySelector('.checkTowerUnits')
        };
        const quantityFilterInput = document.querySelector('#serviceQuantityFilter');
        const serviceItems = document.querySelectorAll('.service-item .service-item-details');
        const noResultsMessage = document.querySelectorAll('.service-item .service-item-no-results');

        function filterItems() {
            const { base, wall, tower } = checkboxes;
            const baseChecked = base.checked;
            const wallChecked = wall.checked;
            const towerChecked = tower.checked;
            const quantityFilterValue = validateQuantityInput(quantityFilterInput);

            const checkedCount = [baseChecked, wallChecked, towerChecked].filter(checked => checked).length;

            if (checkedCount === 0) {
                processCheckbox(false, false, false);
            } else if (checkedCount === 1) {
                processCheckbox(baseChecked, wallChecked, towerChecked);
            } else if (checkedCount === 2) {
                processCheckbox(baseChecked, wallChecked, towerChecked);
            } else if (checkedCount === 3) {
                processCheckbox(baseChecked, wallChecked, towerChecked);
            }

            displayErrorMessage(serviceItems, noResultsMessage, quantityFilterValue);
        }

        function processCheckbox(baseChecked, wallChecked, towerChecked) {
            serviceItems.forEach(item => {
                const baseUnit = item.dataset.baseUnit === 'true';
                const wallUnit = item.dataset.wallUnit === 'true';
                const towerUnit = item.dataset.towerUnit === 'true';
                const showItem = (!baseChecked || baseUnit) && (!wallChecked || wallUnit) && (!towerChecked || towerUnit);
                const quantityValid = validateQuantity(item.dataset.qtyMin, item.dataset.qtyMax);

                item.closest('.service-item').style.display = (showItem && quantityValid) ? 'block' : 'none';
            });
        }

        function displayErrorMessage(items, messages, quantityValue) {
            const quantityMin = parseInt(quantityFilterInput.dataset.min) || 0;
            const quantityMax = parseInt(quantityFilterInput.dataset.max) || 36;
            const displayedItems = Array.from(items).filter(item => item.closest('.service-item').style.display === 'block');
            const noResults = displayedItems.length === 0 || quantityValue < quantityMin || quantityValue > quantityMax;

            messages.forEach(message => {
                const grandparent = message.parentElement.parentElement.parentElement.parentElement;
                if (grandparent) {
                    grandparent.style.display = noResults ? 'block' : 'none';
                    message.querySelector('.errorMessage').style.display = noResults ? 'block' : 'none';
                    message.classList.toggle('alert-light', !noResults);
                    message.classList.toggle('alert-danger', noResults);
                }
            });
        }

        function validateQuantity(min, max) {
            const value = parseInt(quantityFilterInput.value.trim()) || 0;
            const minValue = parseInt(min) || 1;
            const maxValue = parseInt(max) || Infinity;
            const valid = value >= minValue && value <= maxValue;

            quantityFilterInput.value = valid ? value : '';
            return valid;
        }

        function validateQuantityInput(inputElement) {
            const inputValue = inputElement.value.trim();
            if (inputValue === '') return 0;

            const sanitizedValue = inputValue.replace(/\D/g, '');
            const intValue = parseInt(sanitizedValue, 10);

            inputElement.value = intValue >= 0 ? intValue : '';
            return intValue >= 0 ? intValue : 0;
        }

        checkboxes.base.addEventListener('change', filterItems);
        checkboxes.wall.addEventListener('change', filterItems);
        checkboxes.tower.addEventListener('change', filterItems);
        quantityFilterInput.addEventListener('input', filterItems);
    })();
}
