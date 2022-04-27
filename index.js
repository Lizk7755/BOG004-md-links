'use strict'
const fs = require('fs');
const https = require('https');
const path = require('path');
const { CLIENT_RENEG_LIMIT } = require('tls');
const route = process.argv[2];

const { validateUrl, getObject } = require('functions.js')
​
module.exports = (fileMdUrl = '', options = {validate: false}) => {
  let contentMdFile
  let respuesta = {
    data: [],
    errors: ''
  }
​
  const {validate} = options; // destructuring
​
  return new Promise((resolve, reject) => {    
    try {
      //Validar reuta absoluta o relativa
      //Recursividad en caso de que la ruta apunte a un directorio
//       const userPath = path.resolve(route);
//       function identifyDir (currentPath) { 
//         if(userPath.extname === undefined){
//             let pathArr = [];
//             let actualPath = '';
//                 fs.readdirSync(userPath, (err, items) => {
//                     if(err){
//                         console.log(err);
//                     }else{
//                         items.forEach(item => {
//                           identifyDir(item)
//                             if(item.isDirectory()){//validar en la documentación si es directorio

//                             }
//                             const ext = path.extname(item);
//                             if(ext === '.md'){
//                                 actualPath = userPath + '\\' + item;
//                                 pathArr.push(actualPath);
//                             }
//                         })
//                     }
//                 })
//             return pathArr;
// ​
//             //RECORRER EL DIRECTORIO => VERIFICAR SI ES UN ARCHIVO => VERIFICAR SI ES MD => ALMACENAR EN ARRAY() //  SI ES UNA CARPERTA => RECORRER DIRECTORIO => VER. ARCHIVO? => RECURSIVIDAD
//         }else{
//             archivo
//             //SI ES ARCHIVO => EVALUAR SI ES MD => GUARDAR EN UN ARRAY
//         }
      
//     }
      // FOREACH 
      contentMdFile = fs.readFileSync(fileMdUrl, {encoding: 'utf-8', flag: 'r'}).toString()
      //Extraer los links
      //Crear el objeto respuesta
    } catch (err) {
      respuesta.errors += "Error en la lectura del archivo, comprueba que la ruta sea correcta o el nombre del archivo esté bien escrito"
      reject(respuesta.errors)
    }
    
    respuesta.data = getObject(contentMdFile, fileMdUrl)
    //console.log(validate)
​
    if(validate){
      let urlValidatedList = respuesta.data.map(objeto => validateUrl(objeto.href)
        .then( res => {
          objeto.status = res.statusCode
          objeto.ok = res.statusCode >= 200 && res.statusCode <= 399  ? 'ok' : 'fail'
        })
        .catch(error => {
          objeto.status = error.code
          objeto.ok = 'fail'
        })
      )
      Promise.all(urlValidatedList).then(() => {
        resolve(respuesta.data)
      })
    } else {
      
      if (!respuesta.errors) {
        resolve(respuesta.data)
      } else {
        reject(respuesta.errors)
      }
    }
​
  })
}; // fin 
​
​
const mdLinks = require ('./index.js')

mdLinks("./DirectorioPrueba/ejemploPrueba.md", {validate: true})
.then(links => console.log('links: ', links))
.catch(console.error)
