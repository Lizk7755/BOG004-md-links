const { mdLinks } = require('../src/index.js');

describe("Función mdLinks", () => {
  it("es una función", () => {
    expect(typeof mdLinks).toBe("function");
  });

  it('Ejecuta mdLinks con option false y trae el objeto basico con tres llaves',() => {
  let pathTest = '/Users/cristianvillota/Desktop/Proyectos/BOG004-md-links/carpeta-prueba/carpeta-prueba-uno/archivo-uno.md'

      let resultTestValidateF = [
        {
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

      return mdLinks(pathTest).then((result)=>{
        expect(result).toEqual(resultTestValidateF)
      })
    })


  it('Ejecuta función mdLinks con option true y retorna objeto con 5 llaves', () => {

    let pathTestTrue = '/Users/cristianvillota/Desktop/Proyectos/BOG004-md-links/carpeta-prueba/carpeta-prueba-uno/archivo-uno.md'
    let resultTestValidateT = [
      {
        href: 'https://www.google.com/doesntexist',
        text: 'link not found',
        file: '/Users/cristianvillota/Desktop/Proyectos/BOG004-md-links/carpeta-prueba/carpeta-prueba-uno/archivo-uno.md',
        status: 404,
        ok: 'fail'
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: '/Users/cristianvillota/Desktop/Proyectos/BOG004-md-links/carpeta-prueba/carpeta-prueba-uno/archivo-uno.md',
        status: 200,
        ok: 'ok'
      }
    ]
    
    return mdLinks(pathTestTrue, optionsUser = { validate: true }).then((result)=>{
      expect(result).toStrictEqual(resultTestValidateT)
    })
  })

  it('Ejecuta función mdLinks --v --s', () => {

    let pathTestTrue = '/Users/cristianvillota/Desktop/Proyectos/BOG004-md-links/carpeta-prueba/carpeta-prueba-uno/archivo-uno.md'
    let resultTestValidateT = {"Broken": 1, "Total": 2, "Unique": 2}
    
    return mdLinks(pathTestTrue, optionsUser = { validate: true, stats: true }).then((result)=>{
      expect(result).toStrictEqual(resultTestValidateT)
    })
  })

  it('Ejecuta función mdLinks --s', () => {

    let pathTestTrue = '/Users/cristianvillota/Desktop/Proyectos/BOG004-md-links/carpeta-prueba/carpeta-prueba-uno/archivo-uno.md'
    let resultTestValidateT = {"Total": 2, "Unique": 2}
    
    return mdLinks(pathTestTrue, optionsUser = { stats: true }).then((result)=>{
      expect(result).toStrictEqual(resultTestValidateT)
    })
  })

  // it('Cuando la ruta es invalida', () => {

  //   let mensajeEsperado = "La ruta ingresada no es válida o no existe"
  //   let pathTestTrue = '/Users/cristianvillota/Desktop/Proyectos/BOG004-md-links/carpeta-prueba/carpeta-prueba-uno/archivo-unoooo.md'

  //   return mdLinks(pathTestTrue, resultTestValidateT).then((reject)=>{
  //     expect(reject).toStrictEqual(mensajeEsperado)
  //   })
  // })
});