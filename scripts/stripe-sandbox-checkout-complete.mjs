import { chromium } from "playwright";

const checkoutUrl = process.env.BUSINESS_BUILDER_STRIPE_SANDBOX_CHECKOUT_URL;
const expectedDecline = process.env.BUSINESS_BUILDER_STRIPE_SANDBOX_EXPECT_DECLINE === "1";
if (!checkoutUrl?.startsWith("https://checkout.stripe.com/")) {
  throw new Error("An exact Stripe-hosted sandbox Checkout URL is required");
}

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(checkoutUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
  let paymentFrame = page.mainFrame();
  for (const frame of page.frames()) {
    if (frame.url().startsWith("https://checkout.stripe.com/") && await frame.locator('input[name="cardNumber"]').count()) {
      paymentFrame = frame;
      break;
    }
  }
  await paymentFrame.locator('input[name="cardNumber"]').fill(expectedDecline ? "4000000000009995" : "4242424242424242");
  await paymentFrame.locator('input[name="cardExpiry"]').fill("1234");
  await paymentFrame.locator('input[name="cardCvc"]').fill("123");
  await paymentFrame.locator('input[name="billingName"]').fill("Sandbox Pilot");
  await paymentFrame.locator('input[name="billingPostalCode"]').fill("10001");
  const saveDetails = paymentFrame.locator('input[name="enableStripePass"]');
  if (await saveDetails.count() && await saveDetails.isChecked()) await saveDetails.uncheck();
  await paymentFrame.getByTestId("hosted-payment-submit-button").click();
  if (expectedDecline) {
    await page.waitForTimeout(6_000);
  } else {
    await page.waitForURL((url) => url.host !== "checkout.stripe.com", { timeout: 15_000 }).catch(() => null);
  }
  const url = new URL(page.url());
  const checkoutCompleted = url.host !== "checkout.stripe.com" || await page.getByText("Payment complete", { exact: false }).count() > 0;
  const declined = expectedDecline && !checkoutCompleted && /declined|insufficient funds/i.test(await paymentFrame.locator("body").innerText());
  console.log(JSON.stringify({
    status: declined ? "sandbox_decline_observed" : checkoutCompleted ? "sandbox_checkout_submitted" : "sandbox_checkout_remained_open",
    resulting_host: url.host,
    sandbox_only: true,
  }));
  if (expectedDecline ? !declined : !checkoutCompleted) process.exitCode = 1;
} finally {
  await browser.close();
}
