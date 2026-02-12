const puppeteer = require('puppeteer');

(async () => {
  const result = { success: false, details: [] };
  const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  try {
    const base = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
    const email = `e2e-${Date.now()}@example.com`;

    await page.goto(`${base}/auth`, { waitUntil: 'networkidle2' });
    result.details.push('Opened /auth');

    // Click Sign up
    await page.evaluate(() => {
      Array.from(document.querySelectorAll('button')).forEach(b => {
        if (b.innerText && b.innerText.trim().toLowerCase() === 'sign up') b.click();
      });
    });
    await sleep(300);
    result.details.push('Switched to Sign up');

    // Fill register form
    await page.type('input[placeholder="Full name"]', 'E2E User');
    await page.type('input[placeholder="Email"]', email);
    await page.type('input[placeholder="Password"]', 'Test12345');

    // Click Create account
    await page.evaluate(() => {
      Array.from(document.querySelectorAll('button')).forEach(b => {
        if (b.innerText && b.innerText.trim().toLowerCase() === 'create account') b.click();
      });
    });

    // Wait for token in localStorage
    let token = null;
    for (let i = 0; i < 30; i++) {
      token = await page.evaluate(() => localStorage.getItem('token'));
      if (token) break;
      await sleep(200);
    }

    if (!token) throw new Error('Token not set after registration');
    result.details.push('Token set in localStorage');

    // Wait for header to show user name
    let userText = null;
    for (let i = 0; i < 20; i++) {
      userText = await page.evaluate(() => {
        const el = Array.from(document.querySelectorAll('header')).map(h => h.innerText).join('\n');
        return el;
      });
      if (userText && userText.includes('E2E User')) break;
      await page.waitForTimeout(200);
    }

    if (!userText || !userText.includes('E2E User')) throw new Error('Header did not display user name');
    result.details.push('Header showed user name');

    // Verify logout works
    await page.evaluate(() => {
      Array.from(document.querySelectorAll('button')).forEach(b => {
        if (b.innerText && b.innerText.trim().toLowerCase() === 'logout') b.click();
      });
    });

    // Ensure token removed
    let tokenAfter = await page.evaluate(() => localStorage.getItem('token'));
    if (tokenAfter) throw new Error('Token still present after logout');
    result.details.push('Logout removed token');

    result.success = true;
  } catch (err) {
    result.details.push('Error: ' + err.message);
  } finally {
    await browser.close();
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.success ? 0 : 1);
  }
})();