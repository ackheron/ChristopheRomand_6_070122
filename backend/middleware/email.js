// Déclaration et importation du package NPM mongoose-error
const mongooseError = require("mongoose-error");

//Vérification de la validité de l'adresse mail par rapport l'expression régulière
module.exports = (req, res, next) => {
  let email = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,5}[ ]{0,2}$",
    "g"
  );
  let testEmail = email.test(req.body.email);

  if (!testEmail) {
    return mongooseError(
      res.status(403).json({
        message:
          "Erreur: L'adresse e-mail n'est pas conforme ex: contact@adresse.com !",
      })
    );
  } else {
    next();
  }
};
