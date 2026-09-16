import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("responsive pages, local assets and both complete themes", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  const failedResponses: string[] = [];
  page.on("response", response => { if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`); });
  for (const locale of ["pt", "en"]) {
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale === "pt" ? "pt-BR" : "en");
    for (const theme of ["light", "dark"]) {
      await page.evaluate(value => { localStorage.setItem("alevum-theme", value); }, theme);
      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      for (const width of [360, 375, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 960 });
        await page.evaluate(() => document.fonts.ready);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${locale} ${theme} ${width}: horizontal overflow`).toBe(true);
        await expect(page.locator("h1")).toBeVisible();
        if (width === 1440 || width === 390) {
          await page.locator(".founder-grid").scrollIntoViewIfNeeded();
          await expect(page.locator(".founder-image").first()).toBeVisible();
          await page.waitForFunction(() => Array.from(document.querySelectorAll<HTMLImageElement>(".founder-image")).every(image => image.complete && image.naturalWidth > 0));
          await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
          await page.screenshot({ path: `.qa/${locale}-${theme}-${width}.png`, fullPage: true, animations: "disabled" });
          await page.locator(".hero").screenshot({ path: `.qa/hero-${locale}-${theme}-${width}.png`, animations: "disabled" });
        }
      }
      const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(accessibility.violations, JSON.stringify(accessibility.violations, null, 2)).toEqual([]);
    }
  }
  expect(await page.locator("video").count()).toBe(0);
  expect(await page.locator("img").evaluateAll(images => images.filter((image): image is HTMLImageElement => image instanceof HTMLImageElement && image.complete && image.naturalWidth === 0).map(image => image.src))).toEqual([]);
  expect(failedResponses).toEqual([]);
  expect(errors).toEqual([]);
});

test("gallery keyboard, pointer, detail focus trap and return focus", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/pt");
  const stage = page.locator(".project-stage");
  await stage.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".project-card[data-active=true]")).toContainText("Ler o clima");
  await page.keyboard.press("End");
  await expect(page.locator(".project-card[data-active=true]")).toContainText("Mais contexto");
  await page.getByRole("button", { name: "Próximo projeto", exact: true }).click();
  await expect(page.locator(".project-card[data-active=true]")).toContainText("Um novo jeito");
  const card = page.locator(".project-card[data-active=true] button");
  await card.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("O contexto", { exact: true })).toBeVisible();
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
  }
  const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(axe.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(card).toBeFocused();
  await stage.scrollIntoViewIfNeeded();
  const box = await stage.boundingBox();
  if (!box) throw new Error("Gallery stage missing");
  await page.mouse.move(box.x + box.width * .6, box.y + 130);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * .3, box.y + 130, { steps: 8 });
  await page.mouse.up();
  await expect(page.locator(".project-card[data-active=true]")).toContainText("Ler o clima");
  await expect(dialog).toHaveCount(0);
});

test("language persistence, theme persistence and contact destination", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/pt$/);
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page).toHaveTitle("Alevum — Digital product, design and engineering");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const contacts = page.locator('a[href^="mailto:"]');
  expect(await contacts.count()).toBeGreaterThan(0);
  for (const contact of await contacts.all()) await expect(contact).toHaveAttribute("href", /mailto:bruno\.frossard@sou\.inteli\.edu\.br\?subject=.+/);
  await page.getByRole("link", { name: "Mudar para português" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page).toHaveTitle("Alevum — Produto, design e engenharia digital");
});

test("mobile menu, founder reveals, service disclosure and reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  await page.goto("/pt");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const menu = page.getByRole("dialog");
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: /Nos conheça/ }).click();
  await expect(menu).toHaveCount(0);
  for (const name of ["Bruno Frossard", "Rafael Cabral"]) {
    const reveal = page.getByRole("button", { name: `Além do trabalho: ${name}` });
    await reveal.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("button", { name: `Voltar ao trabalho: ${name}` })).toHaveAttribute("aria-expanded", "true");
  }
  await page.locator(".service-item summary").first().click();
  await expect(page.locator(".service-detail").first()).toBeVisible();
  await page.getByRole("button", { name: /Engenharia/ }).click();
  await expect(page.locator(".canvas-art")).toHaveAttribute("data-phase", "2");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  expect(await page.locator("video").count()).toBe(0);
  const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(axe.violations).toEqual([]);
  await page.screenshot({ path: ".qa/mobile-reveals.png", fullPage: true });
});

test("all six projects on touch and generated SEO assets", async ({ browser, request }) => {
  const context = await browser.newContext({ baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000", viewport: { width: 360, height: 800 }, hasTouch: true, isMobile: true, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/pt");
  for (let index = 0; index < 6; index++) {
    await page.locator(".gallery-dots button").nth(index).tap();
    const card = page.locator(".project-card[data-active=true]");
    await expect(card.locator("img")).toBeVisible();
    await card.locator("button").tap();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("O que foi desenvolvido", { exact: true })).toBeVisible();
    await dialog.getByRole("button", { name: "Fechar", exact: true }).tap();
    await expect(dialog).toHaveCount(0);
    const caption = await card.boundingBox();
    const controls = await page.locator(".gallery-controls").boundingBox();
    if (!caption || !controls) throw new Error("Missing gallery geometry");
    expect(caption.y + caption.height).toBeLessThanOrEqual(controls.y);
  }
  await context.close();
  for (const path of ["/pt/opengraph-image", "/en/opengraph-image", "/apple-icon", "/icon.svg", "/robots.txt", "/sitemap.xml"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    if (path.includes("opengraph") || path === "/apple-icon") expect(response.headers()["content-type"]).toContain("image/png");
  }
});
