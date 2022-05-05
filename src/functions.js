const { fstat } = require('fs');
const path = require('path');
const fs = require('fs');
const { create } = require('domain');
const userPath = process.argv[2];

//convertit ruta relativa a absoluta
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

//Función recursiva para extraer rutas de archivos .md
const browseDirectory = (pathUser) => {
  // console.log(process.platform)
  const separador = process.platform === "win32" || process.platform === "win64" ? "\\" : "/";
  let filesPath = [];
  if(fs.statSync(pathUser).isFile() && path.extname(pathUser) === '.md'){
    filesPath.push(pathUser);
  }else{
    if(fs.statSync(pathUser).isDirectory()){
      const directory = pathUser;
      let contentDirectory = fs.readdirSync(directory)
        contentDirectory.forEach(el => {
          browseDirectory(pathUser + separador + el).forEach(el => {
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


// Función para leer contenido de los archivos
const readMDfiles = (fileMd) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileMd, 'utf-8', (error,data) => {
            if (error) return reject(error);
            else {
                // resolve(data) // si se resuelve la promesa se captura la información
                resolve ({
                    route : fileMd,
                    fileContent : data
                })
            };
        })
    })
}
// recorre los md captura los links
const getObject = Promise.all(resultFilesPath.map(readMDfiles))
.then((data) => { 
    // console.log(data);
    const regExpUrls = /!*\[(.+?)\]\((.+?)\)/gi;
    data.forEach(item => {
        const urlsFound = [... item.fileContent.toString().match(regExpUrls)];
        // copara los archivos
        urlsFound.forEach(url => {
            urls.push(url);
            paths.push(item.route)
        });
    })

    // return linksMD

objectMD = urls.map((totalLink) => {
        let index = urls.indexOf(totalLink);
        const splitUrl = totalLink.split('](');
        const text = splitUrl[0].slice(1);
        const href = splitUrl[1].slice(0, -1);
                    
        return {
            href,
            text : text.substring(0,50),
            file : paths[index]
            }
    
})

return objectMD;

})
.catch(error => console.log(error))

getObject.then(response =>{
  console.log("Hola soy un objeto", objectMD)
})

