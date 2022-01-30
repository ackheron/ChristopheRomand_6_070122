/************************************** DECLARATIONS ET IMPORTATIONS  ******************************************/

const bcrypt = require("bcrypt"); // Déclaration et importation du package bcrypt pour le hash du mot de passe dans la base de donnée
const User = require("../models/user"); //modèle de la base de donnée schéma utilisateurs
const jwt = require("jsonwebtoken"); // Déclaration et importation du package jsonwebtoken, le token d'authentification
const cryptojs = require("crypto-js"); //Déclaration et importation du package crypto-js pour chiffrer déchiffrer l'email dans la base de donnée

//importation pour utilisation des variables d'environnements
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

/************************************** CONTROLLERS ******************************************/

//SIGNUP pour enregistrer un nouvel utilisateur
exports.signup = (req, res, next) => {
  //chiffrer l'email dans la base de donnée
  const emailCryptoJs = cryptojs
    .HmacSHA512(req.body.email, `${process.env.CRYPTOJS_EMAIL_KEY}`)
    .toString();

  //hasher le mot de passe
  bcrypt
    .hash(req.body.password, 10) //salt = 10 -> combien de fois sera exécuté l'algorithme de hashage
    .then((hash) => {
      //ce qui va être enregistré dans mongoDB
      const user = new User({
        email: emailCryptoJs,
        password: hash,
      });
      //l'enregistrer dans la base de donnée
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Utilisateur créé et sauvegardé" })
        )
        .catch((error) => res.status(400).json({ error }).send());
    })
    .catch((error) => res.status(500).json({ error }).send(console.log(error)));
};

//LOGIN pour controller la validité de l'utilisateur
exports.login = (req, res, next) => {
  const emailCryptoJs = cryptojs
    .HmacSHA512(req.body.email, `${process.env.CRYPTOJS_EMAIL_KEY}`)
    .toString();

  //chercher le mail de l'utilisateur chiffré dans la base de donnée s'il existe
  User.findOne({ email: emailCryptoJs })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur inexistant" });
      }
      //le user existe on utilise la méthode compare( ) de bcrypt pour comparer le mot de passe  envoyé par l'utilisateur
      //avec le hash qui est enregistré avec le user dans la base de donnée
      bcrypt
        .compare(req.body.password, user.password) //fonction asynchrone retourne une promise
        .then((valid) => {
          if (!valid) {
            //reçoit un booleean true ou false
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              //3 arguments
              { userId: user._id }, //user id
              `${process.env.JWT_KEY_TOKEN}`, //la clé de chiffrement du token
              { expiresIn: "24h" } //le temps de validité du token
            ),
          });
        })
        .catch((error) => res.status(500).json({ error })); //erreur serveur
    })
    .catch((error) => res.status(500).json({ error })); //erreur serveur
};
