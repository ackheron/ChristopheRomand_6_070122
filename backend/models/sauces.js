const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true }, // id de l'utilisateur qui crée la sauce
  name: { type: String, required: true },
  manufacturer: { type: String, required: true }, //fabricant de la sauce
  description: { type: String, required: true },
  mainPepper: { type: String, required: true }, // ingrédient principal
  imageUrl: { type: String, required: true },
  heat: { type: Number, default: 0 }, //nombre 1 à 10 décrivant la sauce
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] }, // Tableau des ID utilisateurs qui like la sauce
  usersDisliked: { type: [String] }, // Tableau des ID utilisateurs qui dislike la sauce
});

module.exports = mongoose.model("Sauce", sauceSchema);
