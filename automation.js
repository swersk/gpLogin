import { chromium } from 'playwright'; 
const action = process.argv[2]; 
import fs from 'fs';

if (!fs.existsSync('./screenshots')) {
  fs.mkdirSync('./screenshots', { recursive: true });
}


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
    console.log("Logging in at: ", new Date().toLocaleString());
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
    await page.screenshot({ path: './screenshots/03-clock-in-clicked.png' });
    console.log('Clock-in clicked');
    await page.click('button.cz-primary-button:has-text("Aceptar")');
    await page.screenshot({ path: './screenshots/04-accept-clicked.png' });
    console.log('Confirmed clock-in.'); 
    const clockOutLabel = page.locator('strong.cz-clock-in-out-label', { hasText: 'Registro de la hora de salida' });
    console.log("Waiting for the 'Clock-out' label to be visible...");
    try {
      await clockOutLabel.waitFor({ state: 'visible'});  
      console.log("✅ 'Clock-out' label is visible.");
      await clockOutLabel.screenshot({ path: './screenshots/07-clock-out-label-visible.png' });
    } catch (error) {
      console.error("❌ Error: 'Clock-out' label did not become visible within the timeout.", error);
      await page.screenshot({ path: './screenshots/07-clock-out-label-error.png' });
      process.exit(1);  
    }
  } else if (action === 'clock-out') {
    console.log("[1] Clocking out at: ", new Date().toLocaleString());
    await page.goto(url);
    await page.screenshot({ path: './screenshots/08-url.png' });
    const username = process.env.USERNAME
    if (!username) {
      console.error('While logging out, username is undefined. Cannot proceed with clock-out.');
      process.exit(1);
    }
    const usernameInput = await page.locator('input[name="Username"]');
    await usernameInput.fill(process.env.USERNAME);
    console.log("[2] Entered Username.");
    await page.fill('#Password', process.env.PASSWORD);
    console.log("[3] Entered password.");
    await page.screenshot({ path: './screenshots/09-login-info.png' });
    await page.click('#login-form > form > div:nth-child(5) > button');
    await page.click('button.cz-clock-in-button-dot.cz-clock-in-button-blue');
    await page.waitForTimeout(1000); 
    await page.screenshot({ path: './screenshots/10-clock-out-clicked.png' });
    console.log('[4] Clicked clock-out.');
    await page.click('button.cz-primary-button:has-text("Aceptar")');
    console.log('[5] ✅ Logged out!');
    const loginForm = page.locator('form#login-form');
    await page.screenshot({ path: './screenshots/11-logged-out.png' });
  }
  await browser.close();
})();
