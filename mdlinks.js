const fs = require('fs'); // administrador de archivos, lee el contenido de los archivos
const path = require('path'); // lo usamos para trabajar con rutas 
const process = require('process'); // capturar la ruta que ingresa el usuario
const https = require('https'); // para validar que los links funcionen

const mdlinks = (args) => {
  console.log('mdlinks', args);
  // Captura la ruta del archivo
  const pathCapture = args[2];

  // Resolver la ruta de relativa a absoluta

  const converterPath = path.resolve(pathCapture).normalize();
  console.log('ESTA ES MI RUTA CONVERTIDA A ABSOLUTA: ', converterPath);

  // Verificar si es un directorio o archivo

  fs.stat(converterPath, (err, stats) => {
    if (err) throw err;
    const directory = stats.isDirectory(converterPath);
    console.log('es direcorio: ', directory);
  })
}





module.exports = mdlinks;

