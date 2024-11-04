import { chromium } from 'playwright';

(async () => {
  // Launch the browser in UI mode (headless: false to see it in action)
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the login page
  const url = 'https://w3.cezanneondemand.com/CezanneOnDemand/-/GreenpeaceEspana/Account/LogIn';  
  await page.goto(url);
  await page.screenshot({ path: 'screenshots/01-login-page.png' });
  console.log('Navigated to login page!');

  // Enter Username
  await page.fill('input[name="Username"]', 'lswersky@greenpeace.org'); 
  // await page.screenshot({ path: './screenshots/02-username-filled.png' });
  console.log('Username entered!');

  // Enter Password
  await page.fill('#Password', 'crv1rpz6GQZ@hwa0una');
  // await page.screenshot({ path: './screenshots/03-password-filled.png' });
  console.log('Password entered!');

  // Click Login Button
  await page.click('#login-form > form > div:nth-child(5) > button')
  // await page.screenshot({ path: './screenshots/04-login-clicked.png' });
  console.log('Login button clicked!');

  // Click the "Hora de entrada" button
  await page.click('button.cz-clock-in-button-dot.cz-clock-in-button-green');
  // await page.screenshot({ path: './screenshots/05-clock-in-clicked.png' });

  // Click the "Aceptar" button
  await page.click('button.cz-primary-button:has-text("Aceptar")');
  // await page.screenshot({ path: './screenshots/06-accept-clicked.png' });
  console.log('✅ Logged in!');

  // Close the browser
  await browser.close();
})();
