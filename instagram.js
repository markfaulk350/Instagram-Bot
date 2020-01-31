const puppeteer = require('puppeteer');

const BASE_URL = 'https://instagram.com';
const loginPageURL = 'https://www.instagram.com/accounts/login/?source=auth_switcher'

const instagram = {
    browser: null,
    page: null,

    init: async () => {
        instagram.browser = await puppeteer.launch({
            headless: false     // This allows us to see the browser tab for testing purposes
        });

        instagram.page = await instagram.browser.newPage();
    },
    login: async (userName, password) => {
        // await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

        // // Target and click "Log in" Button
        // let loginBtn = await instagram.page.$x(`//a[contains(text(), "Log in")]`);
        // await loginBtn[0].click();

        // // Wait for page to completely load
        // await instagram.page.waitForNavigation({ waitUntil: 'networkidle2' });

        // // Wait for an additional second to make sure the page has loaded
        // await instagram.page.waitFor(1000);

        await instagram.page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });

        await instagram.page.goto(loginPageURL, { waitUntil: 'networkidle2' });
        await instagram.page.waitFor(2000);

        // Inside of chrome console we can type a command to see if targeting the elemant works
        // document.querySelector('input[name="username"]')

        // Type userName and password inside form fields
        await instagram.page.type('input[name="username"]', userName, { delay: 50 });
        await instagram.page.type('input[name="password"]', password, { delay: 50 });
        await instagram.page.waitFor(2000);

        // Target and click "Log in" button after entering userName & password
        let loginBtn = await instagram.page.$x('//button//div[contains(text(), "Log In")]');
        await loginBtn[0].click();

        await instagram.page.waitFor(6000);

        // Target and click "Not Now" on banner
        let notNowBtn = await instagram.page.$x('//button[contains(text(), "Not Now")]')
        await notNowBtn[0].click();

        await instagram.page.waitFor(3000);
    },

    slideShow: async (searchTerm, quantity) => {
        // Target search bar and enter in tag
        await instagram.page.type('input[placeholder="Search"]', searchTerm, { delay: 100 });
        await instagram.page.waitFor(3000);

        // Target and click on search result to go to tags page
        let searchResult = await instagram.page.$x(`//div//span[contains(text(), "${searchTerm}")]`)
        await searchResult[0].click();

        await instagram.page.waitFor(6000);

        // Check that we can get most recent posts
        // document.querySelectorAll('article > div:nth-child(3) img[decoding="auto"]')

        // let posts = await instagram.page.$$('article > div:nth-child(3)')

        // Target and click on first most recent post
        let firstPost = await instagram.page.$$('article > div:nth-child(3) > div > div:nth-child(1) > div:nth-child(1)')
        await firstPost[0].click();

        // Then hit the next button
        let nextBtn;

        for (let i = 0; i < quantity; i++) {
            await instagram.page.waitFor(1000);
            nextBtn = await instagram.page.$$('a[class="HBoOv coreSpriteRightPaginationArrow"]');
            await nextBtn[0].click();
        }

        debugger;
    }
}

module.exports = instagram;





// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://example.com');
//   await page.screenshot({path: 'example.png'});

//   await browser.close();
// })();