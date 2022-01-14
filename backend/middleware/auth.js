//multer pour gérer les uploads des images
//middleware pour enregistrer les images qui arrive du frontend
const multer = require("multer");

//dictionnaire extension fichier image
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

//objet de configuration pour multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); //éliminer les espaces et remplacer par underscore
    console.log("--->middleware/multer-config CONTENU: name");
    console.log(name);

    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension); //création d'un nom de fichier unique
    console.log("--->middleware/multer-config CONTENU: extension");
    console.log(extension);
  },
});

module.exports = multer({ storage }).single("image"); //.single pour un fichier unique
