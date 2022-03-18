const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: `C:\\Users\\sajib\\AppData\\Local\\Google\\Chrome\\User Data\\Default`,
    timeout: 120000,
  });

  const page = await browser.newPage();
  await page.goto("https://app.helpwise.io/", { timeout: 120000 });

  //   check cookie is set or not
  const cookiesFilePath = "cookies.json";
  const previousSession = fs.existsSync(cookiesFilePath);
  if (previousSession) {
    // If file exist load the cookies
    const cookiesString = fs.readFileSync(cookiesFilePath);
    const parsedCookies = JSON.parse(cookiesString);
    if (parsedCookies.length !== 0) {
      for (let cookie of parsedCookies) {
        await page.setCookie(cookie);
      }
      console.log("Session has been loaded in the browser");
    }
  }

  // Save Session Cookies
  const cookiesObject = await page.cookies();
  // Write cookies to temp file to be used in other profile pages
  if (!previousSession) {
    fs.writeFile(
      cookiesFilePath,
      JSON.stringify(cookiesObject),
      function (err) {
        if (err) {
          console.log("The file could not be written.", err);
        }
        console.log("Session has been successfully saved");
      }
    );
  }

  await page.screenshot({ path: "helpWise.png" });
  await browser.close();
}

try {
  run();
} catch (err) {
  console.error(err);
}
