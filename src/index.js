const {
  browseDirectory,
  validatePath,
  objectLinks,
  CreateObjectWithvalidateUrl,
  objectfitStat
} = require("./functions.js");

let response = {
    data: [],
    errors: ''
  }

function mdLinks(path = "", optionsUser = { validate: false, stats : '' }) {
//  const {validate, stats} = options
  return new Promise((resolve, reject) => {
    const pathAbsolute = validatePath(path);// función que verifica la ruta y la vuelve absoluta
    const readDirectory = browseDirectory(pathAbsolute); // función que retorna un array con los archivos md
    objectLinks(readDirectory) //leer directorios y traer los links
    .then((resolve) => {
      response.data = resolve;
    })
    .then (() => {
      if (optionsUser?.validate === "--validate" || optionsUser?.validate ==="--v") {
        
        CreateObjectWithvalidateUrl(response.data, optionsUser)
      
      } else if ((optionsUser?.validate !== ("--validate") || optionsUser?.validate !== ("--v")) && (optionsUser?.stats===("--stats") || optionsUser?.stats===("--s"))) {

        objectfitStat(response.data)
      
      }else {
        if (!response.errors) {
          console.log(response.data);
          resolve(response.data);
        } else {
          reject(response.errors);
        }
      }
    })
  });
}
/* mdLinks("./carpeta-prueba", { validate: "", stats: "--s" })
  .then((links) => links)
  .catch(console.error); */

module.exports = {
  mdLinks
}