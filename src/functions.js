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
  .catch((error) => console.log("La ruta del archivo o carpeta es obligatorio", error));

  // const prueba = readMDfiles('./DirectorioPrueba/ejemploPrueba.md')
  // .then(resp => resp)
  // .catch(resp => resp)
  
  // prueba.then(resp => console.log(resp))
  function stats (linksArray) {
    let validateLinks = 0;
    let invalidateLinks = 0;

    let unique = new set (linksArray.map(link => link.href === link.file))
  }

  function CreateObjectWithvalidateUrl (data, optionsUser) {

    let urlValidatedList = data.map((object) =>
          validateUrl(object.href)
            .then((res) => {
              object.status = res.statusCode;
              object.ok =
                res.statusCode >= 200 && res.statusCode <= 399 ? "ok" : "fail";
            })
            .catch((error) => {
              object.status = error.code;
              object.ok = "fail";
            })
        );
        Promise.all(urlValidatedList)
          .then(() => { // Para mostrar la tabla con broken se debe esperar a que termine la validacion con .then
            if (optionsUser.stats === "--s" || optionsUser.stats === "--stats" ) {
              const filterDataWithHref = getTotalLinks(data);
              const filterDataWithStatus = data.filter((object) =>
                object.ok === 'fail'
              );
              const unique = getUnique(data)

                result = {
                  Total: filterDataWithHref.length,
                  Unique: unique.length,
                  Broken: filterDataWithStatus.length,
                };
                console.table(result)
            } else {
              console.log("Links desde promesa: ", data)//pinta aqui
            }
          });
  }

  function objectfitStat (data) {
    const filterDataWithHref = getTotalLinks(data);
    const unique = getUnique(data)

    result = {
      Total: filterDataWithHref.length,
      Unique: unique.length,
    };
    console.table(result);
  }

  function getUnique (data) {
    return [... new Set ((data).map(object  => object.href ))]
  }

  function getTotalLinks (data) {
    return data.filter((object) => object.hasOwnProperty("href"))
  }

module.exports = {
    validateUrl,
    browseDirectory,
    validatePath,
    objectLinks,
    CreateObjectWithvalidateUrl,
    objectfitStat
}