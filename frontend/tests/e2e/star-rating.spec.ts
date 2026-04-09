import { test, expect } from '@playwright/test';

/**
 * Product star rating E2E tests
 * Implements: frontend/tests/features/star-rating.feature
 *
 * Covers:
 * - Star buttons visible on every product card
 * - Clicking a star highlights it and shows confirmation text
 * - Rating persists across page reloads (localStorage)
 * - Star rating available inside the product detail modal
 */

test.describe('Product star rating', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
    await expect(page.locator('h1:has-text("Products")')).toBeVisible();
    // Wait for at least one product card to render
    await expect(page.locator('div[class*="grid"] h3').first()).toBeVisible();
  });

  test('Star rating buttons are visible on product cards', async ({ page }) => {
    // Find the first product card's star buttons
    const firstStars = page.locator('[data-testid^="star-"]').first();
    await expect(firstStars).toBeVisible();

    // There should be 5 stars per card; verify at least 5 exist in total
    const allStars = page.locator('[data-testid^="star-"]');
    const count = await allStars.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('Click a star to rate a product', async ({ page }) => {
    // Get the productId from the first card's star button data-testid
    const firstStar = page.locator('[data-testid^="star-"]').first();
    const testId = await firstStar.getAttribute('data-testid'); // e.g. "star-1-1"
    const productId = testId?.split('-')[1];

    // Click the 4th star on that product
    const fourthStar = page.locator(`[data-testid="star-${productId}-4"]`);
    await fourthStar.click();

    // The confirmation text should appear
    const confirmation = page.locator('text=/You rated this 4 stars/i').first();
    await expect(confirmation).toBeVisible();
  });

  test('Rating persists after page reload', async ({ page }) => {
    // Rate the first product 3 stars
    const firstStar = page.locator('[data-testid^="star-"]').first();
    const testId = await firstStar.getAttribute('data-testid');
    const productId = testId?.split('-')[1];

    await page.locator(`[data-testid="star-${productId}-3"]`).click();
    await expect(page.locator('text=/You rated this 3 stars/i').first()).toBeVisible();

    // Reload and verify the rating is still shown
    await page.reload();
    await expect(page.locator('h1:has-text("Products")')).toBeVisible();
    await expect(page.locator('div[class*="grid"] h3').first()).toBeVisible();

    await expect(page.locator('text=/You rated this 3 stars/i').first()).toBeVisible();
  });

  test('Star rating is available in the product detail modal', async ({ page }) => {
    // Click the product image to open the modal
    const productImage = page.locator('div[class*="cursor-pointer"]').first();
    await productImage.click();

    // Modal should be visible with "Your Rating:" label
    await expect(page.locator('text=Your Rating:').first()).toBeVisible();

    // Stars should be visible inside the modal
    const modalStars = page.locator('[role="dialog"] [data-testid^="star-"], .fixed [data-testid^="star-"]');
    const count = await modalStars.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });
});
