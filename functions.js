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

console.log('Resultado consultar directorio', browseDirectory(resultValidate));
// console.log(browseDirectory('C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\LABORATORIA\\BOG004-md-links'));
// Ejemplo cómo se va a consumir la libreria
// ​
// module.exports = {
//     validateUrl,
//     getObject,
//     createObjectResponse
// }