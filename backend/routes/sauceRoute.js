//importation
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sauceControllers = require("../controllers/sauceControllers");
const likeControllers = require("../controllers/like");

//Route POST pour créer une sauce
router.post("/", auth, multer, sauceControllers.createSauce);

router.put("/:id", auth, multer, sauceControllers.modifySauce);

router.delete("/:id", auth, sauceControllers.deleteSauce);

router.get("/", auth, sauceControllers.getAllSauce);

router.get("/:id", auth, sauceControllers.getOneSauce);

router.post("/:id/like", auth, likeControllers.likeSauce);

//exportation
module.exports = router;
