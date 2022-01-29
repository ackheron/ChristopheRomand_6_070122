/************************************** DECLARATIONS ET IMPORTATIONS  ******************************************/

//importation d'express
const express = require("express");

// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application – on y enregistrez ensuite les routes individuelles.
const router = express.Router();

// Déclaration et importation du middleware password pour le contrôle mot de passe utilisateur
const password = require("../middleware/password");

// Déclaration et importation du controller userControllers
const userControllers = require("../controllers/userControllers");

/************************************** ROUTERS  ******************************************/

// Routes post l'enregistrement d'un nouvel utilisateur
router.post("/signup", password, userControllers.signup);

// Routes post pour la connection d'un utilisateur
router.post("/login", userControllers.login);

/************************************** EXPORTATION  ******************************************/
module.exports = router;
