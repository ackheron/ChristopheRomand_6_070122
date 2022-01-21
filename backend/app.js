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
const mongoSanitize = require("express-mongo-sanitize");
const mongoose = require("./db/db");
const bodyParser = require("body-parser");
const sauceRoutes = require("./routes/sauceRoute"); // - 05 -
const userRoutes = require("./routes/userRoute"); // - 06 -
const path = require("path");
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

//transformer le corps (le body)en json objet javascript utilisable
app.use(bodyParser.json());

//protection injection sql
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

// Gestion des static (images)
app.use("/images", express.static(path.join(__dirname, "images")));

//l'authentification
app.use("/api/auth", userRoutes);

//les sauces
app.use("/api/sauces", sauceRoutes);
// exportation de app.js pour que les autres fichiers puissent y accéder

module.exports = app;
