function getProviders() {
  return fetch('https://dohomeart.co.uk/v2/provider/')
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching providers:', error);
      return [];
    });
}

function getCategories() {
  return fetch('https://dohomeart.co.uk/v2/ext/category/')
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching categories:', error);
      return [];
    });
}

function getServices() {
  return fetch('https://dohomeart.co.uk/v2/service/')
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching services:', error);
      return [];
    });
}

Promise.all([getProviders(), getCategories(), getServices()])
  .then(data => {
    const [providers, categories, services] = data;
    // Aici poți utiliza providers, categories și services pentru a continua procesarea datelor
    console.log('Providers:', providers);
    console.log('Categories:', categories);
    console.log('Services:', services);
  })
  .catch(error => {
    console.error('Error:', error);
  });
