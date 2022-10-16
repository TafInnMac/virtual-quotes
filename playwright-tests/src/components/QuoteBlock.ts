import {Locator, Page } from '@playwright/test';

export class QuoteBlock {
	readonly page: Page;
	readonly quote: Locator;
	readonly author: Locator;

	constructor(page: Page) {
		this.page = page;
		this.quote = page.locator('data-test-id=quote');
		this.author = page.locator('data-test-id=author');
	}

	async getQuoteBlockComponent(component: string = "quote") {
		if (component === "quote") {
			return await this.quote.allInnerTexts();
		} else {
			const authors = await this.author.allInnerTexts();
			return authors.map(author => author.replace("- ", ""));
		}
	}
}