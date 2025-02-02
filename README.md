# Playwright Automation Framework with Page Object Model & Jenkins CI/CD  

# Overview  
ParaBankPlayWrightAutomation project is an end-to-end automation framework built using Playwright and follows the Page Object Model (POM) design pattern. It also integrates with Jenkins CI/CD for automated test execution and reporting.

# Tech Stack
- Playwright (for web automation)
- JavaScript
- Jenkins** (for CI/CD integration)
- Allure Reports (for test reporting)
- Node.js (runtime environment)

# Project Structure
'''ParaBankPlayWrightAutomation/
│
├── pageObjects/           # Page Object Model files for interactions with the application
├── fixtures/              # Used to Store Test Data in Json File
├── test/                  # Test scripts for running the automated tests
├── utils/                 # Utility functions for test execution and api test execution
├── testData/              # Test data to store data for different scenarios at run time
├── allure-report/         # Generated Allure reports for test results
├── JenkinsFile            # Jenkins pipeline for CI/CD automation
└── README.md              # This readme file'''


 # Steps to Run the Automation Test
   -> Clone and Setup 
      1. git clone https://github.com/nancygarg0530/ParaBankPlaywrightAutomation.git
      2. cd ParaBankPlaywrightAutomation
   -> Install Dependencies (PreRequisite : Node JS should be downloaded in the system and enviornment variable should be setup for the same)
      1. npm install
      2. npx playwright install --with-deps
   -> Run Test Locally 
      1. npx playwright test
   -> Generate Reports 
      1. npx allure generate ./allure-results --clean 
      2. npx allure open ./allure-report

Let me know if you need any modifications! 
     
