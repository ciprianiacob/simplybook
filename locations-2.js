function initLocations() {
	(function() {
		var selectButtons = document.querySelectorAll('.btn.select');

		selectButtons.forEach(function(button) {
			var href = button.getAttribute('href');
			var locationID = href.match(/\/location\/(\d+)/)[1];
			button.setAttribute('href', href.replace(/\/location\/(\d+)\//, '/location/' + locationID + '/category/15/'));
		});
	})();
}
