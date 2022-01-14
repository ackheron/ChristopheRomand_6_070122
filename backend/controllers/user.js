//importations
const bcrypt = require("bcrypt"); //pour le hash du mot de passe dans la base de donnée
const User = require("../models/User"); //modèle de la base de donnée
const jwt = require("jsonwebtoken"); //le token d'authentification
const cryptojs = require("crypto-js"); //chiffrer déchiffrer l'email dans la base de donnée

//importation pour utilisation des variables d'environnements
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
console.log(result.parsed);

//SIGNUP pour enregistrer un nouvel utilisateur
exports.signup = (req, res, next) => {
  console.log("--->controllers/user.js CONTENU: req.body.password");
  console.log(req.body.password);

  //chiffrer l'email dans la base de donnée
  const emailCryptoJs = cryptojs
    .HmacSHA512(req.body.email, `${process.env.CRYPTOJS_RANDOM_SECRET_KEY}`)
    .toString();
  console.log("--->controllers user.js CONTENU: emailCryptoJs");
  console.log(emailCryptoJs);

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

//LOGIN pour controler la validité de l'utilisateur
exports.login = (req, res, next) => {
  const emailCryptoJs = cryptojs
    .HmacSHA512(req.body.email, `${process.env.CRYPTOJS_RANDOM_SECRET_KEY}`)
    .toString();

  //chercher le mail de l'utilisateur chiffré dans la base de donnée s'il existe
  User.findOne({ email: emailCryptoJs })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "utilisateur inexistant" });
      }
      //le user existe on utilise la méthode compare( ) de bcrypt pour comparer le mot de passe  envoyé par l'utilisateur
      //avec le hash qui est enregistré avec le user dans la base de donnée
      bcrypt
        .compare(req.body.password, user.password) //fonction asynchrone retourne une promise
        .then((valid) => {
          if (!valid) {
            //reçoit un booleean true ou false
            return res.status(401).json({ error: "mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              //3 arguments
              { userId: user._id }, //user id
              `${process.env.JWT_DECODEDTOKEN}`, //la clé de chiffrement du token
              { expiresIn: "24h" } //le temps de validité du token
            ),
          });
        })
        .catch((error) => res.status(500).json({ error })); //erreur serveur
    })
    .catch((error) => res.status(500).json({ error })); //erreur serveur
};
