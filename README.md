# Examen Final Backend 2021-2022 José María Fernández
## Install:
npm install
## Run
npm run start
### Endpoints :
○ books: devuelve una lista de todos los libros  
○ authors: devuelve una lista de todos los autores  
○ presshouses: devuelve una lista de todas las editoriales  
○ book(id): devuelve un libro identificado con id  
○ author(id): devuelve un autor identificado con id  
○ presshouse(id): devuelve una editorial identificada con id  
○ addPressHouse: añade una editorial  
○ addAuthor: añade un autor.  
○ addBook: añade un libro para este campo se le necesitará pasar el id del autor y el id de la Editorial a la que pertenecen  
○ deletePressHouse(id): borra una editorial y todos los libros de esa editorial  
○ deleteAuthor(id): borra un autor y todos los libros de ese autor.  
○ deleteBook(id): borra un libro.  

### Variables de entorno :
El pprograma creara una base de datos "Examen_Extraordinario" dentro de su base de datos MongoDb y varias sub colecciones "Authors","Editoriales" y "Books" conteniendo datos de lo que su propio nombre indica  
#### Para que el programa funcione se tiene que icluir en la carpeta fuente un archivo .env con la siguiente estructura:


PORT = Puerto del servidor  
DB_USER = Usuario de la base de datos MongoDb   
DB_PASSWORD = Contraseña de la base de datos MongoDb  
DB_CLUSTER = Cluster de la base de datos MongoDb (entre el @ y la /)  


