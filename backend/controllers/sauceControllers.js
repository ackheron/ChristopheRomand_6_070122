/************************************** DECLARATIONS ET IMPORTATIONS  ******************************************/

const Sauce = require("../models/sauces"); //modèle de la base de donnée schéma sauces
const fs = require("fs"); //Package pour accéder et interagir avec le système de fichiers

/************************************** LOGIQUE MÉTIER  ******************************************/

/***** Création d'un nouvelle sauce ******/

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);

  console.log();
  console.log(sauceObject);

  delete sauceObject._id; //

  const sauce = new Sauce({
    ...sauceObject, // opérateur spread ... pour faire une copie de tous les éléments de (req.body.sauce)
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, // Résolution de l'URL complète de l'image (protocol= HTTP, host= url, /image= endpoint, req.file.filename= nom du fichier)
  });

  //enregistrer l'objet dans la base de donné en appelant la méthode save
  sauce
    .save()
    .then(() =>
      res.status(201).json({
        message: "Sauce ajoutée à la base de donnée",
        contenu: req.body,
      })
    )
    .catch((error) => res.status(400).json({ error })); //équivalent de {error : error}
};

/***** Modification d'une sauce existante ******/

exports.modifySauce = (req, res, next) => {
  /* si on modifie le fichier image, récupérer le nom du fichier image sauce actuelle et suppression
  pour éviter d'avoir un fichier inutile dans le dossier images */

  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split("/images")[1];
        //suppression de l'image de la sauce car elle va être remplacer par la nouvelle image de sauce
        // On utilise la méthode unlink du package fs qui supprime un fichier ou un lien symbolique
        fs.unlink(`images/${filename}`, (err) => {
          if (err) throw err;
        });
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
  }

  //l'objet qui va être envoyé dans la base de donnée
  // Vérification si le user modifie l'image en regardant si le req.file existe et on traite la nouvelle image
  // s'il n'existe pas, on traite simplement l'objet entrant
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  //update dans la base de donnée
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  ) //2 arguments l'objet et la nouvelle version de l'objet
    .then(() => res.status(200).json({ message: "objet mise à jour" }))
    .catch(() => res.status(403).json({ message: "unauthorized request" }));
};

/*****  Récupérer toutes les sauces ******/

exports.getAllSauce = (req, res, next) => {
  //utilisation de la méthode find() pour avoir la liste complète
  Sauce.find()
    .then((lesSauces) => res.status(200).json(lesSauces))
    .catch((error) => res.status(400).json({ error }));
};

/*****  Récupérer une seule sauce ******/

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // nous utilisons l'ID que nous recevons en paramètres pour accéder à la Sauce correspondant dans la BDD

    .then((uneSauce) => res.status(200).json(uneSauce))
    .catch((error) => res.status(404).json({ error }));
};

/*****  Supprimer une sauce ******/

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // nous utilisons l'ID que nous recevons en paramètres pour accéder à la Sauce correspondant dans la BDD

    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1]; // On récupère avec la méthode split le nom ficher image dans l'URL

      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() =>
            res
              .status(200)
              .json({ message: `l'objet ${req.params.id} a été supprimé` })
          )
          .catch(() =>
            res.status(403).json({ message: "unauthorized request" })
          );
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
