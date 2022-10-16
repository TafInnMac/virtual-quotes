import { test, expect } from '@playwright/test';

import { QuotesPage } from './src/pages/QuotesPage';

test.describe('No quotes in DB @noQuotes', () => {
	let quotesPage;

	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:4200', { waitUntil: "networkidle" });
	});

	test('Check "No quotes found!" section is visible', async ({ page }) => {
		quotesPage = new QuotesPage(page);
		
		await expect(await quotesPage.noQuotesSection).toBeVisible();
	});
});
