require("dotenv").config();
const PORT = process.env.PORT || 3000;
require("./config/db").connect();
require("./lib/redis").connect();
const express = require('express');
const app = express();
const Url = require('./models/url');

app.use(express.urlencoded({ extented: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.use("/", require('./routes/url'))
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

app.listen(PORT, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server started on :${PORT}`);
});

module.exports = {
	app
};