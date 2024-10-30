import { chromium } from 'playwright';

(async () => {
  // Launch the browser in UI mode (headless: false to see it in action)
  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the login page
  const url = 'https://w3.cezanneondemand.com/CezanneOnDemand/-/GreenpeaceEspana/Account/LogIn';  
  await page.goto(url);

  // Enter Username
  await page.fill('input[name="Username"]', 'lswersky@greenpeace.org'); 
  console.log('Username entered!');

  // Enter Password
  await page.fill('#Password', 'crv1rpz6GQZ@hwa0una');
    console.log('Password entered!');

    // Click Login Button
    await page.click('#login-form > form > div:nth-child(5) > button')
    console.log('Login button clicked!');

  // Click the "Hora de entrada" button
  await page.click('button.cz-clock-in-button-dot.cz-clock-in-button-green');

  // Click the "Aceptar" button
  await page.click('button.cz-primary-button:has-text("Aceptar")');
  console.log('✅ Logged in!');

  // Close the browser
  await browser.close();
})();
