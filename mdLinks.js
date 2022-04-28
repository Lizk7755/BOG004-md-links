const fs = require('fs');
const https = require('https');
const path = require('path');
const process = require(('process'));

const mdLinks = (args) => {


  console.log('esta es mi ruta: ',  args);

  const pathCapture = args[2];
  // Resolver la ruta de relativa a absoluta
  const converterPath = path.resolve(pathCapture).normalize();
  console.log('This is my absolute route: ', converterPath);
  // Verificar si es un directorio o archivo
  fs.stat(converterPath, (err, stats) => {
    if(err) throw err;
    const directory = stats.isDirectory(converterPath);
    console.log(directory);
  })



}


module.exports = mdLinks;