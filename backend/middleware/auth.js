// //multer pour gérer les uploads des images
// //middleware pour enregistrer les images qui arrive du frontend
// const multer = require("multer");

// //dictionnaire extension fichier image
// const MIME_TYPES = {
//   "image/jpg": "jpg",
//   "image/jpeg": "jpg",
//   "image/png": "png",
//   "image/gif": "gif",
// };

// //objet de configuration pour multer
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "images");
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(" ").join("_"); //éliminer les espaces et remplacer par underscore
//     console.log("--->middleware/multer-config CONTENU: name");
//     console.log(name);

//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, name + Date.now() + "." + extension); //création d'un nom de fichier unique
//     console.log("--->middleware/multer-config CONTENU: extension");
//     console.log(extension);
//   },
// });

// module.exports = multer({ storage }).single("image"); //.single pour un fichier unique

const jwt = require("jsonwebtoken");
//importation pour utilisation des variables d'environnements
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
console.log(result.parsed);

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
