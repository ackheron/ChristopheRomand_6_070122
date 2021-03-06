/************************************** DECLARATIONS ET IMPORTATIONS  ******************************************/

//importation d'express
const express = require("express");

// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application – on y enregistrez ensuite les routes individuelles.
const router = express.Router();

// Déclaration et importation du middleware password pour le contrôle mot de passe utilisateur
const password = require("../middleware/password");

// Déclaration et importation du middleware email pour le contrôle de la validité de l'adresse mail
const mail = require("../middleware/email");

// Déclaration et importation du controller userControllers
const userControllers = require("../controllers/userControllers");

/************************************** ROUTERS  ******************************************/

// Routes post pour l'enregistrement d'un nouvel utilisateur, (endpoint) /signup
router.post("/signup", mail, password, userControllers.signup);

// Routes post pour la connection d'un utilisateur, (endpoint) /login
router.post("/login", userControllers.login);

/************************************** EXPORTATION  ******************************************/
module.exports = router;
