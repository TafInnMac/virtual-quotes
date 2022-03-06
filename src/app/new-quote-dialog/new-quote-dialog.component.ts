import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Quote } from '../quote/quote.model';
import { QuoteService } from '../quote.service';

@Component({
	selector: 'app-new-quote-dialog',
	templateUrl: './new-quote-dialog.component.html',
	styleUrls: ['./new-quote-dialog.component.css']
})
export class NewQuoteDialogComponent implements OnInit {

	quoteForm!: FormGroup;
	filteredAuthors!: Observable<string[]>;

	myControl = new FormControl();
	newQuote: Quote = {
		quote: '',
		author: '',
	}

	constructor(private dialogef: MatDialogRef<NewQuoteDialogComponent>, private quoteService: QuoteService, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: string[]) { }

	ngOnInit(): void {
		this.quoteForm = new FormGroup({
			'quote': new FormControl(null, Validators.required),
			'author': new FormControl(null, Validators.required)
		});
		
		this.filteredAuthors = this.quoteForm.controls['author'].valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value))
		);
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.data.filter(option => option.toLowerCase().includes(filterValue));
	}

	onAddQuote() {
		this.newQuote.quote = this.quoteForm.value.quote;
		this.newQuote.author = this.quoteForm.value.author;
		this.quoteService.postQuote(this.newQuote);
		this.dialogef.close();
	};

	openSnackBar(author: string) {
		this._snackBar.open(`New quote from ${author.toUpperCase()} has been added!`);
	}

}
