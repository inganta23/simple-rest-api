import { chromium } from 'playwright';

describe('launch browser', () => {
    test('test login and register', async () => {
        const browser = await chromium.launch({
            slowMo: 1000,
            headless: false
        });

        const context = await browser.newContext({
            // recordVideo: {
            //     dir: "./videos/"
            // }
        });
        const page = await context.newPage();

        //Register
        // await page.goto('http://localhost:5173/?menu=register');
        // await page.fill("input[name='email']", 'alice@gmail.com');
        // await page.fill("input[name='name']", 'alice');
        // await page.fill("input[name='password']", '123456');
        // await page.fill("input[name='conf-password']", '123456');
        // await page.click('button:text("Create an account")');

        //Login
        await page.goto('http://localhost:5173/?menu=login');
        await page.fill("input[name='email']", 'alice@gmail.com');
        await page.fill("input[name='password']", '123456');
        await page.click('button:text("Login")');
        const element = await page.locator('h1.text-gray-900').textContent();
        expect(element?.includes('alice')).toBeTruthy();
        await page.click('button:text("Logout")');

        await context.close();
        await browser.close();
    });
});
