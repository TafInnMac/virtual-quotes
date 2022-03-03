import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { map } from "rxjs";

import { Quote } from "./quote/quote.model";

@Injectable({ providedIn: 'root' })
export class QuoteService {
	// loadedQuotes: Quote[] = [];

	constructor(private http: HttpClient, private db: AngularFireDatabase) { }

	// fetchQuotes(id: string = '') {
	// 	return this.http
	// 		.get<{ [key: string]: Quote }>(`https://quotes-board-f94ec.firebaseio.com/quotes.json/${id}`)
	// 		.pipe(
	// 			map(responseData => {
	// 				const quotesArray: Quote[] = [];
	// 				for (const key in responseData) {
	// 					if (responseData.hasOwnProperty(key)) {
	// 						quotesArray.push({ ...responseData[key], id: key });
	// 					}
	// 				}
	// 				console.log(quotesArray);
	// 				return quotesArray;
	// 			})
	// 		)
	// }

	fetchQuotes() {
		const ref = this.db.list<Quote>("quotes");
		return ref.valueChanges();
	}

	postQuote(newQuote: Quote) {
		const ref = this.db.list<Quote>("quotes");
		ref.push(newQuote);
		
	}

	// addQuote(newQuote: Quote) {
	// 	// this.quotes.unshift(newQuote);
	// 	return this.http
	// 		.post<{ name: string }>('https://quotes-board-f94ec.firebaseio.com/quotes.json', newQuote)
	// 		// .pipe(
	// 		// 	map(responseData => {
	// 		// 		// const quotesArray: Quote[] = [];
	// 		// 		// for (const key in responseData) {
	// 		// 		// 	if (responseData.hasOwnProperty(key)) {
	// 		// 		// 		console.log(key);
	// 		// 		// 	}
	// 		// 		// }
	// 		// 		console.log(responseData.name);
	// 		// 		return responseData.name;
	// 		// 	})
	// 		// )
	// 		.subscribe(responseData => {
	// 			// this.fetchQuotes(responseData.name);
	// 			console.log(responseData.name)
	// 		})
	// }
	// getAuthorNames() {
	// 	let authorNames: string[] = [];
	// 	authorNames = this.loadedQuotes.map(quote => { return quote.author });
	// 	console.log(authorNames)
	// 	return authorNames.filter((a, b) => authorNames.indexOf(a) === b);
	// }
}