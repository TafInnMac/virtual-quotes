import { Locator, Page } from '@playwright/test';

export class SearchBar {
	readonly page: Page;
	readonly quoteFilter: Locator;
	readonly authorFilter: Locator;

	constructor(page: Page) {
		this.page = page;
		this.quoteFilter = page.locator('data-test-id=quoteFilter');
		this.authorFilter = page.locator('data-test-id=authorFilterBtn');
	}

	async filterByQuote(quote: string) {
		await this.quoteFilter.type(quote);
	}
	
	async filterByAuthor(author: string) {
		await this.authorFilter.click();
		await this.page.locator(`button[role="menuitem"]:has-text("${author}")`).click();
	}
	
	async filterByBoth(filters: string []) {
		await this.authorFilter.click();
		await this.page.locator(`button[role="menuitem"]:has-text("${filters[0]}")`).click();
		await this.quoteFilter.type(filters[1]);
	}
}