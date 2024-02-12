function initLinksLocations() {
	var items, item, i, button, href, button, locationID;
	items = document.querySelectorAll('.location-item');
	console.log("This is a test");

	if (items.length > 0) {
		for (i = 0; i < items.length; i++) {
			item = items[i];
			button = item.querySelector('.item__footer .btn.select');
			href = button.getAttribute('href');
			locationID = href.match(/\/location\/(\d+)/)[1];
			button.setAttribute('href', href.replace(/\/location\/(\d+)\//, '/location/' + locationID + '/category/15/'));
			console.log("location href 1", href);
		}
	}
  if (items.length > 0) {
    for (i = 0; i < items.length; i++) {
      item = items[i];
      button = item.querySelector('.item__footer .btn.select');
      href = button.getAttribute('href');
      locationID = href.match(/\/location\/(\d+)/)[1];
      var newHref = href.replace(/\/location\/(\d+)\//, '/location/' + locationID + '/category/15/');
      
      // Create a new <a> element
      var newLink = document.createElement('a');
      newLink.setAttribute('href', newHref);
      
      // Append the original <a> element as a child of the new <a> element
      newLink.appendChild(button.cloneNode(true));
      
      // Replace the original <a> element with the new one
      button.parentNode.replaceChild(newLink, button);
      
      console.log("location href 1", href);
    }
  }
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
