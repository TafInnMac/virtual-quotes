import { Locator, Page } from '@playwright/test';

import { QuoteBlock } from './QuoteBlock';

export class QuotesGrid {
	readonly page: Page;
	readonly quotesGrid: Locator;
	readonly authorFilter: Locator;
	readonly quoteBlock: QuoteBlock;

	constructor(page: Page) {
		this.page = page;
		this.quotesGrid = page.locator('data-test-id=quotes-grid');
		this.authorFilter = page.locator('data-test-id=authorFilterBtn');
		this.quoteBlock = new QuoteBlock(page);
	}

	async getQuotes(mode: string = "quote") {
		return await this.quoteBlock.getQuoteBlockComponent(mode);
	}

	async doAllQuotesMatch(quotes: string[], matchText: string, matchMode: string = 'quote') {
		if (matchMode === 'quote') {
			return quotes.every(quote => quote.toLowerCase().includes(matchText));
		} else {
			return quotes.every(quote => quote === matchText);
		}
	}
}