const mongoose = require('mongoose');
const express = require('express');
const db = require('./models');
const path = require('path');

//local host port
const PORT = process.env.PORT || 3000;

const app = express();

//body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setting static file
app.use(express.static('public'));

//connection to the database
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost/workoutdb',
	{ useNewUrlParser: true },
	(error) => {
		if (!error) {
			console.log('awesome! we connected to the database.');
		} else {
			console.log('dun dun dunnn, something went wrong');
		}
	}
);

//requiring HTML & API Routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

//initiating port
app.listen(PORT, () => {
	console.log(`App running on ${PORT}!`);
});
