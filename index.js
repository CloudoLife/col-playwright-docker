const {webkit} = require('playwright');


(async () => {
    const browser = await webkit.launch(); // ({ headless: false, slowMo: 50 });
    const page = await browser.newPage();

    const siteUrl = 'https://uat-billing.idea-tek.cn'

    navigatorOptions = {waitUntil: 'networkidle'}

    // Login Page.
    const loginPage = new LoginPage(page);
    await loginPage.navigate(siteUrl, navigatorOptions);
    await loginPage.login('admin', 'expense*atyun728');

    // RoomsUsers Page.
    const roomsUsersPage = new RoomsUsersPage(page);
    await roomsUsersPage.navigate(`${siteUrl}/dashboard/rooms_users/tenants`, navigatorOptions)

    await browser.close();
})();


// The base class for all Page Object.
class PageObject {

    constructor(page, options = {}) {
        this.page = page;
        this.options = options;
    }

    async navigate(url, navigatorOptions) {
        await this.page.goto(url, navigatorOptions);

        const screenshotName = this.getScreenshotNameFromUrl(url);
        await this.screenshot(screenshotName)
    }

    getScreenshotNameFromUrl(url) {
        const urlObject = new URL(url);
        const pathName = urlObject.pathname

        console.log(`pathName = ${pathName}`)

        let screenshotName = "index"
        if (pathName !== '/') {
            screenshotName = pathName
        }

        screenshotName = `${screenshotName}.png`

        console.log(`screenshotName = ${screenshotName}`)
        return screenshotName;
    }

    async screenshot(name) {
        let screenshots_dir = this.getScreenshotName();

        await this.page.screenshot({path: `${screenshots_dir}/${name}`});
    }

    getScreenshotName() {
        let screenshots_dir = "./screenshots";

        if (this.options && this.options["screenshots_dir"]) {
            screenshots_dir = this.options["screenshots_dir"];
        }
        return screenshots_dir;
    }
}


// Login Page Object
class LoginPage extends PageObject {

    async login(username, password) {
        await this.page.fill('[placeholder="请输入手机号/邮箱"]', username);
        await this.page.fill('[placeholder="密码"]', password);
        // await this.page.screenshot({path: `screenshots/login-input.png`});
        await this.screenshot("login-input.png")

        await Promise.all([
            this.page.click('.login-form-button'), // Triggers a navigation after a timeout
            this.page.waitForNavigation(), // Waits for the next navigation
        ]);

        // await this.page.screenshot({path: `screenshots/login-success.png`});
        await this.screenshot("login-success.png")
    }

}


// RoomsUsers Page Object
class RoomsUsersPage extends PageObject {

    // @TODO

}