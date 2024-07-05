## Punto 1: Ejercicio Guiado - Creando una Aplicación de Gestión de Tareas

En este primer punto, crearás una aplicación de gestión de tareas que te permitirá añadir, editar, eliminar y marcar tareas como completadas. Durante el proceso, se evaluarán los siguientes temas:

- JavaScript Básico
- Manipulación del DOM
- Programación Orientada a Objetos (OOP)
- Eventos en JavaScript
- Variables y Tipos de Datos
- Control de Flujo
- Funciones de Flecha
- JSON
- Depuración

### Historia de Usuario

Como usuario, quiero una aplicación de gestión de tareas que me permita añadir, editar, eliminar y marcar tareas como completadas para organizar mis actividades diarias de manera eficiente.

### Criterios de Aceptación

1. **Añadir una Tarea**:
   - Debe existir un campo de entrada y un botón para añadir una nueva tarea.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

2. **Editar una Tarea**:
   - Debe ser posible editar la descripción de una tarea existente.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

3. **Eliminar una Tarea**:
   - Debe existir un botón para eliminar una tarea.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

4. **Marcar una Tarea como Completada**:
   - Debe ser posible marcar una tarea como completada y debe visualizarse de manera diferente.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript, Clases y Objetos.

5. **Almacenar Tareas en localStorage**:
   - Las tareas deben ser almacenadas en `localStorage` y recuperadas al recargar la página.
   - **Concepto de JavaScript aplicado**: JSON, Almacenamiento en localStorage.

6. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha, Eventos en JavaScript.

7. **Validación y Manejo de Errores**:
   - Implementar métodos de depuración para el manejo de errores y validación.
   - **Concepto de JavaScript aplicado**: Depuración, Manejo de Errores.


#### HTML

```html
<!DOCTYPE html> <!-- Recordemos que el DOCTYPE es la primera línea de un documento HTML y se utiliza para indicar al navegador qué tipo de documento se está utilizando. -->
<html lang="en"> <!-- La etiqueta <html> es el contenedor raíz de todo el contenido de una página web. El atributo lang se utiliza para especificar el idioma de la página. -->
<head> <!-- La etiqueta <head> contiene información sobre el documento, como metadatos, enlaces a estilos y scripts, y otros elementos que no se muestran directamente en la página. -->
    <meta charset="UTF-8"> <!-- La etiqueta <meta> se utiliza para especificar metadatos, como el juego de caracteres utilizado en el documento. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- La etiqueta <meta> con el atributo name="viewport" se utiliza para controlar el tamaño y la escala de la página en dispositivos móviles. -->
    <title>Gestión de Tareas</title> <!-- La etiqueta <title> se utiliza para especificar el título de la página, que se muestra en la pestaña del navegador. -->
    <link rel="stylesheet" href="styles.css"> <!-- La etiqueta <link> se utiliza para enlazar una hoja de estilos externa con la página. -->
</head>
<body> <!-- La etiqueta <body> contiene todo el contenido visible de una página web, como texto, imágenes, enlaces, formularios, etc. -->
    <div id="app"> <!-- La etiqueta <div> se utiliza para agrupar elementos y crear secciones en una página web. El atributo id se utiliza para identificar un elemento de forma única. -->
        <h1>Gestión de Tareas</h1> <!-- La etiqueta <h1> se utiliza para definir un encabezado de nivel 1 en una página web. -->
        <input type="text" id="new-task" placeholder="Nueva tarea"> <!-- La etiqueta <input> se utiliza para crear campos de entrada en formularios. El atributo type se utiliza para especificar el tipo de campo (e.g., texto). El atributo id se utiliza para identificar un campo de forma única. El atributo placeholder se utiliza para mostrar un texto de ayuda en el campo. -->
        <button id="add-task">Añadir Tarea</button> <!-- La etiqueta <button> se utiliza para crear botones en una página web. El atributo id se utiliza para identificar un botón de forma única. -->
        <ul id="task-list"></ul> <!-- La etiqueta <ul> se utiliza para crear listas no ordenadas en una página web. El atributo id se utiliza para identificar una lista de forma única. -->
    </div>
    <script src="app.js"></script> <!-- La etiqueta <script> se utiliza para enlazar un archivo de script con la página. -->
</body>
</html>
```

#### JavaScript

