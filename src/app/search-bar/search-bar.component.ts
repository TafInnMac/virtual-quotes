import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, HostListener } from '@angular/core';

import { QuoteService } from '../quote.service';
import { Quote } from '../quote/quote.model';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.css'],
	encapsulation: ViewEncapsulation.None
})

// export class SearchBarComponent implements OnInit {
export class SearchBarComponent implements OnInit {
	@Output() filterEvent = new EventEmitter<any>();
	@Input() authors!: string[];
	@Input() searchText!: string;
	constructor(private quoteService: QuoteService) { }

	title = 'virtual-quotes';
	isShow = false;
	topPosToStartShowing = 100;
	selectedAuthor: string = '';
	// searchText = '';

	// authors: string[] = [];
	// uniqueAuthors: string[] = [];
	// loadedQuotes: Quote[] = [];

	ngOnInit(): void {
		// this.quoteService.fetchQuotes().subscribe(quotes => {
		// 	this.loadedQuotes = quotes;
		// 	this.authors = this.loadedQuotes.map(quote => { return quote.author });
		// 	// 	console.log(authorNames)
		// 	this.uniqueAuthors = this.authors.filter((a, b) => this.authors.indexOf(a) === b);
		// });
	}
	@HostListener('window:scroll')
	checkScroll() {

		// window의 scroll top
		// Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

		const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

		if (scrollPosition >= this.topPosToStartShowing) {
			this.isShow = true;
			// document.getElementById("a")!.style.borderRadius = "0";
			document.getElementById("bar")!.style.borderRadius = "0";
			document.getElementById("bar")!.style.height = "60px";
			document.getElementById("bar")!.style.borderStyle = "solid none solid none"
		} else {
			this.isShow = false;
			// document.getElementById("a")!.style.borderRadius = "5em 0 0 5em";
			document.getElementById("bar")!.style.borderRadius = "100px";
			document.getElementById("bar")!.style.height = "55px";
			document.getElementById("bar")!.style.borderStyle = "solid"
		}
		// (scrollPosition >= this.topPosToStartShowing) ? this.isShow = true : this.isShow = false;

	}

	// 	clickMenuItem(menuItem: MatMenuListItem){
	// 		console.log(menuItem);
	// 		this.selectedMenu = menuItem.menuLinkText;
	//    }

	selectAuthor(author: string) {
		author !== 'All' ? this.selectedAuthor = author : this.selectedAuthor = '';
		this.filterQuote(this.selectedAuthor);
	}

	filterQuote(text: string = '', author?: string) {
		this.filterEvent.emit(text);
		// console.log(text);
	  }
}
