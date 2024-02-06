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

(async () => {
    await triggerPuppeteerFunction();
    
    // Trigger function when hash changes
    $(window).on('hashchange', async function() {
        await triggerPuppeteerFunction();
    });

    // Trigger function when document is ready
    $(document).ready(async function() {
        await triggerPuppeteerFunction();
    });

    // Trigger function when DOM content is loaded
    document.addEventListener('DOMContentLoaded', async function() {
        await triggerPuppeteerFunction();
    });
})();
