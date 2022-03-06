import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, HostListener } from '@angular/core';

import { QuoteService } from '../quote.service';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.css'],
	encapsulation: ViewEncapsulation.None
})

export class SearchBarComponent implements OnInit {
	@Output() filterEvent = new EventEmitter<any>();
	@Input() authors!: string[];
	@Input() searchText!: string;

	constructor() { }

	title = 'virtual-quotes';
	isShow = false;
	topPosToStartShowing = 100;
	selectedAuthor: string = '';

	ngOnInit(): void { }

	@HostListener('window:scroll')
	checkScroll() {

		// window의 scroll top
		// Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

		const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

		if (scrollPosition >= this.topPosToStartShowing) {
			this.isShow = true;
			document.getElementById("bar")!.style.borderRadius = "0";
			document.getElementById("bar")!.style.height = "60px";
			document.getElementById("bar")!.style.borderStyle = "solid none solid none"
		} else {
			this.isShow = false;
			document.getElementById("bar")!.style.borderRadius = "100px";
			document.getElementById("bar")!.style.height = "55px";
			document.getElementById("bar")!.style.borderStyle = "solid"
		}
	}

	selectAuthor(author: string) {
		author !== 'All' ? this.selectedAuthor = author : this.selectedAuthor = '';
		this.filterQuote(this.selectedAuthor);
	}

	filterQuote(text: string = '', author?: string) {
		this.filterEvent.emit(text);
	}
}
