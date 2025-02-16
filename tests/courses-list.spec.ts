import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("textbox", { name: "Название" }).click();
  await page
    .getByRole("textbox", { name: "Название" })
    .fill("какое-то название");
  await page.getByRole("textbox", { name: "Описание" }).click();
  await page.getByRole("textbox", { name: "Описание" }).fill("Описпние 1");
  await page.getByRole("button", { name: "Добавить" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^какое-то названиеОписпние 1Card ContentУдалить$/ })
    .getByRole("button", { name: "Удалить" })
    .last()
    .click();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^какое-то названиеОписпние 1Card ContentУдалить$/ })
      .last(),
  ).not.toBeVisible();
});
