const mdLinks = require ('./mdLinks.js');
const userPath = process.argv;


mdLinks(userPath);

// 'use strict'

// const fs = require('fs');
// const https = require('https');
// const path = require('path');
// const process = require(('process'));
// const functions = require('./functions.js')

// module.exports = (fileMdUrl = '', options = {validate: false}) => {
//   let contentMdFile
//   let respuesta = {
//     data: [],
//     errors: ''
//   }

//   const {validate} = options; // destructuring

//   return new Promise((resolve, reject) => {    
//     try {
//       //Validar reuta absoluta o relativa
//       //Recursividad en caso de que la ruta apunte a un directorio
    
      
//       contentMdFile = fs.readFileSync(fileMdUrl, {encoding: 'utf-8', flag: 'r'}).toString()
//       //Extraer los links
//       //Crear el objeto respuesta
//     } catch (err) {
//       respuesta.errors += "Error en la lectura del archivo, comprueba que la ruta sea correcta o el nombre del archivo esté bien escrito"
//       reject(respuesta.errors)
//     }
    
//     respuesta.data = getObject(contentMdFile, fileMdUrl)
//     //console.log(validate)

//     if(validate){
//       let urlValidatedList = respuesta.data.map(objeto => validateUrl(objeto.href)
//         .then( res => {
//           objeto.status = res.statusCode
//           objeto.ok = res.statusCode >= 200 && res.statusCode <= 399  ? 'ok' : 'fail'
//         })
//         .catch(error => {
//           objeto.status = error.code
//           objeto.ok = 'fail'
//         })
//       )
//       Promise.all(urlValidatedList).then(() => {
//         resolve(respuesta.data)
//       })
//     } else {
      
//       if (!respuesta.errors) {
//         resolve(respuesta.data)
//       } else {
//         reject(respuesta.errors)
//       }
//     }

//   })
// }; // fin 



// // Ejemplo cómo se va a consumir la libreria

// const mdLinks = require ('./index.js')

// mdLinks("./README.md", {validate: true})
// .then(links => console.log('links: ', links))
// .catch(console.error)
// /* 
// mdLinks("./README.md")
//   .then(links => console.log(links))
//   .catch(console.error);
// mdLinks("./README.md", {validate: false})
//   .then(links => console.log(links))
//   .catch(console.error);
// */

