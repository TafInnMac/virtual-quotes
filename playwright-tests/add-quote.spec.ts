import { test, expect } from '@playwright/test';

import { QuotesPage } from './src/pages/QuotesPage';
import { NewQuoteForm } from './src/components/NewQuoteForm';
import { SearchBar } from './src/components/SearchBar';

let quotesPage, newQuoteForm;

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:4200', { waitUntil: "networkidle" });
});

test.describe('Open new quote form @addNewQuote', () => {
	let quotesPage;
	let newQuoteForm;

	test('Check "New Quote" form appears', async ({ page }) => {
		quotesPage = new QuotesPage(page);
		await quotesPage.addNewQuoteButton.click();
		newQuoteForm = new NewQuoteForm(page);

		await expect(newQuoteForm.form).toBeVisible();
	})
})

test.describe('Open new quote form @addNewQuote', () => {
	let testQuote, testAuthor, searchBar;

	test.beforeEach(async ({ page }) => {
		quotesPage = new QuotesPage(page);
		await quotesPage.addNewQuoteButton.click();
		newQuoteForm = new NewQuoteForm(page);

		testQuote = "testing quote";
		testAuthor = "test author";
		// Add new quote
		await newQuoteForm.quoteInputField.type(testQuote);
		await newQuoteForm.authorInputField.type(testAuthor);
		await newQuoteForm.addQuoteButton.click();
	});

	test('Check new quote appears on board', async ({ page }) => {
		quotesPage = new QuotesPage(page);
		await quotesPage.searchBar.filterByQuote(testQuote);

		const matchingQuotes = await quotesPage.quotesGrid.getQuotes('quote');
		const allQuotesMatch = await quotesPage.quotesGrid.doAllQuotesMatch(matchingQuotes, testQuote);
		searchBar = new SearchBar(page);
		await searchBar.authorFilter.click();
		const demo = await page.locator(`button[role="menuitem"]:has-text("${testQuote}")`);
		console.log(await demo.allInnerTexts());
		await expect(allQuotesMatch).toEqual(true);
	})
})
