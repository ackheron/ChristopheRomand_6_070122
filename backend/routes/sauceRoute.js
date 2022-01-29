/************************************** DECLARATIONS ET IMPORTATIONS  ******************************************/

//importation d'express
const express = require("express");

// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application – on y enregistrez ensuite les routes individuelles.
const router = express.Router();

// Déclaration et importation du middleware auth qui permet l'authentification par token
const auth = require("../middleware/auth");

// Déclaration et importation du middleware multer-config qui permet ici l'upload de fichiers images dans le dossier /images
const multer = require("../middleware/multer-config");

// Déclaration et importation du controller sauceControllers et sa logique métier
const sauceControllers = require("../controllers/sauceControllers");

// Déclaration et importation du controller like et sa logique métier
const likeControllers = require("../controllers/like");

/************************************** ROUTERS  ******************************************/

//Les routes POST pour créer une sauce
router.post("/", auth, multer, sauceControllers.createSauce);

//Les routes POST pour modifier une sauce
router.put("/:id", auth, multer, sauceControllers.modifySauce);

//Les routes POST pour supprimer une sauce
router.delete("/:id", auth, sauceControllers.deleteSauce);

//Les routes GET pour l'affichage de toutes les sauces
router.get("/", auth, sauceControllers.getAllSauce);

//Les routes GET pour l'affichage d'une seule sauce
router.get("/:id", auth, sauceControllers.getOneSauce);

//Les routes POST pour la gestion des likes
router.post("/:id/like", auth, likeControllers.likeSauce);

/************************************** EXPORTATION  ******************************************/
module.exports = router;
