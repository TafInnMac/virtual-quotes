import { Pipe, PipeTransform } from '@angular/core';

import { Quote } from './quote/quote.model';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
	/**
	 * Pipe filters the list of elements based on the search text provided
	 *
	 * @param quotes list of elements to search in
	 * @param searchText search string
	 * @returns list of elements filtered by search text or []
	 */
	transform(quotes: Quote[], searchText: string = '', authorFilter: string = ''): Quote[] {
		if (!quotes) {
			return [];
		}
		if ((!searchText || searchText === '')) {
			return quotes;
		}
		searchText = searchText.toLocaleLowerCase();

		return quotes.filter(match => {
			return match.quote.toLocaleLowerCase().includes(searchText) ||
				match.author.toLocaleLowerCase().includes(searchText);
		});
	}
}
