const { fstat } = require('fs');
const path = require('path');
const fs = require('fs');
const userPath = process.argv;
// function validateUrl(url) {
//   return new Promise((resolve, reject) => {
//     https.get(url, res =>  resolve(res))
//       .on('error', e => reject(false));
//   });
// }
// ​
// function getObject(contentMdFile = '', fileMdUrl = '') {
//   const getLinksRegex = /!*\[(.+?)\]\((.+?)\)/gi
//   let getUrls = contentMdFile.match(getLinksRegex)
//   const respuesta = createObjectResponse(getUrls, fileMdUrl)
//   return respuesta
// }
// ​
// function createObjectResponse (urls, fileMdUrl) {
//   const createBasicObject = urls.map((url) => {  
//     const splitUrl = url.split("](")
//     const text = splitUrl[0].slice(1)
//     const href = splitUrl[1].slice(0, -1)
//     return {
//       href,
//       text,
//       file: fileMdUrl
//     }
//   })
//   return createBasicObject
// }

function validatePath (pathUser) {
  console.log(pathUser);
  if(path.isAbsolute(pathUser)){
    console.log('lo toma como absoluto; ');
    return pathUser;
  }else{
  const pathAbsolute = path.resolve(pathUser).normalize();
  return pathAbsolute;
  }
}

// guardar en una const el resultado de la funcion validatePath


function functionRecursive (pathUser) {
  let filesPath = [];
  if(fs.statSync(pathUser).isFile() && path.extname(pathUser) === '.md'){
    filesPath.push(pathUser);
  }else{
    if(fs.statSync(pathUser).isDirectory()){
      const directory = pathUser;
      let contentDirectory = fs.readdirSync(directory)
        contentDirectory.forEach(el => {
          functionRecursive(pathUser + '\\' + el).forEach(el => {
            filesPath.push(el);
          })
          //repetimos el paso a paso inicial 
        })

      //Leer directorio
      //recorrer directorio con un forEach
    }
  }
  return filesPath;
};

console.log(functionRecursive('C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\LABORATORIA\\BOG004-md-links'));
// Ejemplo cómo se va a consumir la libreria
// ​
// module.exports = {
//     validateUrl,
//     getObject,
//     createObjectResponse
// }