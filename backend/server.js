// Importation du package HTTP intégré qui permet à Node.js de transférer des données via le protocole HTTP (Hyper Text Transfer Protocol)

const http = require("http");

// Appel du fichier app.js

const app = require("./app");

// Importation du module dotenv pour utiliser les variables d'environnement écrites dans le  fichier .env dans le répertoire racine du dossier backend

const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

/************************** LE SERVEUR *******************************/

//normalizePort
// la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//set le port
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//errorHandler
// la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur ;
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//l'instance du serveur
const server = http.createServer(app); //retourne une nouvelle instance de http

// Écouteur d'évènements, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Écoute sur le " + bind);
});

server.listen(port);
