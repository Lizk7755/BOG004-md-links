const { fstat } = require('fs');
const path = require('path');
const fs = require('fs');
const { create } = require('domain');
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

let resultFilesPath = browseDirectory(resultValidate);

let urls = []; //array para enlistar los links
let paths = []; //array para enlistar la ruta de los archivos.md
let objectMD = []; //este será mi objeto resultado

const readMDfiles = (mdFile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(mdFile, 'utf-8', (error,data) => {
            if (error) return reject(error);
            else {
                // resolve(data)
                resolve ({
                    route : mdFile,
                    fileContent : data
                })
            };
        })
    })
}

Promise.all(resultFilesPath.map(readMDfiles))
.then((data) => { 
    // console.log(data);
    const regExpUrls = /!*\[(.+?)\]\((.+?)\)/gi;
    data.forEach(item => {
        const urlsFound = [... item.fileContent.toString().match(regExpUrls)];
        urlsFound.forEach(url => {
            urls.push(url);
            paths.push(item.route)
        });
    })

    // return linksMD

    urls.map((totalLink) => {
        let index = urls.indexOf(totalLink);
        const splitUrl = totalLink.split('](');
        const text = splitUrl[0].slice(1);
        const href = splitUrl[1].slice(0, -1);
                    
        objectMD.push({
            href,
            text,
            file : paths[index]
            })
    
})
console.log('Este es el arrayy de objetos', objectMD);
return objectMD;

})
.catch(error => console.log(error))


// const readMDfiles = (arrayMD) => {
//     arrayMD.forEach(fileMD => {
//       let urls = []; // Almacena las urls encontradas en los archivos MD.
//       let urlsObject = []; // Almacena los objetos creados por cada url.
//       let paths = []; // Almacena la ruta de cada url encontrada.
//         fs.promises.readFile(fileMD, 'utf-8')
//         .then((result)=> {
//             const linkRegExp = /!*\[(.+?)\]\((.+?)\)/gi;
//             const urlsFound = [... result.match(linkRegExp)]; // busca las coincidencias entre los archivos que estamos evaluando con la expresión regular.
            
//             urlsFound.forEach(url => {
//                 urls.push(url); // Almacenamos en el array urls las coincidencias.
//                 paths.push(fileMD); // Almacenamos en el array la ruta donde encontramos la url.
//             })
              
//             urls.map((url) => { 
//               let index = urls.indexOf(url); 
//               const splitUrl = url.split("](")
//               const text = splitUrl[0].slice(1)
//               const href = splitUrl[1].slice(0, -1)
              
//               urlsObject.push({
//                     href,
//                     text,
//                     file: paths[index]
//                   });
//                 });
//                 return console.log('Este es mi resultado 1', urlsObject);
//         })
//         .catch((error)=>{
//             console.log('este es el error', error);
//         })
//     })
//   }

// const result =  readMDfiles(resultFilesPath);
// console.log('Este es mi resultado 2', result);

// module.exports = { 
//     // validateUrl,
//     browseDirectory,
//     validatePath,
// }