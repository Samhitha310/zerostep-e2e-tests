import { readFileSync } from 'fs';
import { test, expect } from '@playwright/test';

// Read and parse the JSON file
const configPath = 'C:\\Users\\hanee\\OneDrive\\Documents\\Desktop\\zerostep\\config\\zerostep.config.json';

const rawConfig = readFileSync(configPath, 'utf-8');
const config = JSON.parse(rawConfig);

// Access the TOKEN
const ZEROSTEP_TOKEN = config.TOKEN;

test('Load Test for Widgets', async ({ page }) => {
    console.log(`Using token: ${ZEROSTEP_TOKEN}`);
    
    await page.goto('https://demoqa.com/widgets');
    
    // Add your test logic for widgets here
});
