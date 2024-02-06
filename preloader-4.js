async function triggerPuppeteerFunction() {
    try {
        const response = await fetch('https://us-central1-sb-dohomeart.cloudfunctions.net/sb-puppeteer', {
            method: 'POST', // Or 'GET', depending on how your function is configured
            // Optionally, include request headers or a request body if required
        });
        
        if (response.ok) {
            console.log('Puppeteer function triggered successfully.');
            // Optionally, process the response from the function if needed
        } else {
            console.error('Error triggering Puppeteer function:', response.statusText);
        }
    } catch (error) {
        console.error('Error triggering Puppeteer function:', error);
    }
}

// Call the function when the page loads or when a specific event occurs
document.addEventListener('DOMContentLoaded', triggerPuppeteerFunction);
