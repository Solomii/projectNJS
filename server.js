require("dotenv").config();
const PORT = process.env.PORT || 5000;
require("./config/db").connect();
const express = require('express');
const app = express();

app.use(express.urlencoded({ extented: true }));
app.use(express.json());
// app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.render("index")
// })

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

app.get("*", (req, res) => {
  res.status(404).json({ message: "Wrong route!", error: true });
})

app.listen(PORT, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server started on :${PORT}`);
});