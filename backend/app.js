// Après l'installation du framework Express avec la ligne de commande "npm install express" on l'importe

const express = require("express");

// Creation de l'application app avec la méthode express()

const app = express();

/************************** DATA BASE *****************************/
const mongoose = require("./db/db");

/*********************MODULES COMPLÉMENTAIRES **********************/

// importation de morgan "http request logger"
const morgan = require("morgan");

// log des request et des response
app.use(morgan("dev"));

// importation du module express-mongo-sanitize qui nettoie les données fournies par l'utilisateur pour empêcher des injections sql vers mongoDB
const mongoSanitize = require("express-mongo-sanitize");

// importation du module path qui fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires.
const path = require("path");

/*********************** Déclarations et importation des routes  ****************************/

const sauceRoutes = require("./routes/sauceRoute");
const userRoutes = require("./routes/userRoute");

/*********************** Cross Origin Resource Sharing ****************************/

// Le CORS est un système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents, ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles. Dans notre cas, nous avons deux origines : localhost:3000 pour la backend et localhost:8081 pour le frontend , et nous souhaiterions qu'elles puissent communiquer entre elles. Pour cela, nous devons ajouter des headers à notre objet  response

app.use((req, res, next) => {
  // Header qui permet à d'accéder à notre API depuis n'importe quelle origine ('*')
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Ajout des headers suivant aux requête envoyées vers notre API
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  // Envoyer les requêtes avec les méthodes (GET, POST, PUT ...)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

/******************************************************************************** */

//transformer le corps de la requête hTTP en objet javascript utilisable accessible par l'intermédiaire de red.body
app.use(express.json());

//protection injection sql qui remplace les caractères interdits "$" et "." par _
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

// Gestion static qui permet les requêtes des images du répertoire /images indiqué au module Path
app.use("/images", express.static(path.join(__dirname, "images")));

//Route générale "./routes/userRoute" pour l'authentification et création utilisateur
app.use("/api/auth", userRoutes);

//Route générale "./routes/sauceRoute.js" pour la création, la modification et suppression des sauces
app.use("/api/sauces", sauceRoutes);

// exportation de app.js pour que les autres fichiers puissent y accéder
module.exports = app;
