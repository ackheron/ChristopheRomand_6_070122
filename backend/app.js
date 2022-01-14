// Après l'installation du framework Express avec la ligne de commande "npm install express" on l'importe

const express = require("express");

// Creation de l'application app avec la méthode express()

const app = express();

/*********************MODULES COMPLÉMENTAIRES **********************/

// importation de morgan "http request logger"
const morgan = require("morgan");

// log des request et des response
app.use(morgan("dev"));
/************************** DATA BASE *****************************/

const mongoose = require("./db/db");

/*********************** CORS ****************************/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// exportation de app.js pour que les autres fichiers puissent y accéder

module.exports = app;
