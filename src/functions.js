const { fstat } = require("fs");
const path = require("path");
const fs = require("fs");
const { create } = require("domain");
const https = require('https');

function validateUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res =>  resolve(res))
      .on('error', e => reject(false));
  });
}

const validatePath = (pathUser) => {
  if (path.isAbsolute(pathUser)) {
    console.log("lo toma como absoluto; ", pathUser);
    return pathUser;
  } else {
    const pathAbsolute = path.resolve(pathUser).normalize();
    return pathAbsolute;
  }
};

const browseDirectory = (pathUser) => {
  const separator = process.platform === "win32" || process.platform === "win64" ? "\\" : "/";
  let filesPath = [];
  if (fs.statSync(pathUser).isFile() && path.extname(pathUser) === ".md") {
    filesPath.push(pathUser);
  } else {
    if (fs.statSync(pathUser).isDirectory()) {
      const directory = pathUser;
      let contentDirectory = fs.readdirSync(directory);
      contentDirectory.forEach((el) => {
        browseDirectory(pathUser + separator + el).forEach((el) => {
          filesPath.push(el);
        });
      });
    }
  }
  return filesPath;
};

let urls = []; //array para enlistar los links
let paths = []; //array para enlistar la ruta de los archivos.md
let objectResult = []; //este será mi objeto resultado

const readMDfiles = (mdFile) => {
  return new Promise((resolve, reject) => {
    fs.readFile(mdFile, "utf-8", (error, data) => {
      //metodo de node que lee archvos
      if (error) return reject(error);
      else {
        resolve({
          route: mdFile,
          fileContent: data,
        });
      }
    });
  });
};


const objectLinks = (arrayMD) => Promise.all(arrayMD.map(readMDfiles))
  .then((data) => {
    const regExpUrls = /!*\[(.+?)\]\((.+?)\)/gi;
    data.forEach((item) => {
      const urlsFound = [...item.fileContent.toString().match(regExpUrls)];
      urlsFound.forEach((url) => {
        urls.push(url);
        paths.push(item.route);
      });
    });

    objectResult = urls.map((totalLink) => {
      let index = urls.indexOf(totalLink);
      const splitUrl = totalLink.split("](");
      const text = splitUrl[0].slice(1);
      const href = splitUrl[1].slice(0, -1);

      return {
        href,
        text: text.substring(0, 50),
        file: paths[index],
      };
    });
    return objectResult;
  })
  .catch((error) => reject(error))

  // const prueba = readMDfiles('./DirectorioPrueba/ejemploPrueba.md')
  // .then(resp => resp)
  // .catch(resp => resp)
  
  // prueba.then(resp => console.log(resp))

module.exports = {
    validateUrl,
    browseDirectory,
    validatePath,
    objectLinks,
}