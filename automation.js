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
  await page.goto(url);
  await page.fill('input[name="Username"]', 'lswersky@greenpeace.org');
  await page.fill('#Password', 'crv1rpz6GQZ@hwa0una');
  await page.click('#login-form > form > div:nth-child(5) > button');

  if (action === 'clock-in') {
    await page.click('button.cz-clock-in-button-dot.cz-clock-in-button-green');
    await page.screenshot({ path: './screenshots/clock-in.png' });
    console.log('Clock-In completed!');
  } else if (action === 'clock-out') {
    await page.click('button.cz-clock-in-button-dot.cz-clock-in-button-blue');
    await page.screenshot({ path: './screenshots/clock-out.png' });
    console.log('Clock-Out completed!');
  }
  await page.click('button.cz-primary-button:has-text("Aceptar")');
  await browser.close();
})();
