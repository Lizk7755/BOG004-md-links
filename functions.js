function validateUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res =>  resolve(res))
      .on('error', e => reject(false));
  });
}
​
function getObject(contentMdFile = '', fileMdUrl = '') {
  const getLinksRegex = /!*\[(.+?)\]\((.+?)\)/gi
  let getUrls = contentMdFile.match(getLinksRegex)
  const respuesta = createObjectResponse(getUrls, fileMdUrl)
  return respuesta
}
​
function createObjectResponse (urls, fileMdUrl) {
  const createBasicObject = urls.map((url) => {  
    const splitUrl = url.split("](")
    const text = splitUrl[0].slice(1)
    const href = splitUrl[1].slice(0, -1)
    return {
      href,
      text,
      file: fileMdUrl
    }
  })
  return createBasicObject
}
​
// Ejemplo cómo se va a consumir la libreria
​
module.exports = {
    validateUrl,
    getObject,
    createObjectResponse
}