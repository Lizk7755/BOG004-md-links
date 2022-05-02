const { fstat } = require('fs');
const path = require('path');
const fs = require('fs');
const userPath = process.argv[2];

// function validateUrl(url) {
//   return new Promise((resolve, reject) => {
//     https.get(url, res =>  resolve(res))
//       .on('error', e => reject(false));
//   });
// }

const validatePath = (pathUser) => {
  if(path.isAbsolute(pathUser)){
    console.log('lo toma como absoluto; ', pathUser);
    return pathUser;
  }else{
  const pathAbsolute = path.resolve(pathUser).normalize();
  return pathAbsolute;
  }
}

let resultValidate = validatePath(userPath)
// guardar en una const el resultado de la funcion validatePath


const browseDirectory = (pathUser) => {
  let filesPath = [];
  if(fs.statSync(pathUser).isFile() && path.extname(pathUser) === '.md'){
    filesPath.push(pathUser);
  }else{
    if(fs.statSync(pathUser).isDirectory()){
      const directory = pathUser;
      let contentDirectory = fs.readdirSync(directory)
        contentDirectory.forEach(el => {
          browseDirectory(pathUser + '\\' + el).forEach(el => {
            filesPath.push(el);
          })
        })
    }
  }
  return filesPath;
};

const resultFilesPath = browseDirectory(resultValidate);

function getLinks (resultFilesPath) {
  let urls = []; // Almacena las urls encontradas en los archivos MD.
  let urlsObject = []; // Almacena los objetos creados por cada url.
  let paths = []; // Almacena la ruta de cada url encontrada.
  
  resultFilesPath.forEach(fileMD => {
    // const readFile = fs.promises.readFile(fileMD, 'utf-8'); // con esta opción recibimos promise pending...
    const readFile = fs.readFileSync(fileMD, 'utf-8'); // Este método no se puede usar... pero funciona!
    
    const linkRegExp = /!*\[(.+?)\]\((.+?)\)/gi;

    const urlsFound = [... readFile.matchAll(linkRegExp)]; // busca las coincidencias entre los archivos que estamos evaluando con la expresión regular.
    urlsFound.forEach(url => {
      urls.push(url); // Almacenamos en el array urls las coincidencias.
      paths.push(fileMD); // Almacenamos en el array la ruta donde encontramos la url.
    });

    urls.forEach(url => {
      let index = urls.indexOf(url); // identifica posición de la url en el array.
      const closingB = url[0].indexOf(']');
      let enclosedUrl = url[0].slice(closingB + 1);
      const opening = enclosedUrl.indexOf('(');
      const closing = enclosedUrl.indexOf(')');
      let urlOnly = enclosedUrl.slice(opening + 1, closing); //extrae sólo el link

      if(url.includes(' ')){
        url = url.slice(0, (url.indexOf(' '))); //si este contiene otro texto además de la url, lo elimina
      }

      let descriptionLink = url[1];
      if(url[1].length >= 50){
        descriptionLink = url[1].slice(0, 50); // si la longitud del texto es mayor a 50 caracteres, los elimina
      }

      urlsObject.push({
        href: urlOnly,
        text: descriptionLink,
        file: paths[index],
      });
  });
})
return console.log('este es mi objeto: ', urlsObject); 

}


getLinks(resultFilesPath);
// ​
module.exports = {
    // validateUrl,
    browseDirectory,
    validatePath,
}