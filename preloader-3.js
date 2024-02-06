	async function triggerPuppeteerFunction() {
		try {
			// Make a GET request to the Google Cloud Function endpoint
			const response = await fetch('https://us-central1-sb-dohomeart.cloudfunctions.net/sb-puppeteer');

			// Check if the function executed successfully
			if (response.ok) {
				// Puppeteer operation was successful
				console.log('Puppeteer operation completed successfully.');
			} else {
				// Puppeteer operation failed
				console.error('Puppeteer operation failed.');
			}
		} catch (error) {
			console.error('Error triggering Puppeteer function:', error);
		}
	}

	// Trigger the function when the page loads
	window.addEventListener('load', triggerPuppeteerFunction); 