```javascript
class Task {
    constructor(id, description, completed = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    } /*Este es eñ objeto constructor del cual van a derivar todas las tareas este cuenta con un id, una descripcion y un estado */

    toggleComplete() {
        this.completed = !this.completed; /*comparamos la instancia del estado de la tarea y la cambiamos por un estado contrario osea si esta en true, pasa a false y viceversa*/
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];//accede a tasks desde localStorage y cambia la data de JSON a un objeto JS si no hay data o da un null o undefined retorna un array vacio
        this.loadTasks(); //llamamos la funcion de loadTasks
    }

    addTask(description) {
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        const task = new Task(id, description);
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
    } //metodo para añadir tareas, recibe como parametro la descripcion de la tarea

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);/*verifica si tiene data, accede al ultimo elemento y obtiene su id luego aumenta a 1 para obtener e proximo, si this.tasks esta vacio o es 0 asigna 1*/
        this.saveTasks();// llamamos la funcion de saveTasks
        this.renderTasks();// llamamos la funcion de renderTasks
    } //metodo para borrar tareas, recibe como parametro el id de la tarea

    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id);//busca una coincidencia en la instacia segun el objeto de tareas
        if (task) {
            task.toggleComplete();// llamamos la funcion toggleComplete
            this.saveTasks();// llamamos la funcion saveTasks
            this.renderTasks(); // llamamos la funcion renderTasks
        }
    } //metodo para cambia estado de la tarea, recibe como parametro el id de la tarea

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));// Agregamos al local storage el objeto de las tareas parseado a JSON
    } //metodo para guardar las tareas, no necesitamos un parametro

    loadTasks() {
        this.renderTasks(); //llamamos la funcion renderTasks
    } //metodo para cargar las tareas en la vista del usuario

    renderTasks() {
        const taskList = document.getElementById('task-list');// objetemos el elemento de html con el id task-list
        taskList.innerHTML = ''; // declaramos lo que vamos a agregar al elemento taskList de html
        this.tasks.forEach(task => {
            const item = document.createElement('li');// creamos una variable item que sea una etiqueta li de html
            item.textContent = task.description;// agregamos al item una instancia de la descripcion de cada tarea
            item.className = task.completed ? 'completed' : '';// Agregamos una clase al elemento item en el html que sea completed y tenga un elemento vacio
            item.addEventListener('click', () => this.toggleTaskComplete(task.id));// item va a tener un evento click donde llama la funcion toggleTaskComplete al hacerlo

            const deleteButton = document.createElement('button');// creamos una variable que contenga el elemento button de html
            deleteButton.textContent = 'Eliminar';// texto que debe tener el elemento button de html
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteTask(task.id);// llamamos la funcion deleteTask
            });

            item.appendChild(deleteButton);// agregamos como hijo en el item el deleteButton
            taskList.appendChild(item);//agregamos como hijo el item al taskList
        });
    } //metodo para agregar las tareas en la vista dl usuario, no necesitamos parametros
}

document.addEventListener('DOMContentLoaded', () => {
    // Este bloque de código se ejecuta cuando el documento HTML ha sido completamente cargado y analizado.

    // Crear una nueva instancia de TaskManager.
    const taskManager = new TaskManager();

    // Escuchar el evento 'click' en el elemento con ID 'add-task'.
    document.getElementById('add-task').addEventListener('click', () => {
        // Cuando se hace clic en el botón con ID 'add-task', ejecutar este bloque de código:

        // Obtener el valor del campo de entrada con ID 'new-task'.
        const newTask = document.getElementById('new-task').value;

        // Verificar si el valor de 'newTask' no está vacío o es null/undefined.
        if (newTask) {
            // Si 'newTask' tiene contenido, llamar al método addTask del objeto taskManager y pasarle 'newTask'.
            taskManager.addTask(newTask);

            // Limpiar el campo de entrada con ID 'new-task' después de agregar la tarea.
            document.getElementById('new-task').value = '';
        }
    });
});

```
3. **Ejecución**: Probar la aplicación en un navegador y realizar las siguientes acciones:
    - Probar funcionalidad del codigo. Si encuentras errores, depurar el código, corregirlos y generar un informe de los errores encontrados y como los corregiste.
    - Añadir una nueva tarea.
    - Marcar una tarea como completada.
    - Eliminar una tarea.
    - Verificar que las tareas se almacenan y recuperan correctamente en `localStorage`.
4. **Analisis**: Explicar el código proporcionado linea por linea en el archivo `README.md` de tu repositorio.

## Eplicacion de codigo

## Punto 2: Ejercicio Independiente - Creando una Aplicación de Gestión de Notas

En este segundo punto, crearás una aplicación de gestión de notas que te permitirá añadir, editar, eliminar y marcar notas como importantes. Durante el proceso, se evaluarán los siguientes temas:

### Historia de Usuario

Como usuario, quiero una aplicación de gestión de notas para poder añadir, editar, eliminar y marcar notas como importantes, de manera que pueda organizar mis tareas y recordatorios de forma eficiente.

### Criterios de Aceptación

1. **Añadir una Nota**:
   - Debe existir un campo de entrada y un botón para añadir una nueva nota.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

