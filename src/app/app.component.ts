import { Component, HostListener, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import { MatDialog } from '@angular/material/dialog';

import { Quote } from './quote/quote.model';
import { QuoteService } from './quote.service';
import { NewQuoteDialogComponent } from './new-quote-dialog/new-quote-dialog.component';
// import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'virtual-quotes';
	isShow = false;
	topPosToStartShowing = 100;

	loadedQuotes: Quote[] = [];
	quotesCopy: Quote[] = [];
	authors: string[] = [];
	authorsCopy: string[] = [];
	searchText: string = '';

	normalFlex = "80";
	ltMdFlex = "95";

	isFetching = false;

	constructor(private http: HttpClient, private quoteService: QuoteService, private filterPipe: FilterPipe, public dialog: MatDialog) { }

	ngOnInit(): void {
		this.isFetching = true;
		this.quoteService.fetchQuotes().subscribe(quotes => {
			this.isFetching = false;
			this.loadedQuotes = quotes;
			this.quotesCopy = this.loadedQuotes;
			let allAuthors: string[] = this.loadedQuotes.map(quote => { return quote.author });
			this.authors = allAuthors.filter((a, b) => allAuthors.indexOf(a) === b).sort();
			this.authors.unshift('All');
			this.authorsCopy = this.authors;	
		})

	}

	@HostListener('window:scroll')
	checkScroll() {
		// window의 scroll top
		// Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

		const scrollPosition =
			window.pageYOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop ||
			0;

		// console.log('[scroll]', scrollPosition);

		if (scrollPosition >= this.topPosToStartShowing) {
			this.isShow = true;
			// document.getElementById('search')!.style.margin = '0';
			document.getElementById('search')!.style.boxShadow = '0px 0.1px 10px #787878';
			this.normalFlex = "100";
			this.ltMdFlex = "100";

			//   document.getElementById('search')!.style.position = 'fixed';
			//   document.getElementById('search')!.setAttribute('fxFlex', '100');
			//   document.getElementById('search')!.setAttribute('fxFlex.lt-md', '100');
			
			//   document.getElementsByTagName('app-search-bar')[0]
			//   document.getElementsByTagName('app-search-bar')[0].setAttribute('ng-reflect-fx-flex.lt-md', '100');
			//   document.getElementsByTagName('app-search-bar')[0].setAttribute('ng-reflect-fx-flex', '100');
			//   document.getElementsByTagName('app-search-bar')[0].setAttribute('ng-reflect-fx-flex.lt-md', '100');
			//   document.getElementsByTagName('app-search-bar')[0].setAttribute('fxFlex', '100');
			//   document.getElementsByTagName('app-search-bar')[0].setAttribute('fxFlex.lt-md', '100');
			} else {
				this.isShow = false;
				// document.getElementById('search')!.style.margin = '0 150px';
				document.getElementById('search')!.style.boxShadow = '';
				this.normalFlex = "80";
				this.ltMdFlex = "95";

				// document.getElementById('search')!.style.position = '';
				// document.getElementById('search')!.style.width = '';
				// document.getElementById('search')!.setAttribute('fxFlex', '80');
				// document.getElementById('search')!.setAttribute('fxFlex.lt-md', '95');

				// document.getElementsByTagName('app-search-bar')[0].setAttribute('fxFlex', '80');
				// document.getElementsByTagName('app-search-bar')[0].setAttribute('fxFlex.lt-md', '95');
		}
		// (scrollPosition >= this.topPosToStartShowing) ? this.isShow = true : this.isShow = false;
	}

	// TODO: Cross browsing
	gotoTop() {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}

	filterQuotes(text: string) {
		// this.items.push(newItem);
		this.quotesCopy = this.filterPipe.transform(this.loadedQuotes, text);
		// console.log(text);
		// console.log(this.loadedQuotes);
		// let copyOfQuotes: Quote[];
		//  this.copyOfQuotes = this.loadedQuotes.filter(match => {
		// 	return match.quote.toLocaleLowerCase().includes(text) ||
		// 		match.author.toLocaleLowerCase().includes(text);
		// });
		// console.log(this.copyOfQuotes);
	}

	openDialog() {
		this.dialog.open(NewQuoteDialogComponent, {
		  width: '600px',
		  height: '350px',
		  data: this.authorsCopy
		});
	  }
}