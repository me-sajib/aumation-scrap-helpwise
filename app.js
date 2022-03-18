const puppeteer = require("puppeteer");

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    waitUntil: "networkidle2",
    timeout: 120000,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 720 });
  await page.goto("https://www.daum.net", { waitUntil: "networkidle0" }); // wait until page load
  await page.type("#id", "sajib");
  await page.type("#loginPw", "2934293847");
  // click and wait for navigation
  await Promise.all([
    page.click("#loginSubmit"),
    page.waitForNavigation({ waitUntil: "networkidle0", timeout: 120000 }),
  ]);
}

main();
