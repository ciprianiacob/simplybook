const puppeteer = require('puppeteer');

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  
  // Open a new page
  const page = await browser.newPage();

  try {
    // Navigate to the specified URL and wait for DOMContentLoaded
    // Also, wait for the element with id "preloader" to become visible
    await Promise.all([
      page.goto("https://dohomeart.co.uk/v2/", {
        waitUntil: "domcontentloaded",
      }),
      page.waitForSelector("#preloader", { visible: true }),
    ]);

    // Do something after the navigation and element visibility checks
    console.log("Page loaded successfully!");

    // Additional actions can be performed here

  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();
