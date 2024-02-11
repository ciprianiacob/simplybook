function initLinksLocations() {
  var selectLocations = document.querySelectorAll('.location-item');

  selectLocations.forEach(function(location) {
    var button = location.querySelector('.item__footer .btn.select');
    var href = button.getAttribute('href');
    console.log("location href", href);
    var locationID = href.match(/\/location\/(\d+)/)[1];
    button.setAttribute('href', href.replace(/\/location\/(\d+)\//, '/location/' + locationID + '/category/15/'));
  });
}

function filterLocations() {
	var input, filter, items, item, title, i, matchFound;

	input = document.querySelector('.locationFilter input');
	if (input) {
		filter = input.value.toUpperCase();
	}

	items = document.querySelectorAll('.location-item');
	if (items.length > 0) {
		matchFound = false;

		for (i = 0; i < items.length; i++) {
			item = items[i];

			if (i === 0) {
				continue;
			}

			title = item.querySelector('.title');
			if (title) {
				if (title.innerHTML.toUpperCase().indexOf(filter) > -1) {
					item.style.display = 'block';
					matchFound = true;
				} else {
					item.style.display = 'none';
				}
			}
		}

		var lastItem = items[items.length - 1];
		lastItem.style.display = matchFound ? 'none' : 'block';
	}
}
