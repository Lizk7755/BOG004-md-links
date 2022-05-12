const validatePath = require('../src/functions.js').validatePath;
const browseDirectory = require('../src/functions.js').browseDirectory;
const objectLinks = require('../src/functions.js').objectLinks

  describe("path", () => {
    it("es una función", () => {
      expect(typeof validatePath).toBe("function");
    });
  
    it("recibe una ruta relativa y la convierte a absoluta", () => {
      let userPathTest = 'carpeta-prueba/archivo.md';
      let result = '/Users/cristianvillota/Desktop/Proyectos/BOG004-md-links/carpeta-prueba/archivo.md';
      return expect(validatePath(userPathTest)).toEqual(result);
    })

    it("recibe un archivo valida si es .md, si es un directorio lo recorre y encuentra archivos .md, si lo es, entonces lo almacena en un array", () => {
      let userDirectoryTest = 'carpeta-prueba';
      let result = [
        'carpeta-prueba/archivo.md', 'carpeta-prueba/carpeta-prueba-uno/archivo-uno.md'
      ]
      return expect(browseDirectory(userDirectoryTest)).toEqual(result);
    })

    it("valida los archivos .md, y encuentra links, los cuales almacena en un objeto", () => {
      let arrayTest = [
        'carpeta-prueba/carpeta-prueba-uno/archivo-uno.md'
      ]

      let objectExpect = [{
        href: 'https://www.google.com/doesntexist',
        text: 'link not found',
        file: 'carpeta-prueba/carpeta-prueba-uno/archivo-uno.md'
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'carpeta-prueba/carpeta-prueba-uno/archivo-uno.md'
      },
      ]
      
      return objectLinks(arrayTest).then((arrayTest)=> {
        expect(arrayTest).toStrictEqual(objectExpect)
      })
  })
})