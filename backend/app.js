// Après l'installation du framework Express avec la ligne de commande "npm install express" on l'importe

const express = require("express");

// Creation de l'application app avec la méthode express()

const app = express();

/*********************MODULES COMPLÉMENTAIRES **********************/

// importation de morgan "http request logger"
const morgan = require("morgan");
// const mongoose = require("mongoose");

/************************** DATA BASE *****************************/

const mongoose = require("./db/db");

/*********************** CORS ****************************/

// app.use

// log des request et des response
app.use(morgan("dev"));

// route générale
app.use((req, res, next) => {
  console.log("requête numéro 1");
  next();
});

app.use((req, res, next) => {
  res.json({ message: "requête numéro 1 et 2 et 3 4" });
});

// exportation de app.js pour que les autres fichiers puissent y accéder

module.exports = app;
