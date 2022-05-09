const userPath = process.argv[2];
// let validateFromConsole = process.argv[3];
const optionsUser = process.argv;

const {
  validateUrl,
  browseDirectory,
  validatePath,
  objectLinks,
} = require("./functions.js");

let response = {
    data: [],
    errors: ''
  }

function mdLinks(path = "", options = { validate: false, stats : '' }) {
//  const {validate, stats} = options

  let filterDataWithHref
  let unique
  let result

  return new Promise((resolve, reject) => {
    const pathAbsolute = validatePath(userPath);
    const readDirectory = browseDirectory(pathAbsolute);
    objectLinks(readDirectory)
    .then((resolve) => {
      response.data = resolve;
    })
    .then (() => {
      if (optionsUser.includes("--validate") || optionsUser.includes("--v")) {
        let urlValidatedList = response.data.map((object) =>
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
          .then(() => {
            resolve(response.data);
          })
          .then(() => { // Para mostrar la tabla con broken se debe esperar a que termine la validacion con .then
            if (optionsUser.includes("--s") || optionsUser.includes("--s") ) {
              filterDataWithHref = response.data.filter((object) =>
                  object.hasOwnProperty("href")
                );
              filterDataWithStatus = response.data.filter((object) =>
                object.ok === 'fail'
              );
              unique = [... new Set ((response.data).map(object  => object.href ))]

                result = {
                  Total: filterDataWithHref.length,
                  Unique: unique.length,
                  Broken: filterDataWithStatus.length,
                };
                console.table(result)
            } else {
              console.log("Links desde promesa: ",response.data)//pinta aqui
            }
          });
      } else if ((!optionsUser.includes("--validate") || !optionsUser.includes("--v")) && (optionsUser.includes("--stats") || optionsUser.includes("--s"))) {
          filterDataWithHref = response.data.filter((object) =>
            object.hasOwnProperty("href")
          );
          unique = [... new Set ((response.data).map(object  => object.href ))]

          result = {
            Total: filterDataWithHref.length,
            Unique: unique.length,
          };
          console.table(result);
      }else {
        if (!response.errors) {
          console.log(response.data);
          resolve(response.data);
        } else {
          reject(response.errors);
        }
      }
    })
  });
}
mdLinks(userPath, {validate: optionsUser, stats: optionsUser })
  .then((links) => links)
  .catch(console.error);