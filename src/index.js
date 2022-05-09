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
  return new Promise((resolve, reject) => {
    const pathAbsolute = validatePath(userPath);
    const readDirectory = browseDirectory(pathAbsolute);
    objectLinks(readDirectory)
    .then((resolve) => {
      response.data = resolve;
    })
    .then(() => {
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
            if (optionsUser.includes("--s")) {
              let filterDataWithHref = response.data.filter((object) =>
                  object.hasOwnProperty("href")
                );
              let filterDataWithStatus = response.data.filter((object) =>
                object.ok === 'fail'
              );
                let result = {
                  Total: filterDataWithHref.length,
                  Unique: filterDataWithHref.length,
                  Broken: filterDataWithStatus.length,
                };
                console.table(result)
            }
          });
      } else if ((!optionsUser.includes("--validate") || !optionsUser.includes("--v")) && (optionsUser.includes("--stats") || optionsUser.includes("--s"))) {
        let filterDataWithHref = response.data.filter((object) =>
            object.hasOwnProperty("href")
          );

          let result = {
            Total: filterDataWithHref.length,
            Unique: filterDataWithHref.length,
          };
          console.table(result);
      }else {
        if (!response.errors) {
          resolve(response.data);
        } else {
          reject(response.errors);
        }
      }
    })
  });
}

mdLinks(userPath, {validate: optionsUser, stats: optionsUser })
  .then((links) => console.log("links: ", links))
  .catch(console.error);