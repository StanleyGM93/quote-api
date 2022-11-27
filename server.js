const express = require("express");
const app = express();

const { quotes } = require("./data");
// console.log(quotes);
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes", (req, res) => {
	res.send(quotes);
});

app.get("/api/quotes/random", (req, res) => {
	res.send(getRandomElement(quotes));
});

app.get("/api/quotes?person=enteredValue", (req, res) => {
	const personRequested = req.query.person;
	if (personRequested) {
		quotes.filter((quote) => quote.person === personRequested);
		res.send(quotes);
	} else {
		res.send([]);
	}
});

app.post("/api/quotes", (req, res) => {
	const quoteToAdd = req.query.quote;
	const authorOfQuote = req.query.person;
	if (quoteToAdd && authorOfQuote) {
		const quoteObject = {
			quote: quoteToAdd,
			person: authorOfQuote,
		};

		quotes.push(quoteObject);
		res.status(201).send(quoteObject);
	} else {
		res.status(400).send();
	}
});

app.listen(PORT, () => {
	console.log(`Listening on localhost:${PORT}`);
});
