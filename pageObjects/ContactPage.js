const { expect } = require("@playwright/test");

class ContactPage{

    constructor(page,sessionVariable) {
       this.page = page;
       this.sessionVariable = sessionVariable;
       this.contactHeader = page.locator("#bodyPanel .title");
    }

    async validateContactHeaderMessage(){
        await this.contactHeader.waitFor();
        await expect(this.contactHeader).toHaveText("Customer Care");
    }

}
module.exports = {ContactPage}