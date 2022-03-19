const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: `C:\\Users\\sajib\\AppData\\Local\\Google\\Chrome\\User Data\\Default`,
    timeout: 120000,
  });

  const page = await browser.newPage();
  await page.goto("https://app.helpwise.io/", {
    timeout: 120000,
    waitUntil: "networkidle2",
  });

  if (page.url() !== "https://app.helpwise.io/welcome") {
    await page.waitForSelector(".form-group", { timeout: 120000 });
    await page.type("#email", "me.mrsajib@gmail.com");
    await page.type("#password", "sajib$S");
    await Promise.all([
      page.click(".btn-brand-02"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
  }

  await page.screenshot({ path: "helpWise.png" });
  await browser.close();
}

try {
  run();
} catch (err) {
  console.error(err);
}
