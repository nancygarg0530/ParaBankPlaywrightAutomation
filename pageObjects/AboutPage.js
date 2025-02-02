const { expect } = require("@playwright/test");

class AboutPage{

    constructor(page,sessionVariable) {
       this.page = page;
       this.sessionVariable = sessionVariable;
       this.aboutHeader = page.getByText("ParaSoft Demo Website");
    }

    async validateAboutHeaderMessage(){
        await this.aboutHeader.waitFor();
        await expect(this.aboutHeader).toHaveText("ParaSoft Demo Website");

    }

}
module.exports = {AboutPage}