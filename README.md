
# Formula One Database

El proyecto "Formula One Database" se trata de una aplicación SPA desarrollada en Angular para la asignatura de Desarrollo web en entorno cliente.


## API, librerías y frameworks utilizados

#### Para este proyecto se ha utilizado:
- Angular CLI 13.1.2
- Npm 8.3.0
- Rxjs
- Chart.js
- Bootstrap 5
- Angular Material
- Formula One API hosted at Ergast API
- Firebase
- Mapbox
- Ngx-translate (Traducción)


## Estructura

#### CSS
Para la apariencia de la SPA, se ha utilizado una combinación de Angular Material y Bootstrap 5.

#### Routing
Desde el app-routing.module y controlando el acceso no autorizado mediante AuthGuard.

#### Componentes

Para los tres bloques principales (Pilotos, Circuitos y Constructores) se han creado tres tipos de componente:
- De tipo "Catalogue", donde se listarán todos los items de cada bloque.
- De tipo "Individual", los cuales serán incluidos en el "Catalogue" para poder visualizar cada item.
- De tipo "Detail", donde se mostrará toda la información de cada item de forma individual.

##### También se han creado los siguientes componentes generales:
- Home, como la página principal.
- Login, para la página de login.
- Map, como componente para generar los mapas con Mapbox.
- Navbar, para el menú superior de la SPA.
- Register, para la página de registro de nuevo usuario.
- Show-calendar, para mostrar el calendario si se selecciona como opción en el Home.

#### Interfaces

Se han creado diversas interfaces para los diferentes tipos de elementos que podemos manejar en la SPA.
A destacar:
- Interfaz para los eventos del calendario
- Interfaz para los likes
- Interfaz para los distintos bloques (Circuito, Piloto y Constructor)
- Interfaz para el usuario
- Interfaz para los datos de la API de Formula One
- Interfaz para los datos de los pilotos (Standings)

#### Pipes 

Se han habilitado pipes personalizadas para filtrar por el nombre de circuitos, pilotos o constructores.

#### Interceptor

Se ha implementado un Interceptor para el token de autorización de Firebase.

#### Environment

Las claves y URL necesarias para las diferentes APIs se han situado en environment.

#### Modules

Se han creado dos modules para:
- Exportar el módulo de traducción
- Agrupar todos los imports de Angular Material y utilizarlo en el app.module.tres

#### Translate

Se ha implementado un sistema de traducción utilizando las librerias de ngx-translate 




## Paginas

A destacar, toda la SPA se ha realizado de manera RESPONSIVE

### Login

Para la página de login se ha utilizado un formulario de plantilla.
Si el login no es correcto, nos retorna el error con un mensaje.
Si existe algún campo vacío, nos lo indica mediante angular material.

### Registro

Para el registro se ha utilizado un formulario reactivo, donde se comprueba:
- Nombre (Campo obligatorio y mínimo de 3 carácteres)
- Nickname (Campo obligatorio y mínimo de 6 carácteres)
- Email (Campo obligatorio y formato válido)
- Password y Confirma Password (Campo obligatorio, igualdad de campo y formato de password)

Una vez sea el formulario válido, se activará el botón de registro.

### Home

En la página de Home, disponemos de diversa información. A destacar, la posibilidad de mostrar nuestros favoritos o el calendario de carreras del 2022.

### Circuitos

En la página de circuitos podremos listar de diferentes formas:ç
- Por pais
- Por Nombre
- Buscar por Nombre
- Buscar por temporada

### Pilotos

En la página de pilotos podremos lista de diferentes formas:
- Mostrar todos
- Ordenar por Nombre
- Ordenar por apellido
- Filtrar por pais (y ordenar los resultados)
- Buscar por Nombre
- Buscar por temporada

### Constructores

En la página de constructores podremos lista de diferentes formas:
- Ordenar por Nombre
- Buscar por Nombre
- Buscar por temporada

Además, las escuderias que han ganado algún gran premio en la historia, están pintadas de verde, y las que han sido campeonas del mundo, de color dorado.

### Circuitos - Individual

En la página "detail" de un circuito, podemos encontrar:
- Botón de "me gusta"
- Mapa con la localización del circuito
- Dos tipos de visualización del mapa: Satelite u oscuro

### Pilotos - Individual

En la página "detail" de un piloto, podemos encontrar:
- Botón de "me gusta"
- Tabla generada mediante Chars.js con las victorias por temporada
- Tabla resumen de todas las temporadas del piloto en formula 1

### Constructores - Individual

En la página "detail" de un constructor, podemos encontrar:
- Botón de "me gusta"
- Url con más información del constructor

### Navbar

Desde el navbar podemos controlar el idioma, cerrar sesión y las diferentes páginas de nuestra SPA.


## autor

Javier García Pardo para la asignatura de Desarrollo de aplicaciones en entorno cliente.
