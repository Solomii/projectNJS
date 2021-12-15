require("dotenv").config();
require("./config/db").connect();
require("./lib/redis").connect();
const express = require('express');
const app = express();
const Url = require('./models/url');

app.use(express.urlencoded({ extented: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.use("/api/url", require('./routes/url'))
app.use('/api/url', require('./routes/url'));

app.use('/', async (req, res, next) => {
	const urls = await Url.find();
	res.render('index', {
		urls: urls
	});
	next()
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Wrong route!", error: true });
})

module.exports = {
	app
};