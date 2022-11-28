const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes", (req, res, next) => {
	res.send(quotes);
});

app.get("/api/quotes/random", (req, res, next) => {
	res.send(getRandomElement(quotes));
});

app.get("/api/quotes?person=author", (req, res, next) => {
	const personRequested = req.query.person;
	if (personRequested) {
		quotes.filter((quote) => quote.person === personRequested);
		res.send(req.query);
	} else {
		res.send([]);
	}
});

app.post("/api/quotes", (req, res, next) => {
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
