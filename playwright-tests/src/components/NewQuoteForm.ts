import { Locator, Page } from '@playwright/test';

export class NewQuoteForm {
	readonly page: Page;
	readonly form: Locator;
	readonly authorInputField: Locator;
	readonly quoteInputField: Locator;
	readonly addQuoteButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.form = page.locator('data-test-id=new-quote-form');
		this.authorInputField = page.locator('data-test-id=author-input-field');
		this.quoteInputField = page.locator('data-test-id=quote-input-field');
		this.addQuoteButton = page.locator('data-test-id=add-quote-button');
	}
}