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
	transform(quotes: Quote[], searchText: string = '', selectedAuthor: string = ''): Quote[] {
		let matchingQuotes: Quote[];
		searchText = searchText.toLocaleLowerCase();
		selectedAuthor = selectedAuthor.toLocaleLowerCase();

		if (!quotes) {
			return [];
		}
		if ((!searchText && !selectedAuthor)) {
			return quotes;
		}
		if (searchText !== '' && selectedAuthor !== '') {
			matchingQuotes = quotes.filter(match => {
				return match.quote.toLocaleLowerCase().includes(searchText) &&
					match.author.toLocaleLowerCase() === selectedAuthor;
			});
		} else if (searchText === '' && selectedAuthor !== '') {
			matchingQuotes = quotes.filter(match => {
				return match.author.toLocaleLowerCase() === selectedAuthor;
			});
		} else if (searchText !== '' && selectedAuthor === '') {
			matchingQuotes = quotes.filter(match => {
				return match.quote.toLocaleLowerCase().includes(searchText);
			});
		}

		return matchingQuotes;
	}
}
