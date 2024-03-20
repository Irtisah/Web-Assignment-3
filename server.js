/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: _Irtisah Malik_____________________ Student ID: _154200224_____________ Date: _19 March 2024_____________
*
********************************************************************************/

const legoData = require("./modules/legoSets");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/lego/sets", (req, res) => {
  const theme = req.query.theme;
  if (theme) {
    legoData.getSetsByTheme(theme)
      .then(setsByTheme => res.json(setsByTheme))
      .catch(error => res.status(404).send(error.message));
  } else {
    legoData.getAllSets()
      .then(allSets => res.json(allSets))
      .catch(error => res.status(500).send(error.message));
  }
});

app.get("/lego/sets/:id", (req, res) => {
  const setId = req.params.id;
  legoData.getSetByNum(setId)
    .then(setByNum => res.json(setByNum))
    .catch(error => res.status(404).send(error.message));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

legoData.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  })
  .catch(error => console.error("Initialization cannot be completed:", error.message));

module.exports = app;

