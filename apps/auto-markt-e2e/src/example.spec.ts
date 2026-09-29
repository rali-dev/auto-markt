import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // toHaveText liest textContent, nicht innerText. Das h1 hat die Klasse
  // `uppercase`, innerText wuerde deshalb "AUTO MARKT" liefern.
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    /Auto\s+Markt/,
  );
});
