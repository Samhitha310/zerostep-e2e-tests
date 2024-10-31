Project Description

This project performs a load test on the DemoQA website, focusing on assessing the performance of key sections—Forms, Widgets, and Interactions—under simulated high-traffic conditions. The primary goal of these tests is to evaluate how well the site handles concurrent user activity, as well as to analyze response times and potential bottlenecks.

The load test simulates 100 virtual users navigating through different sections of the website over a period of 10 minutes. Each user interacts with each section of the site, helping to determine the stability and performance of these features under stress. By recording and analyzing the response time for each request, these tests help identify areas for optimization and ensure a positive user experience even under peak load conditions.

Setup Instructions:

Install dependencies

npm install

Add your zerostep.config.json file in the project directory, with the required token:
json

{
    "TOKEN": "<your_token_here>"
}

Usage:

To run a specific test:

npx playwright test zerostep<file-name>.spec.ts --trace on