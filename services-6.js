function filterServices() {
    function filterItems() {
        const baseUnitsChecked = document.querySelector('.checkBaseUnits').checked;
        const wallUnitsChecked = document.querySelector('.checkWallUnits').checked;
        const towerUnitsChecked = document.querySelector('.checkTowerUnits').checked;

        if (isNoOneChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked)) {
            processNoneCheckbox();
        } else if (isOnlyOneChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked)) {
            processSingleCheckbox();
        } else if (areTwoChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked)) {
            processTwoCheckboxes();
        } else if (areAllChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked)) {
            processAllThreeCheckboxes();
        }

        displayErrorMessage();
    }

    document.querySelector('.checkBaseUnits').addEventListener('change', filterItems);
    document.querySelector('.checkWallUnits').addEventListener('change', filterItems);
    document.querySelector('.checkTowerUnits').addEventListener('change', filterItems);
    document.querySelector('#serviceQuantityFilter').addEventListener('input', filterItems);

    function isNoOneChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
        return !(baseUnitsChecked || wallUnitsChecked || towerUnitsChecked);
    }

    function isOnlyOneChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
        return [baseUnitsChecked, wallUnitsChecked, towerUnitsChecked].filter(checked => checked).length === 1;
    }

    function areTwoChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
        return [baseUnitsChecked, wallUnitsChecked, towerUnitsChecked].filter(checked => checked).length === 2;
    }

    function areAllChecked(baseUnitsChecked, wallUnitsChecked, towerUnitsChecked) {
        return baseUnitsChecked && wallUnitsChecked && towerUnitsChecked;
    }

    function displayErrorMessage() {
        const noResultsMessage = document.querySelectorAll('.service-item .service-item-no-results');
        const quantityFilterInput = document.querySelector('#serviceQuantityFilter');
        const quantityFilterValue = parseInt(quantityFilterInput.value) || 0;
        const quantityMin = parseInt(quantityFilterInput.dataset.min) || 0;
        const quantityMax = parseInt(quantityFilterInput.dataset.max) || 36;

        const displayedItems = document.querySelectorAll('.service-item[style="display: block;"]');

        const noItemsDisplayed = displayedItems.length === 0;
        const quantityOutOfRange = quantityFilterValue < quantityMin || quantityFilterValue > quantityMax;

        if (noItemsDisplayed || quantityOutOfRange) {
            noResultsMessage.forEach(element => {
                const grandparent = element.parentElement.parentElement.parentElement.parentElement;
                if (grandparent) {
                    grandparent.style.display = "block";
                    element.querySelector('.errorMessage').style.display = "block";
                    element.classList.remove('alert-light');
                    element.classList.add('alert-danger');
                }
            });
        } else {
            noResultsMessage.forEach(element => {
                const grandparent = element.parentElement.parentElement.parentElement.parentElement;
                if (grandparent) {
                    grandparent.style.display = "none";
                    element.querySelector('.errorMessage').style.display = "none";
                    element.classList.remove('alert-danger');
                    element.classList.add('alert-light');
                }
            });
        }
    }

    function processNoneCheckbox() {
        const serviceItems = document.querySelectorAll('.service-item .service-item-details');
        const quantityFilterValue = parseInt(document.querySelector('#serviceQuantityFilter').value) || 0;

        serviceItems.forEach(item => {
            const baseUnit = item.dataset.baseUnit === 'true';
            const wallUnit = item.dataset.wallUnit === 'true';
            const towerUnit = item.dataset.towerUnit === 'true';
            let showItem = !baseUnit && !wallUnit && !towerUnit;

            if (quantityFilterValue > 0) {
                const qtyMin = parseInt(item.dataset.qtyMin) || 1;
                const qtyMax = parseInt(item.dataset.qtyMax) || Infinity;
                showItem = showItem && (quantityFilterValue >= qtyMin && quantityFilterValue <= qtyMax);
            } else {
                showItem = false;
            }

            item.closest('.service-item').style.display = showItem ? 'block' : 'none';
        });

        validateQuantityInput();
    }

    function processSingleCheckbox() {
        const serviceItems = document.querySelectorAll('.service-item .service-item-details');
        const quantityFilterValue = parseInt(document.querySelector('#serviceQuantityFilter').value) || 0;

        serviceItems.forEach(item => {
            const baseUnit = item.dataset.baseUnit === 'true';
            const wallUnit = item.dataset.wallUnit === 'true';
            const towerUnit = item.dataset.towerUnit === 'true';
            let showItem =
                (baseUnitsChecked && baseUnit && !wallUnit && !towerUnit) ||
                (wallUnitsChecked && !baseUnit && wallUnit && !towerUnit) ||
                (towerUnitsChecked && !baseUnit && !wallUnit && towerUnit);

            if (quantityFilterValue > 0) {
                const qtyMin = parseInt(item.dataset.qtyMin) || 1;
                const qtyMax = parseInt(item.dataset.qtyMax) || Infinity;
                showItem = showItem && (quantityFilterValue >= qtyMin && quantityFilterValue <= qtyMax);
            } else {
                showItem = false;
            }

            item.closest('.service-item').style.display = showItem ? 'block' : 'none';
        });

        validateQuantityInput();
    }

    function processTwoCheckboxes() {
        const serviceItems = document.querySelectorAll('.service-item .service-item-details');
        const quantityFilterValue = parseInt(document.querySelector('#serviceQuantityFilter').value) || 0;

        serviceItems.forEach(item => {
            const baseUnit = item.dataset.baseUnit === 'true';
            const wallUnit = item.dataset.wallUnit === 'true';
            const towerUnit = item.dataset.towerUnit === 'true';
            let showItem =
                (baseUnitsChecked && wallUnitsChecked && baseUnit && wallUnit && !towerUnit) ||
                (wallUnitsChecked && towerUnitsChecked && !baseUnit && wallUnit && towerUnit) ||
                (baseUnitsChecked && towerUnitsChecked && baseUnit && !wallUnit && towerUnit);

            if (quantityFilterValue > 0) {
                const qtyMin = parseInt(item.dataset.qtyMin) || 1;
                const qtyMax = parseInt(item.dataset.qtyMax) || Infinity;
                showItem = showItem && (quantityFilterValue >= qtyMin && quantityFilterValue <= qtyMax);
            } else {
                showItem = false;
            }

            item.closest('.service-item').style.display = showItem ? 'block' : 'none';
        });

        validateQuantityInput();
    }

    function processAllThreeCheckboxes() {
        const serviceItems = document.querySelectorAll('.service-item .service-item-details');
        const quantityFilterValue = parseInt(document.querySelector('#serviceQuantityFilter').value) || 0;

        serviceItems.forEach(item => {
            const baseUnit = item.dataset.baseUnit === 'true';
            const wallUnit = item.dataset.wallUnit === 'true';
            const towerUnit = item.dataset.towerUnit === 'true';
            let showItem = baseUnitsChecked && wallUnitsChecked && towerUnitsChecked && baseUnit && wallUnit && towerUnit;

            if (quantityFilterValue > 0) {
                const qtyMin = parseInt(item.dataset.qtyMin) || 1;
                const qtyMax = parseInt(item.dataset.qtyMax) || 36;
                showItem = showItem && (quantityFilterValue >= qtyMin && quantityFilterValue <= qtyMax);
            } else {
                showItem = false;
            }

            item.closest('.service-item').style.display = showItem ? 'block' : 'none';
        });

        validateQuantityInput();
    }

    function validateQuantityInput() {
        const quantityFilterInput = document.querySelector('#serviceQuantityFilter');
        let quantityFilterValue = parseInt(quantityFilterInput.value.trim()) || 0;

        if (quantityFilterValue < 0) {
            quantityFilterValue = 0;
        }

        quantityFilterInput.value = quantityFilterValue;
    }

}
