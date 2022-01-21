const jwt = require("jsonwebtoken");
//importation pour utilisation des variables d'environnements
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

module.exports = (req, res, next) => {
  try {
    //récupére le token dans le headers Authorization: Bearer token
    const token = req.headers.authorization.split(" ")[1]; //on récupére le 2eme élement du tableau qui est le token
    console.log("--->middleware/auth.js CONTENU: TOKEN");
    console.log(token);

    const decodedToken = jwt.verify(token, `${process.env.JWT_DECODEDTOKEN}`);
    console.log("--->middleware/auth.js CONTENU: decodedToken");
    console.log(decodedToken);

    //récupérer le userId qu'il y a à l'intérieur
    const userId = decodedToken.userId;
    console.log("--->middleware/auth.js CONTENU: userId");
    console.log(userId);
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable";
    } else {
      next(); //passer la requête au middleware suivant
    }
  } catch {
    res.status(401).json({ error: error | "Requête non authentifiée" });
  }
};
