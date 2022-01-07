// Importation du module dotenv pour utiliser les variables d'environnement écrites dans le  fichier .env dans le répertoire racine du dossier backend
const dotenv = require("dotenv");
const result = dotenv.config();

// Importation du module mongoose pour connection à la base de donnée mongoDB
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}.wxtv9.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// exportation de mongoose pour que les autres fichiers puissent y accéder

module.exports = mongoose;