2. **Editar una Nota**:
   - Debe ser posible editar la descripción de una nota existente.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

3. **Eliminar una Nota**:
   - Debe existir un botón para eliminar una nota.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

4. **Marcar una Nota como Importante**:
   - Debe ser posible marcar una nota como importante y debe visualizarse de manera destacada.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript, Clases y Objetos.

5. **Almacenar Notas en localStorage**:
   - Las notas deben ser almacenadas en `localStorage` y recuperadas al recargar la página.
   - **Concepto de JavaScript aplicado**: JSON, Almacenamiento en localStorage.

6. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha, Eventos en JavaScript.

7. **Validación y Manejo de Errores**:
   - Implementar métodos de depuración para el manejo de errores y validación.
   - **Concepto de JavaScript aplicado**: Depuración, Manejo de Errores.

### Ejercicio

Desarrolla la aplicación de acuerdo a los criterios de aceptación mencionados. Asegúrate de probar la aplicación en un navegador y realizar las siguientes acciones:

1. Añadir una nueva nota.
2. Editar una nota existente.
3. Marcar una nota como importante.
4. Eliminar una nota.
5. Verificar que las notas se almacenan y recuperan correctamente en `localStorage`.
6. Documentar el proceso y el código en el archivo `README.md` de tu repositorio.

## Punto 3: Ejercicio Guiado - Consumiendo una API con JSONPlaceholder

En este tercer punto, crearás una aplicación que consuma datos de una API utilizando JSONPlaceholder. Durante el proceso, se evaluarán los siguientes temas:

- Control de Flujo
- Funciones de Flecha
- JSON
- Promesas
- Depuración

### Historia de Usuario

Como usuario, quiero una aplicación que consuma datos de una API pública, para visualizar y gestionar información de manera eficiente.

### Criterios de Aceptación

