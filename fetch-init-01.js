// External link to the JSON file
const jsonUrl = 'https://dohomeart.co.uk/v2/provider/';

// Fetch data from the external JSON file
fetch(jsonUrl)
  .then(response => response.json())
  .then(data => {
    // 'data' now contains the parsed JSON data
    console.log(data);
    const firstName = data[2].name;
    $('#select_event_id').text(firstName);
  })
  .catch(error => {
    console.error('Error fetching the JSON data:', error);
  });
