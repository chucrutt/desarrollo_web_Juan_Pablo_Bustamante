# Ejercicio 1

**Nombre**: Juan Pablo Bustamante Flaño

---

## Pregunta 1 (6 puntos)

# 1.1 (3 puntos)
Explique por que el realizar validaciones del input del usuario en el front-end es una facilidad pero no una medida de seguridad. 

**Respuesta**: El tipo de validaciones de input del usuario que se realizan en el front-end no son medidas de seguridad pues se ejecutan en el navegador que el usuario está utilizando y no en el servidor, por lo tanto las validaciones que podemos hacer en el front-end son, por ejemplo, el formato de su e-mail, la longitud de la contraseña, caracteres no permitidos, etc. (facilidades para el usuario). Sin embargo no podemos validar en el front-end un ataque de inyección SQL o manipulacion de datos ya que estas medidas de seguridad se deben realizar mediante otras reglas en el back-end.

# 1.2 (3 puntos)
Explique en detalle el rol de **HTML, CSS y JavaScript** en la creación del front-end de una aplicación web. Especifique la función de cada tecnología y cómo se combinan para construir una interfaz interactiva y visualmente atractiva.

**Respuesta:**: HTML, CSS y JavaScript funcionan en conjunto para definir el resulado final de la página web.
HTML determina su estructura, es la "columna vertebral", el esqueleto de la página web, organiza el contenido usando etiquetas como <head> o <body>
CSS por otro lado, se encarga de darle el estilo y diseño a los elementos del HTML, mejora la legibilidad y usabilidad para el usario.
Por último, JavaScript es el lenguaje de programación que se encarga de los elementos interactivos dentro de la página web, como clics, inputs de usuario, animaciones, etc. y de comunicarse con el servidor para entregar la información necesaria al front-end.


## Pregunta 2 (6 puntos)
A continuación, se presentan dos tareas prácticas:  

1. **(3 puntos)** Implementar un código que reciba un nombre ingresado por el usuario y muestre un mensaje de bienvenida.  
   - Si el usuario se llama **[Tu Nombre]**, debe mostrarse un mensaje especial en negrita y en color azul.  
   - El contenido debe actualizarse sin recargar la página.  

2. **(3 puntos)** Implementar un contador de calificación con dos botones para aumentar y disminuir la nota actual.  
   - La calificación debe tener valores apropiados.  
   - La calificación debe actualizarse sin recargar la página.  

### Código HTML:
```html
<div>
    <h3>Parte 1: Mensaje de Bienvenida</h3>
    <label for="nombre">Ingrese su nombre:</label>
    <input type="text" id="nombre">
    <button type="button" id="btn-enviar">Enviar</button>
    <p id="mensaje"></p>
</div>

<hr>

<div>
    <h3>Parte 2: Contador de Calificación</h3>
    <p>Nota actual: <span id="calificacion">1</span></p>
    <button type="button" id="btn-disminuir">Disminuir</button>
    <button type="button" id="btn-aumentar">Aumentar</button>
</div>
```

Implemente un sistema para modificar la nota actual, utilizando la plantilla disponible más abajo, y programe únicamente donde se le indica. Se espera que tras apretar un botón, la nota se actualice sin la necesidad de recargar la página. No está permitido modificar el HTML.

**Respuesta**:
```js
// Obtener elementos para el mensaje de bienvenida
const inputNombre = document.getElementById("nombre");
const btnEnviar = document.getElementById("btn-enviar");
const mensaje = document.getElementById("mensaje");

// Obtener elementos para el contador
const calificacion = document.getElementById("calificacion");
const btnDisminuir = document.getElementById("btn-disminuir");
const btnAumentar = document.getElementById("btn-aumentar");

// Calificación inicial
let notaActual = 1;

// Función para mostrar mensaje de bienvenida
const mostrarMensaje = () => {
    const nombreIngresado = inputNombre.value.trim();
    if (nombreIngresado) {
        if (nombreIngresado.toLowerCase() === "juan pablo bustamante") {
            mensaje.innerHTML = `<strong style='color: blue;'>¡Bienvenido, ${nombreIngresado}!</strong>`;
        } else {
            mensaje.innerText = `Bienvenido, ${nombreIngresado}!`;
        }
    }
};

// Función para aumentar la calificación
const aumentarCalificacion = () => {
    if (notaActual < 7) {
        notaActual++;
        calificacion.innerText = notaActual;
    }
};

// Función para disminuir la calificación
const disminuirCalificacion = () => {
    if (notaActual > 1) {
        notaActual--;
        calificacion.innerText = notaActual;
    }
};

// Asignar eventos
btnEnviar.addEventListener("click", mostrarMensaje);
btnDisminuir.addEventListener("click", disminuirCalificacion);
btnAumentar.addEventListener("click", aumentarCalificacion);
