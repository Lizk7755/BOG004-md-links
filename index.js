const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
const fsPromises = require('fs').promises;

const {
    validateUrl,
    browseDirectory, validatePath,
} = require ('./functions.js')

const userPath = process.argv[2];
let resultValidate = validatePath(userPath)
const resultFilesPath = browseDirectory(resultValidate);

const promesaPrueba = route => new Promise((resolve, reject) => {
    // console.log("esta es la primera ruta", route);
        fs.promises.readFile(route, 'utf-8')
        .then(result => {
            // console.log('RESULTADOO', result);
            resolve(result)
        })
        .catch(error => {
            reject(error)
            
        })
    
});

promesaPrueba(resultFilesPath[1]).then(unlink => {
    console.log('esta es la promesa prueba: ', unlink);
})


// const promesaPrueba = new Promise((resolve, reject) => {
//     resolve(
//         resultDirectory.map(result => {
//             fs.promises.readFile(result, 'utf-8')
//             .then(result => {
//                 // const resultLinks = getObject(resultDirectory, fileMDUrl);
//             return result
//             })
//             .catch(error => {
//             console.log('ERROOOR', error);
//             })
//         })
//     )
// });


module.exports = {
    promesaPrueba,
}