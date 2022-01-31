// Déclaration et importation du package NPM Multer
const multer = require("multer");

// Objet indiquant la nature et le format d'un document et le relier à une extension de fichier
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "wbp",
  "image/gif": "gif",
};

/********************   MIDDLEWARE   ***********************/

// constante storage qui contient la fonction .diskStorage passer à multer pour lui indiquer où enregistrer les fichiers entrants
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "images"); // la fonction destination indique d'enregistrer les fichiers dans le dossier images
  },
  filename: (request, file, callback) => {
    // La fonction filename indique une instruction pour changer le nom du fichier
    const name = "sauce" + Date.now(); // Modification du nom
    const extension = MIME_TYPES[file.mimetype]; // Assignation d'une extension

    callback(null, name + "." + extension);
  },
});

/********************   EXPORTATION   ***********************/
// Nous exportons ensuite l'élément multer entièrement configuré, lui passons notre constante storage

module.exports = multer({ storage: storage }).single("image"); // LA méthode single()  crée un middleware qui capture les fichiers d'un certain type (passé en argument), et les enregistre au système de fichiers du serveur à l'aide du storage configuré
