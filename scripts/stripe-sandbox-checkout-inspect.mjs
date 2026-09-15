import { chromium } from "playwright";

const checkoutUrl = process.env.BUSINESS_BUILDER_STRIPE_SANDBOX_CHECKOUT_URL;
if (!checkoutUrl?.startsWith("https://checkout.stripe.com/")) {
  throw new Error("An exact Stripe-hosted sandbox Checkout URL is required");
}

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(checkoutUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForTimeout(2_000);
  const fields = [];
  for (const frame of page.frames()) {
    const visible = await frame.locator("input").evaluateAll((inputs) => inputs.map((input) => ({
      name: input.getAttribute("name"), type: input.getAttribute("type"),
      placeholder: input.getAttribute("placeholder"),
    }))).catch(() => []);
    if (visible.length) fields.push({ host: new URL(frame.url()).host, fields: visible });
  }
  const shots = process.env.BUSINESS_BUILDER_STRIPE_SANDBOX_SHOTS_DIR;
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: width === 375 ? 812 : width === 768 ? 1024 : 900 });
    if (shots) await page.screenshot({ path: `${shots}/stripe-checkout-${width}.png`, fullPage: true });
  }
  console.log(JSON.stringify({ status: "rendered", frame_count: page.frames().length, fields }));
} finally {
  await browser.close();
}
