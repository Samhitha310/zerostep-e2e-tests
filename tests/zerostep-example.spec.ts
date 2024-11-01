import { readFileSync } from 'fs';
import { test, expect } from '@playwright/test';

// Read and parse the JSON file
const configPath = 'C:\\Users\\hanee\\OneDrive\\Documents\\Desktop\\zerostep\\config\\zerostep.config.json';

const rawConfig = readFileSync(configPath, 'utf-8');
const config = JSON.parse(rawConfig);

// Access the TOKEN
const ZEROSTEP_TOKEN = config.TOKEN;

test('Load Test with 100 Users', async ({ page }) => {
    console.log(`Using token: ${ZEROSTEP_TOKEN}`);
    
    // Example of using the token in your test
    await page.goto('https://demoqa.com/');

    // Add your test logic here, for example:
    // await page.fill('selector', ZEROSTEP_TOKEN); // If you need to use the token
});
