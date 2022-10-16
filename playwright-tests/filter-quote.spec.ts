import { test, expect } from '@playwright/test';

import { QuotesPage } from './src/pages/QuotesPage';

test.describe('Filter quotes @filterQuotes', () => {
	let quotesPage;

	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:4200', { waitUntil: "networkidle" });
	});

	test('Filter by quote text', async ({ page }) => {
		const searchText = "ipsum";
		quotesPage = new QuotesPage(page);
		await quotesPage.searchBar.filterByQuote(searchText);
		const matchingQuotes = await quotesPage.quotesGrid.getQuotes('quote');
		const allQuotesMatch = await quotesPage.quotesGrid.doAllQuotesMatch(matchingQuotes, searchText);
		
		await expect(allQuotesMatch).toEqual(true);
	})

	test('Filter by author', async ({ page }) => {
		const searchText = "Adam";
		quotesPage = new QuotesPage(page);
		await quotesPage.searchBar.filterByAuthor(searchText);
		const matchingQuotes = await quotesPage.quotesGrid.getQuotes('author');
		const allQuotesMatch = await quotesPage.quotesGrid.doAllQuotesMatch(matchingQuotes, searchText, 'author');
		
		await expect(allQuotesMatch).toEqual(true);
	})

	test('Filter by both quote text and author', async ({ page }) => {
		const searchText = ["Adam", "ullam"];
		quotesPage = new QuotesPage(page);
		await quotesPage.searchBar.filterByBoth(searchText);

		const matchingAuthors = await quotesPage.quotesGrid.getQuotes('author');
		const matchingQuoteText = await quotesPage.quotesGrid.getQuotes('quote');
		const allAuthorsMatch = await quotesPage.quotesGrid.doAllQuotesMatch(matchingAuthors, searchText[0], 'author');
		const allQuotesMatch = await quotesPage.quotesGrid.doAllQuotesMatch(matchingQuoteText, searchText[1]);
		
		await expect(allAuthorsMatch).toEqual(true);
		await expect(allQuotesMatch).toEqual(true);
	})

	test('Filter: No Matches', async ({ page }) => {
		const searchText = "No Matches";
		quotesPage = new QuotesPage(page);
		await quotesPage.searchBar.filterByQuote(searchText);
		
		const matchingQuotes = await quotesPage.quotesGrid.getQuotes('quote');
		const allQuotesMatch = await quotesPage.quotesGrid.doAllQuotesMatch(matchingQuotes, searchText);
		
		await expect(allQuotesMatch).toEqual(true);
	})
})
