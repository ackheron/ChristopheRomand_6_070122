// Importation du package HTTP node.js pour la création du serveur

const http = require("http");

// Importation du module dotenv pour utiliser les variables d'environnement écrites dans le  fichier .env dans le répertoire racine du dossier backend

const dotenv = require("dotenv");

// Appel du fichier app.js

const app = require("./app");

/************************** LE SERVEUR *******************************/

// Paramétrage du port avec la méthode set() de Express et utiliser process.env qui appelle la clé PORT qui retourne sa valeur définie dans votre fichier .env.

app.set("port", process.env.PORT);

const result = dotenv.config();
console.log(result);

// Méthode createServer() qui pour chaque requête appelle les fonctions du fichier app.js

const server = http.createServer(app);

// Écoute des requêtes par le serveur sur le port 3000

server.listen(process.env.PORT);
