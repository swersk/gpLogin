import { chromium } from 'playwright'; 


const action = process.argv[2]; 

if (!['clock-in', 'clock-out'].includes(action)) {
  console.error('Invalid action! Use "clock-in" or "clock-out".');
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const url = 'https://w3.cezanneondemand.com/CezanneOnDemand/-/GreenpeaceEspana/Account/LogIn';

  if (action === 'clock-in') {
    console.log("Logging in...");
    await page.goto(url);
    await page.screenshot({ path: './screenshots/01-url.png' });
    const username = process.env.USERNAME
    if (!username) {
      console.error('Username is undefined.');
      process.exit(1);
    }
    await page.fill('input[name="Username"]', process.env.USERNAME);
    console.log("Username entered with username: ", process.env.USERNAME);
    await page.fill('#Password', process.env.PASSWORD);
    console.log("Password. entered.");
    await page.screenshot({ path: './screenshots/02-login-info.png' });
    await page.click('#login-form > form > div:nth-child(5) > button');
    console.log('Clock-in process initiated...');
    await page.click('button.cz-clock-in-button-dot.cz-clock-in-button-green');
    await page.screenshot({ path: './screenshots/05-clock-in-clicked.png' });
    console.log('Clock-in clicked');
    await page.click('button.cz-primary-button:has-text("Aceptar")');
    await page.screenshot({ path: './screenshots/06-accept-clicked.png' });
    console.log('✅ Logged in!');
  } else if (action === 'clock-out') {
    console.log("Logging out...");
    await page.goto(url);
    await page.screenshot({ path: './screenshots/01-url.png' });
    const username = process.env.USERNAME
    if (!username) {
      console.error('Username is undefined.');
      process.exit(1);
    }
    await page.fill('input[name="Username"]', process.env.USERNAME);
    console.log("Username entered with username: ", process.env.USERNAME);
    await page.fill('#Password', process.env.PASSWORD);
    console.log("Password. entered.");
    await page.screenshot({ path: './screenshots/02-login-info.png' });
    await page.click('#login-form > form > div:nth-child(5) > button');
    console.log('Clock-out process initiated...');
    await page.click('button.cz-clock-in-button-dot.cz-clock-in-button-blue');
    await page.screenshot({ path: './screenshots/06-clock-out-clicked.png' });
    console.log('Clock-out clicked');
    await page.click('button.cz-primary-button:has-text("Aceptar")');
    console.log('✅ Logged out!');
  }
  await browser.close();
})();
