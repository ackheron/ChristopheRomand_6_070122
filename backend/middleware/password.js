// Déclaration et importation du package NPM password_validator
const passwordValidator = require("password-validator");

//création du schema
let passwordSchema = new passwordValidator();

//le schéma impose plusieurs conditions de validation pour le mot de passe
passwordSchema
  .is()
  .min(8) // Une longueur minimum de 8 caractères
  .is()
  .max(25) // Une longueur maximum de 25 caractères
  .has()
  .uppercase() // Doit avoir des lettres majuscules
  .has()
  .lowercase() // Doit avoir des lettres minuscules
  .has()
  .digits(2) // Doit avoir au moins 2 chiffres
  .has()
  .not()
  .spaces() // Ne doit pas comporter d'espaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

//Vérification de la qualité du password par rapport au schema
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    return res.status(403).json({
      error:
        "Le mot de passe n'est pas assez fort, 8 caractères min 25 max, au moins 2 chiffres, des majuscules et minuscules : " +
        passwordSchema.validate(req.body.password, { list: true }),
    });
  } else {
    next();
  }
};
