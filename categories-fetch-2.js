const jsonCategoryUrl = 'https://dohomeart.co.uk/v2/ext/category/';

fetch(jsonCategoryUrl)
  .then(response => response.json())
  .then(data => {
    $(document).ready(function() {
    });

    console.log("Category:", data);
  })
  .catch(error => {
    console.error('Error fetching the JSON data:', error);
  });
