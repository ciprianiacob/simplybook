const jsonLocationsUrl = 'https://dohomeart.co.uk/v2/ext/location/';

fetch(jsonLocationsUrl)
  .then(response => response.json())
  .then(data => {
    $(document).ready(function() {
    });

    console.log("Location:", data);
  })
  .catch(error => {
    console.error('Error fetching the JSON data:', error);
  });
