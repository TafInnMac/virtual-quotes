import { Locator, Page } from '@playwright/test';

import { QuotesGrid } from '../components/QuotesGrid';
import { SearchBar } from '../components/SearchBar';

export class QuotesPage {
	readonly page: Page;
	readonly searchBar: SearchBar;
	readonly quotesGrid: QuotesGrid;
	readonly addNewQuoteButton: Locator;
	readonly noQuotesSection: Locator;

	constructor(page: Page) {
		this.page = page;
		this.searchBar = new SearchBar(page);
		this.quotesGrid = new QuotesGrid(page);
		this.addNewQuoteButton = page.locator('data-test-id=addQuoteBtn');
		this.noQuotesSection = page.locator('data-test-id=no-quotes');
	}
}