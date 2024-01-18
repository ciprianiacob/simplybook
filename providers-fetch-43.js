const jsonProviderUrl = 'https://dohomeart.co.uk/v2/provider/';
const jsonCategoriesUrl = 'https://dohomeart.co.uk/v2/ext/category/';
const jsonServicesUrl = 'https://dohomeart.co.uk/v2/service/';

// Funcție pentru a încărca datele de la un URL dat
const fetchData = (url) => {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
};

// Încarcă datele furnizorilor
const loadProviderData = () => {
    return fetchData(jsonProviderUrl);
};

// Încarcă datele categoriilor
const loadCategoryData = () => {
    return fetchData(jsonCategoriesUrl);
};

// Încarcă datele serviciilor
const loadServiceData = () => {
    return fetchData(jsonServicesUrl);
};

// Funcție pentru a afișa datele în consolă
const displayData = (providerData, categoryData, serviceData) => {
    console.log('Provider Data:', providerData);
    console.log('Category Data:', categoryData);
    console.log('Service Data:', serviceData);

    // Aici puteți continua cu logica de procesare a datelor și actualizarea paginii HTML
};

// Funcție pentru gestionarea tuturor operațiunilor
const processData = () => {
    Promise.all([loadProviderData(), loadCategoryData(), loadServiceData()])
        .then(([providerData, categoryData, serviceData]) => {
            // Apelați funcția pentru afișarea datelor
            displayData(providerData, categoryData, serviceData);
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
        });
};

// Apelați funcția pentru gestionarea operațiunilor
processData();
