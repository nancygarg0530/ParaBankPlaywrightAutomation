const { test, expect } = require('../fixtures/customFixture');
const {POManager} = require('../pageObjects/POManager');
const { APiUtils } = require('../utils/APiUtils');
const { request } = require('@playwright/test');
const { CommonUtils } = require('../utils/CommonUtils');

test.describe.serial('Dependent Tests', () => {
    test('ParaBank @UI Test Scenario', async ({page,sessionVariable})=>
    {
        //Define all the pages 
        const poManager = new POManager(page,sessionVariable);
        const homePage = poManager.getHomePage();
        const userRegistrationPage = poManager.getuserRegistration();
        const newAccountPage = poManager.getNewAccountPage();
        const accountOverviewPage = poManager.getAccountOverviewPage();
        const transferFundsPage = poManager.getTransfersFundPage();
        const billToPage = poManager.getbillPayPage();
        const commonUtils = new CommonUtils(sessionVariable);
        const aboutPage = poManager.getAboutPage();
        const contactPage = poManager.getContactPage();
    
        //Navigate to the Application
        await homePage.goTO();
        
        //Register New User
        await homePage.clickOnRegistrationLink();
        await userRegistrationPage.registerNewUserOnParaBank();
        await homePage.validateHomePageAfterLogin();

        //Validate HomePage Global Links
        await homePage.clickOnHomeButtonLink();
        await homePage.validateHomePageHeader();
        await homePage.clickOnAboutButtonLink();
        await aboutPage.validateAboutHeaderMessage();
        await homePage.clickOnContactButtonLink();
        await contactPage.validateContactHeaderMessage();

        //Fetch Cookies for API Automation
        const cookies = await page.context().cookies();
        const JSESSIONID = cookies.find(cookie => cookie.name === 'JSESSIONID');
        sessionVariable.JSESSIONID = JSESSIONID.value;
       
        //Get Account and Amount details for Old Account
        await homePage.clickOnAccountsOverviewLink();
        await accountOverviewPage.getAccountDetailsOfAlreadyCreatedAccount();
        
        //Open New Account for the New User
        await homePage.clickOnOpenNewAccountLink();
        await newAccountPage.validateOpenNewAccountPageIsOpen();
        await newAccountPage.selectAccountTypeFromTheDropDown("SAVINGS");
        await newAccountPage.clickOpenNewAccountButton();
        await newAccountPage.validateNewOpenAccountTextMessage();
        await newAccountPage.getNewelyCreatedAccountDetails();

        //Store Amount In Session Variable
        sessionVariable.NewAccountAmount = '$100.00';
        sessionVariable.amountUsedInTestCase = '$10.00';
        
        //Validate Amount for Newly Account Created
        await homePage.clickOnAccountsOverviewLink();
        await accountOverviewPage.validateAccountOverviewPageIsOpen();
        await accountOverviewPage.validateAmountForNewlyCreatedAccount(sessionVariable.accountNumber,sessionVariable.NewAccountAmount);
        sessionVariable.oldAccountAmount = commonUtils.subtractTwoNumbers(sessionVariable.oldAccountAmount,sessionVariable.NewAccountAmount);
        await accountOverviewPage.validateAmountForNewlyCreatedAccount(sessionVariable.oldAccountNumber,sessionVariable.oldAccountAmount);
        
        //Transfer Amount from New Account To Old Account
        await homePage.clickOnTransferFundsLink();
        await transferFundsPage.validateTransferAccountsPageIsOpen();
        await transferFundsPage.transferAmountFromOneAccountToAnotherAccount(commonUtils.removeDollarFromNumber(sessionVariable.amountUsedInTestCase),sessionVariable.accountNumber,sessionVariable.oldAccountNumber);
        await transferFundsPage.validateTransferAmountMessage(sessionVariable.amountUsedInTestCase,sessionVariable.accountNumber,sessionVariable.oldAccountNumber);
        
        //Validate Amount for Newly And Old Account
        await homePage.clickOnAccountsOverviewLink();
        await accountOverviewPage.validateAccountOverviewPageIsOpen();
        sessionVariable.NewAccountAmount = commonUtils.subtractTwoNumbers(sessionVariable.NewAccountAmount,sessionVariable.amountUsedInTestCase);
        await accountOverviewPage.validateAmountForNewlyCreatedAccount(sessionVariable.accountNumber,sessionVariable.NewAccountAmount);
        sessionVariable.oldAccountAmount = commonUtils.addTwoNumbers(sessionVariable.oldAccountAmount,sessionVariable.amountUsedInTestCase);
        await accountOverviewPage.validateAmountForNewlyCreatedAccount(sessionVariable.oldAccountNumber,sessionVariable.oldAccountAmount);

        //Pay Bill from New Account
        await homePage.clickOnBillPayLink();
        await billToPage.validateBillPaymentServicePageIsOpen();
        await billToPage.enterBillToPayDetails(commonUtils.removeDollarFromNumber(sessionVariable.amountUsedInTestCase),sessionVariable.accountNumber);
        await billToPage.validateBillToPayeMessage(sessionVariable.amountUsedInTestCase,sessionVariable.accountNumber);
        
        //Validate Amount for Newly Account
        await homePage.clickOnAccountsOverviewLink();
        await accountOverviewPage.validateAccountOverviewPageIsOpen();
        await accountOverviewPage.validateAmountForNewlyCreatedAccount(sessionVariable.accountNumber,'$80.00');    
   
    });

    test('ParaBank @API Test Scenario', async ({sessionVariable})=>
    {   
        //Define all the Objects
        const commonUtils = new CommonUtils(sessionVariable);
        const context = await request.newContext();
        const apiUtils = new APiUtils(context,sessionVariable);
    
        //Call Transaction API To Validate Bill To Pay Transaction
        await apiUtils.getTransactionDetails(sessionVariable.accountNumber,Number(commonUtils.removeDollarFromNumber(sessionVariable.amountUsedInTestCase)));
    });
});