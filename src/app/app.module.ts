import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { QuoteComponent } from './quote/quote.component';
import { QuotesGridComponent } from './quotes-grid/quotes-grid.component';
import { FilterPipe } from './filter.pipe';
import { NewQuoteDialogComponent } from './new-quote-dialog/new-quote-dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SearchBarComponent,
		QuoteComponent,
		QuotesGridComponent,
		FilterPipe,
		NewQuoteDialogComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		MatToolbarModule,
		MatIconModule,
		MatTabsModule,
		MatInputModule,
		MatButtonModule,
		MatMenuModule,
		MatGridListModule,
		MatCardModule,
		MatDialogModule,
		MatTableModule,
		MatTooltipModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatProgressSpinnerModule,
		AngularFireModule.initializeApp(environment.firebaseConfig, 'quotesBoard'),
		AngularFireDatabaseModule,
		MatSnackBarModule
	],
	providers: [FilterPipe,  {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}],
	bootstrap: [AppComponent],
})
export class AppModule { }
