import { Component, OnInit, Input } from '@angular/core';

import { QuoteService } from '../quote.service';
import { Quote } from './quote.model';

@Component({
	selector: 'app-quote',
	templateUrl: './quote.component.html',
	styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

	@Input() quote!: Quote;
	constructor(private quoteService: QuoteService) { }

	ngOnInit(): void {
	}

}