1. **Consumo de API**:
   - La aplicación debe consumir datos de la API de JSONPlaceholder (https://jsonplaceholder.typicode.com/posts).
   - **Concepto de JavaScript aplicado**: Promesas, JSON.

2. **Visualización de Datos**:
   - Los datos obtenidos de la API deben visualizarse en la página de manera estructurada.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Control de Flujo.

3. **Manejo de Errores**:
   - Implementar manejo de errores para la solicitud de la API y mostrar mensajes de error adecuados al usuario.
   - **Concepto de JavaScript aplicado**: Promesas, Depuración.

4. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos y procesamiento de datos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha.

### Ejemplo de Código

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Definición del juego de caracteres -->
    <meta charset="UTF-8">
    <!-- Configuración de la escala inicial y tamaño de la ventana de visualización -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Título de la página -->
    <title>Consumiendo API con JSONPlaceholder</title>
    <!-- Enlace al archivo de estilos externo -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Contenedor principal de la aplicación -->
    <div id="app">
        <!-- Título principal -->
        <h1>Listado de Posts</h1>
        <!-- Botón para cargar los posts -->
        <button id="fetch-posts">Cargar Posts</button>
        <!-- Lista donde se mostrarán los posts -->
        <ul id="post-list"></ul>
        <!-- Contenedor para mostrar mensajes de error -->
        <div id="error-message"></div>
    </div>
    <!-- Inclusión del archivo JavaScript -->
    <script src="app.js"></script>
</body>
</html>
```

#### JavaScript

```javascript
// Agregar un event listener al elemento con ID 'fetch-posts' que escucha el evento 'click'
document.getElementById('fetch-posts').addEventListener('click', () => {
    // Cuando se hace clic en el botón con ID 'fetch-posts', se llama a la función fetchPosts
    fetchPosts();
});

// Definir una función fetchPosts usando una arrow function
const fetchPosts = () => {
    // Llamar a la función fetch para realizar una solicitud GET a la API JSONPlaceholder
    fetch('https://jsonplaceholder.typicode.com/posts')
        // Manejar la respuesta de la solicitud fetch usando promesas
        .then(response => {
            // Verificar si la respuesta no es exitosa
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Convertir la respuesta a formato JSON
            return response.json();
        })
        // Manejar el JSON obtenido de la respuesta exitosa
        .then(posts => {
            // Llamar a la función displayPosts y pasarle los posts obtenidos
            displayPosts(posts);
        })
        // Capturar cualquier error ocurrido durante la solicitud o conversión de respuesta
        .catch(error => {
            // Llamar a la función displayError y pasarle el error capturado
            displayError(error);
        });
};

// Definir una función displayPosts para mostrar los posts en el documento HTML
const displayPosts = (posts) => {
    // Obtener el elemento <ul> con ID 'post-list'
    const postList = document.getElementById('post-list');
    // Limpiar el contenido existente de postList
    postList.innerHTML = '';
    // Iterar sobre cada post y crear un <li> para cada uno
    posts.forEach(post => {
        const listItem = document.createElement('li');
        // Asignar el texto del <li> con el título del post
        listItem.textContent = `Title: ${post.title}`;
        // Agregar el <li> al elemento <ul> postList
        postList.appendChild(listItem);
    });
};

// Definir una función displayError para mostrar mensajes de error en el documento HTML
const displayError = (error) => {
    // Obtener el elemento con ID 'error-message'
    const errorMessage = document.getElementById('error-message');
    // Mostrar el mensaje de error en el elemento
    errorMessage.textContent = `Error: ${error.message}`;
};
```

### Ejecución

1. Añadir un botón en el HTML para iniciar la solicitud de la API.
2. Crear una función en JavaScript para consumir la API utilizando `fetch`.
3. Manejar las promesas y los posibles errores de la solicitud.
4. Mostrar los datos obtenidos de la API en la página.
5. Implementar métodos de depuración para el manejo de errores y validación.

### Análisis

Explica el código proporcionado línea por línea en el archivo `README.md` de tu repositorio. Asegúrate de describir cómo se aplican los conceptos de control de flujo, funciones de flecha, JSON, promesas y depuración.

## Punto 4: Ejercicio Independiente - Creando una Aplicación de Gestión de Productos con la API de Platzi

En este cuarto punto, crearás una aplicación que consuma datos de la API de Platzi Fake Store y muestre la información de productos de manera interactiva y visualmente atractiva. Durante el proceso, se evaluarán los siguientes temas:

- Control de Flujo
- Funciones de Flecha
- JSON
- Promesas
- Depuración

### Historia de Usuario

Como usuario, quiero una aplicación que me permita ver y gestionar productos de una tienda en línea, para explorar las opciones disponibles y tomar decisiones de compra informadas.

### Criterios de Aceptación

1. **Consumo de API**:
   - La aplicación debe consumir datos de la API de Platzi Fake Store (https://fakeapi.platzi.com/).
   - **Concepto de JavaScript aplicado**: Promesas, JSON.

2. **Visualización de Datos**:
   - Los datos obtenidos de la API deben visualizarse en la página de manera estructurada y atractiva. Puede usar una tabla, una lista o cualquier otro formato que consideres adecuado.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Control de Flujo.

3. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos y procesamiento de datos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha, Eventos en JavaScript.

4. **Filtrado y Búsqueda**:
   - Implementar funcionalidades de filtrado y búsqueda para que los usuarios puedan encontrar productos específicos.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Control de Flujo.

5. **Manejo de Errores**:
   - Implementar manejo de errores para la solicitud de la API y mostrar mensajes de error adecuados al usuario.
   - **Concepto de JavaScript aplicado**: Promesas, Depuración.

## Punto 5: Ejercicio Independiente - Métodos de Array en JavaScript

En este quinto punto, explorarás y aplicarás diversos métodos de array en JavaScript. Durante el proceso, se evaluarán los siguientes temas:

- Control de Flujo
- Funciones de Flecha
- Métodos de Array (reduce, forEach, map, filter, find, some, every)

### Historia de Usuario

Como usuario, quiero una aplicación que me permita gestionar y analizar una lista de productos utilizando diversos métodos de array, para obtener información relevante y personalizada de manera eficiente.

### Interface de Producto

```javascript

const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

```

### Criterios de Aceptación

1. **Visualización de Productos**:
   - La aplicación debe mostrar una lista de productos en la página. Puedes interactuar con el DOM o con la consola del navegador.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, `forEach`.

2. **Calcular el Precio Total**:
   - La aplicación debe calcular y mostrar el precio total de todos los productos utilizando el método `reduce`.
   - **Concepto de JavaScript aplicado**: reduce.

3. **Filtrar Productos por Categoría**:
   - La aplicación debe permitir filtrar productos por categoría utilizando el método `filter`.
   - **Concepto de JavaScript aplicado**: filter.

4. **Buscar un Producto por Nombre**:
   - La aplicación debe permitir buscar un producto específico por su nombre utilizando el método `find`.
   - **Concepto de JavaScript aplicado**: find.

5. **Verificar Disponibilidad de Productos**:
   - La aplicación debe verificar si todos los productos están disponibles utilizando el método `every`.
   - **Concepto de JavaScript aplicado**: every.

6. **Obtener Nombres de Productos**:
   - La aplicación debe crear una lista con los nombres de todos los productos utilizando el método `map`.
   - **Concepto de JavaScript aplicado**: map.

7. **Depuración y Manejo de Errores**:
   - Implementar métodos de depuración para el manejo de errores y validación.
   - **Concepto de JavaScript aplicado**: Depuración, Manejo de Errores.