const mongoose = require("mongoose");

//pour controller le mail, n'avoir qu'un seul mail dans la base de donnée, pas de doublon
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//pour qu'il ne soit pas possible d'enregistrer 2 fois la même adresse mail dans la base de donnée
userSchema.plugin(uniqueValidator); // on applique la méthode plugin pour controller le mail

module.exports = mongoose.model("User", userSchema);
