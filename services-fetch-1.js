const jsonServiceUrl = 'https://dohomeart.co.uk/v2/service/';

fetch(jsonServiceUrl)
  .then(response => response.json())
  .then(data => {
    $(document).ready(function() {
    });

    console.log("Service:", data);
  })
  .catch(error => {
    console.error('Error fetching the JSON data:', error);
  });
