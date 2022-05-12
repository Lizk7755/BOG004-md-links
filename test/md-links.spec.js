const mdLinks = require('../src/index.js').mdLinks;

let pathTest = 'carpeta-prueba/carpeta-prueba-uno/archivo-uno.md'

      let objectExpect = [{
        href: 'https://www.google.com/doesntexist',
        text: 'link not found',
        file: '/Users/cristianvillota/Desktop/Proyectos/BOG004-md-links/carpeta-prueba/carpeta-prueba-uno/archivo-uno.md'
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: '/Users/cristianvillota/Desktop/Proyectos/BOG004-md-links/carpeta-prueba/carpeta-prueba-uno/archivo-uno.md'
      },
      ];





// it("Al ejecutar la función mdLinks con option true, la función retorna solo el objeto con 5 keys: href, text, file, status, ok", () => {

//   let pathTest = 'DirectorioPrueba\\carpetaUno\\directorio.md\\prueba.md'
  
//   let objectExpect = [{
//     file: "C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\LABORATORIA\\BOG004-md-links\\DirectorioPrueba\\carpetaUno\\directorio.md\\prueba.md",
//     href: 'https://www.youtube.com/watch?v=_Kqtj14rxes',
//     ok: 'ok',
//     status: 200,
//     text: 'Youtube'
//   },
//   {
//     file: "C:\\Users\\LABORATORIA\\OneDrive\\Escritorio\\LABORATORIA\\BOG004-md-links\\DirectorioPrueba\\carpetaUno\\directorio.md\\prueba.md",
//     href: 'https://www.facebook.com/roxysolano',
//     ok: 'ok',
//     status: 302,
//     text: 'Facebook'
//   },
//   ]
  
//   return mdLinks(pathTest, {validate: '--v'}).then((arrayObjects)=> {
//     expect(arrayObjects).toBe(objectExpect)
//   })
// })