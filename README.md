# Md-Links

Es una **Librería** que permite extraer y validar los links encontrados en archivos markdown (extensión .md), arrojando estadísticas de links totales, únicos y rotos.


# # Diagrama de Flujo

 
>Visita el [Diagrama deflujo](https://app.diagrams.net/?src=about#G1stVv-aFUTqD1gMZ9KUmnc41548GK7a1e) de la librería.


## Instalación de librería (npm)

> **Ejecute en su terminal el comando:** npm i md-links.liz

## Guía para el uso de la librería

En la librería se recibe como argumento la ruta (path) del archivo.md o del directorio que contenga archivo .md, como argumento adicional recibimos las opciones a ejecutar (options).

**Options:**
**1.** Sin [options]
**2.** [-- validate] || [--v]
**3.**  [-- stats] || [--s)
**4.**  [-- validate] || [--v] **y** [-- stats] || [--s]
___________
1. Solo ingresamos la ruta absoluta o relativa del archivo o directorio y nos mostrará un array de objetos con las siguientes llaves:
	> Este objeto se muestra unicamente cuando no recibe options. 
	
[Imagen-Sin options](img/Sin options.png)

2. Cuando se ingresa --validate || --v se arroja un objeto con cuatro llaves.
	> Esta opción validará los link dentro del archivo especificado en la ruta ingresada.
    > Retornará un array de objetos con los links validados. 
    > Las llaves que arrojará: contienen mensaje  que nos indica los codigos de las respuestas http de los links analizados  y un ok (que arroja ok o fail dependiendo si el link funciona o está roto).
    
[Imagen con --v](img/--v.png) 

3. Cuando se ingresa --stats || --s nos arroja una tabla con la estadistica del **total** y  **unique**.
	> **total**  Total de link encontrados
    > Retornará un array de objetos con los links validados. 
    > **unique** Con el número total de enlaces no repetidos.
    
[Imagen con --s](img/--s.png)

4. Cuando se ingresa --validate || --v  **y** --stats || --s nos arroja una tabla con la estadistica del **total**, **unique** y **broken**.
	> **total**  Total de link encontrados
    > Retornará un array de objetos con los links validados. 
    > **unique** Con el número total de enlaces no repetidos.
    > **broken** Con el número total de enlaces rotos (404).

[Imagen con --v, --s](img/--v --s.png)
    
## Elaborado por:

**Lizeth Katherine Rodríguez** 