import { Quote } from 'src/app/quote/quote.model';
import { faker } from '@faker-js/faker';
import { existsSync, readFileSync, writeFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';
import { getDatabase, ref, set } from "firebase/database";

import { NameType, QuoteType } from './types';

const QUOTES: Quote[] = [];
const DB = {
	quotes: {}
};

const createRandomQuotes = (numOfQuotes: number = 1, nameType: NameType = "FirstName", quoteType: QuoteType = "Sentence"): {} => {
	if (numOfQuotes === 0) {
		return DB;
	} else {
		for (let i = 0; i < numOfQuotes; i++) {
			const testQuote: Quote = {
				author: nameType === 'FirstName' ? faker.name.firstName() : faker.name.findName(),
				quote: quoteType === 'Sentence' ? faker.lorem.sentence() : faker.lorem.paragraph()
			};
			DB.quotes[i] = testQuote;
		}
		return DB;
	}
}

const writeUserData = (quotes: {}) => {
	const db = getDatabase();
	set(ref(db), quotes);
}

// ✅ write to file ASYNCHRONOUSLY
const seedDatabase = async (numOfQuotes: number) => {
	/**
	 * flags:
	 *  - w = Open file for reading and writing. File is created if not exists
	 *  - a+ = Open file for reading and appending. The file is created if not exists
	 */
	const dbQuotes = createRandomQuotes(numOfQuotes);
	try {
		if (existsSync(join(__dirname, "../db", `${numOfQuotes}-quotes.json`))) {
			// console.warn("DB already exists...");
			// writeUserData(dbQuotes);
			return console.log("No new DB has been created");
		} else {
			await fsPromises.writeFile(join(__dirname, "../db", `${numOfQuotes}-quotes.json`), JSON.stringify(dbQuotes, null, 4), {
				flag: 'w',
			});

			// const contents = await fsPromises.readFile(
			// 	join(__dirname, '../db', filename),
			// 	'utf-8',
			// );
			// //   console.log(contents); // 👉️ "One Two Three Four"
			writeUserData(dbQuotes);
			// return contents;
			return console.log(`New DB created in '${join(__dirname, "../db", `${numOfQuotes}-quotes.json`)}'`);
		}
	} catch (err) {
		console.log(err);
		return 'Something went wrong';
	}
};

export default seedDatabase;
