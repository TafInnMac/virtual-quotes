import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";

import { Quote } from "./quote/quote.model";

@Injectable({ providedIn: 'root' })
export class QuoteService {
	constructor(private db: AngularFireDatabase) { }

	fetchQuotes() {
		const ref = this.db.list<Quote>("quotes");
		return ref.valueChanges();
	}

	postQuote(newQuote: Quote) {
		const ref = this.db.list<Quote>("quotes");
		ref.push(newQuote);
	}

	shuffleQuotes(quotes: Quote[]) {
		for (let i = quotes.length - 1; i > 0; i--) {
			// Pick a random index from 0 to i inclusive
			let j = Math.floor(Math.random() * (i + 1));

			// Swap arr[i] with the element
			// at random index
			[quotes[i], quotes[j]] = [quotes[j], quotes[i]];
		}
	}
}