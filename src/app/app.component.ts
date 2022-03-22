import { Component, HostListener, OnInit, Input } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { MatDialog } from '@angular/material/dialog';

import { Quote } from './quote/quote.model';
import { QuoteService } from './quote.service';
import { NewQuoteDialogComponent } from './new-quote-dialog/new-quote-dialog.component';

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

	constructor(private quoteService: QuoteService, private filterPipe: FilterPipe, public dialog: MatDialog) { }

	ngOnInit(): void {
		this.isFetching = true;
		this.quoteService.fetchQuotes().subscribe(quotes => {
			this.isFetching = false;
			this.quoteService.shuffleQuotes(quotes);
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

		if (scrollPosition >= this.topPosToStartShowing) {
			this.isShow = true;
			document.getElementById('search')!.style.boxShadow = '0px 0.1px 10px #787878';
			this.normalFlex = "100";
			this.ltMdFlex = "100";
		} else {
			this.isShow = false;
			document.getElementById('search')!.style.boxShadow = '';
			this.normalFlex = "80";
			this.ltMdFlex = "95";
		}
	}

	// TODO: Cross browsing
	gotoTop() {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}

	filterQuotes(filterEvent: string[]) {
		this.quotesCopy = this.filterPipe.transform(this.loadedQuotes, filterEvent[0], filterEvent[1]);
	}

	openDialog() {
		this.dialog.open(NewQuoteDialogComponent, {
			width: '600px',
			height: '355px',
			data: this.authorsCopy
		});
	}
}