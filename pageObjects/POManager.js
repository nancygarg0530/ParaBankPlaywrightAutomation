const {AboutPage} = require ('./AboutPage')
const {HomePage} = require ('./HomePage')
const {UserRegistration} = require ('./UserRegistration');
const { NewAccountPage } = require('./NewAccountPage');
const { AccountOverviewPage } = require('./AccountOverviewPage');
const { TransferFundsPage } = require('./TransferFundsPage');
const { BillPayPage } = require('./BillPayPage');
const { ContactPage } = require('./ContactPage');

class POManager {

    constructor(page,sessionVariable) {
        this.page = page;
        this.sessionVariable = sessionVariable;
        this.homePage = new HomePage(this.page,this.sessionVariable);
        this.userRegistration = new UserRegistration(this.page,this.sessionVariable);
        this.newAccountPage = new NewAccountPage(this.page,this.sessionVariable);
        this.accountOverviewPage = new AccountOverviewPage(this.page,this.sessionVariable);
        this.transferFundsPage = new TransferFundsPage(this.page,this.sessionVariable);
        this.billPayPage = new BillPayPage(this.page,this.sessionVariable);
        this.aboutPage = new AboutPage(this.page,this.sessionVariable);
        this.contactPage = new ContactPage(this.page,this.sessionVariable);
    }

    getAboutPage(){
        return this.aboutPage;
    }

    getContactPage(){
        return this.contactPage;
    }

    getHomePage(){
        return this.homePage;
    }

    getuserRegistration(){
        return this.userRegistration;
    }

    getNewAccountPage(){
        return this.newAccountPage;
    }

    getAccountOverviewPage(){
        return this.accountOverviewPage;
    }

    getTransfersFundPage(){
        return this.transferFundsPage;
    }

    getbillPayPage(){
        return this.billPayPage;
    }

}
module.exports = {POManager}