// Importation du package HTTP node.js pour la création du serveur

const http = require("http");

// Appel du fichier app.js

const app = require("./app");

/************************** LE SERVEUR *******************************/

// paramétrage du port avec la méthode set() de Express

app.set("port", 3000);

// Méthode createServer() qui pour chaque requête appelle les fonctions du fichier app.js

const server = http.createServer(app);

// Écoute des requêtes par le serveur sur le port 3000

server.listen(3000);
