import path from 'path';
import puppeteer from 'puppeteer';
import {log} from "console";

const extension = [
  process.env.TERRA_EXTENSION!,
  process.env.TERRA_EXTENSION_RELOADER!,
  process.env.TERRA_LEGACY_EXTENSION_1!,
  process.env.TERRA_LEGACY_EXTENSION_2!,
].join(',');

const userDataDir = path.resolve(
  __dirname,
  '../puppeteer-user-data/multiple-wallets',
);

(async () => {
  const browser = await puppeteer.launch({
    userDataDir,
    headless: false,
    defaultViewport: null,
    args: [
      `--load-extension=${extension}`,
      `--disable-extensions-except=${extension}`,
    ],
    ignoreDefaultArgs: ['--disable-extensions'],
    devtools: true,
  });

  const [page] = await browser.pages();
  await page.goto(`https://localhost:3000`);

  log(
    `🌏 Test Chromium is ready. A shortcut "Ctrl + C" is close the browser.`,
  );
})();
