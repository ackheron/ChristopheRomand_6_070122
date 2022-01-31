// Déclaration et importation du package NPM jsonwebtoken
const jwt = require("jsonwebtoken");

// Déclaration et importation du package NPM mongoose-error
const mongooseError = require("mongoose-error");

//importation pour utilisation des variables d'environnements
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

module.exports = (req, res, next) => {
  try {
    //Récupération du token dans le headers Authorization: Bearer token

    const token = req.headers.authorization.split(" ")[1]; //on récupéré le 2eme élément du tableau qui est le token
    console.log("--->middleware/auth.js CONTENU: TOKEN");
    console.log(token);

    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`); // Fonction verify pour décoder notre token
    console.log("--->middleware/auth.js CONTENU: decodedToken");
    console.log(decodedToken);

    //récupérer le userId qu'il y a à l'intérieur du token déchiffré
    const userId = decodedToken.userId;
    console.log("--->middleware/auth.js CONTENU: userId");
    console.log(userId);

    if (req.body.userId && req.body.userId !== userId) {
      // si la demande contient un ID utilisateur, nous le comparons à celui extrait du token.
      throw "User ID non valable"; // Si il est différent "throw" passe le contrôle au prochain bloc catch (error)
    } else {
      next(); //Sinon on passe la requête au middleware suivant
    }
  } catch (error) {
    mongooseError(
      res.status(401).json({ error: error || "Requête non authentifiée" })
    );
  }
};
