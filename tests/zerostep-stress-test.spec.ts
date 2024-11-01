import { test, expect } from '@playwright/test';

test('Stress Test with Gradual User Increase', async ({ browser }) => {
    const maxUsers = 200; // Maximum number of users
    const duration = 20 * 60 * 1000; // Total duration of the test in milliseconds (20 minutes)
    const userInterval = duration / maxUsers; // Time interval for user arrival
    const responseTimes: number[] = []; // Array to store response times
    const stabilityIssues: string[] = []; // Array to store any stability issues

    test.setTimeout(30 * 60 * 1000); // Set a higher timeout for the test

    // Function to navigate and interact as a user
    const navigateAndInteract = async (userId) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const startTime = Date.now();

    try {
        console.log(`User ${userId} is navigating to the page...`);
        await page.goto('https://demoqa.com/', { waitUntil: 'load', timeout: 120000 }); // Increased timeout to 120s
        await page.waitForSelector('body', { timeout: 120000 }); // Increased timeout to 120s

        // Navigate to "Widgets"
        await page.click('text=Widgets');
        await page.waitForNavigation({ waitUntil: 'load', timeout: 120000 }); // Increased timeout to 120s

        // Drag and Drop interaction
        await page.click('text=Sortable');
        await page.waitForSelector('#sortable', { timeout: 120000 }); // Increased timeout to 120s

        const sortableElement = await page.$('#sortable');
        await page.hover('#sortable');
        await page.mouse.down();
        await page.mouse.move(600, 400); // Adjust coordinates if necessary
        await page.mouse.up();

        const endTime = Date.now();
        responseTimes.push(endTime - startTime);
        console.log(`User ${userId} completed interaction successfully in ${endTime - startTime} ms.`);
    } catch (error) {
        console.error(`Error for user ${userId}:`, error.message);
        stabilityIssues.push(`Error for user ${userId}: ${error.message}`);
    } finally {
        await page.close();
        await context.close();
    }
};


    const activeUsers: Promise<void>[] = []; // Array to track active user promises

    // Loop to create user promises
    for (let userId = 1; userId <= maxUsers; userId++) {
        const userPromise = new Promise<void>((resolve) => {
            setTimeout(async () => {
                await navigateAndInteract(userId); // Call the user interaction function
                resolve(); // Resolve the promise
            }, userId * userInterval); // Delay based on user ID
        });
        activeUsers.push(userPromise); // Add promise to active users
    }

    await Promise.all(activeUsers); // Wait for all user interactions to complete

    // Calculate and log results
    if (responseTimes.length > 0) {
        const averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length; // Calculate average
        console.log(`Average response time: ${averageResponseTime.toFixed(2)} ms.`);
    } else {
        console.log('No successful requests recorded.');
    }

    if (stabilityIssues.length > 0) {
        console.log('Stability Issues:');
        stabilityIssues.forEach(issue => console.log(issue)); // Log stability issues
    } else {
        console.log('No stability issues recorded.');
    }
});
