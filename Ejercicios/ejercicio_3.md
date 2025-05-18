# Ejercicio 3

**Nombre**: Juan Pablo Bustamante Flaño

---
## Observaciones
Tenga en cuenta las siguientes observaciones al realizar el ejercicio:

- El ejercicio es de carácter **personal**; la copia será penalizada con **nota mínima**.
- De ser necesario investigar, usted esta **autorizado a utilizar internet** como herramienta.
- El uso de modelos generativos de lenguaje como **ChatGPT está estrictamente prohibido** y será penalizado con **nota mínima**. 

## Pregunta 1
En el curso hemos hablado sobre cómo el input del usuario puede ser malicioso. Un ejemplo de esto son las inyecciones SQL, una de las vulnerabilidades más populares. Ésta consiste en que input hecho por el usuario permite inyectar código en las sentencias SQL que usamos (cómo cuando guardamos algo en la base de datos).

A pesar de ser una de las vulnerabilidades más recurrentes en aplicaciones web, no es la única donde el input del usuario juega una mala pasada. Otro ejemplo es el llamado **Server Side Template Injection** (SSTI). Investigue y explique brevemente en qué consiste esta vulnerabilidad.

**Respuesta**: 
La vulnerabilidad Server Side Template Injection (SSTI) ocurre cuando una pagina web incorpora entradas de usuario como Jinja para generar respuestas HTML dinámicas de manera insegura, permitiendo que un atacante inyecte expresiones que son luego ejecutadas del lado del servidor.

Por ejemplo, en una aplicación que utiliza el motor de plantillas Jinja2, si se inserta directamente la entrada del usuario en la plantilla sin sanitización:
```python
@app.route("/page")
def page():
    name = request.values.get('name')
    output = Jinja2.from_string('Hello ' + name + '!').render()
    return output
```
Un atacante puede enviar una solicitud como: "http://www.target.com/page?name={{7*7}}"
El motor evaularía la expresión {{7*7}}, resultando en la respuesta: "Hello 49!"

Este comportamiento indica que el motor esta evaluando expresiones provenientes de la entrada de usuario, lo que representa una vulnerabilidad.

Referencia: https://owasp.org/www-project-web-security-testing-guide/v41/4-Web_Application_Security_Testing/07-Input_Validation_Testing/18-Testing_for_Server_Side_Template_Injection

## Pregunta 2

Usted cuenta con el siguiente proyecto de flask:
```bash
flask_app
├── app.py
├── static
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── code.js
│   └── svg
│       └── icon.svg
└── templates
    ├── base.html
    └── ruta.html
```
En donde `app.py` tiene las siguientes rutas:
```python
@app.route("/", methods=["GET"])
def index():
    return render_template("ruta.html")

@app.route("/<num>", methods=["GET"])
def index_param(num):
    return render_template("ruta.html", num=int(num))
```
Y `base.html` tiene la siguiente forma:
```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>{% block title %}{% endblock %}</title>
    {% block css %}{% endblock %}
  </head>
  <body>
    {% block content %}{% endblock %}
    {% block javascript %}{% endblock %}
  </body>
</html>
```

El objetivo de esta pregunta es que usted rellene los bloques de la template `ruta.html` **utilizando funcionalidades de `Jinja`** tal que se cumplan los siguientes requerimientos:

1. Se enlaza al documento HTML el archivo `styles.css`
2. Se incluye el codigo javascript en `code.js`.
3. En caso de que se entregue una variable `num` en el url, se debera mostrar `num` veces la imagen `icon.svg`.
4. En caso de que no se entregue `num`, se debera mostrar un parrafo que diga "*No se entrego un valor*".

**Respuesta:**

```html
{% extends 'base.html' %}

{% block title %}Ruta{% endblock %}

{% block css %}
    <link rel="stylesheet" href="{{ url_for('static', filename='css/styles.css') }}">
{% endblock %}

{% block content %}
    <h1>RUTA!</h1>
    {% if num is defined %}
        {% for i in range(num) %}
            <img src="{{ url_for('static', filename='svg/icon.svg') }}">
        {% endfor %}
    {% else %}
        <p><em>No se entrego un valor</em></p>
    {% endif %}
{% endblock %}

{% block javascript %}
    <script src="{{ url_for('static', filename='js/code.js') }}"></script>
{% endblock %}
```
**Hint:** para ubicar archivos use la funcion `url_for` de `Jinja`.

## Pregunta 3
Usted está haciendo una aplicación Flask y su archivo de rutas se ve así:

```python
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/exito')
def exito():
  return "Respondiste correctamente!"

@app.route('/malo')
def malo():
  return "Respondiste mal :("

@app.route('/pregunta', method=('GET', 'POST'))
def pregunta():
  return render_template('pregunta.html')
```

En este momento la aplicación envía el HTML *pregunta.html* con un formulario como el siguiente:

```html
<form action="pregunta" method="post" enctype="multipart/form-data">
  <label for="pregunta">Pregunta</label>
  <input id="mi-input" name="pregunta" type="text">
  <button type="submit">Enviar</button>
</form>
```

Complete la función `pregunta` para que al enviar el formulario valide que el texto enviado en el formulario:
- No tenga la palabra "pizza" (Solo la palabra, algo como "pixxzza" está permitido)
- Tenga al menos 5 caracteres y máximo 30
- Tenga por lo menos un carácter y un digito. DEBE hacer esta validación con una expresión regular.

HINT: expresion = r'^(?=.*[a-zA-Z])(?=.*\d)'

Si cumple todas estas condiciones redireccione al usuario a la ruta `exito`, de lo contrario redirija a la ruta `malo`. Sólo puede programar en Python en el espacio que se proporciona en la respuesta.

Reciba el formulario si el método es `POST`, tome el input, escriba y use la función `validar_input` para validar el input.

**Respuesta**:

```python
from flask import Flask, request, render_template, redirect, url_for
import re

app = Flask(__name__)

@app.route('/exito')
def exito():
  return "Respondiste correctamente"

@app.route('/malo')
def malo():
  return "Respondiste mal"

def validar_input(mi_input):
  if "pizza" in mi_input:
    return False
  if len(mi_input) < 5 or len(mi_input) > 30:
    return False
  expresion = r'^(?=.*[a-zA-Z])(?=.*\d)'
  return re.search(expresion, mi_input) is not None

@app.route('/pregunta', methods=['GET', 'POST'])
def pregunta():
  if request.method == 'POST':
    mi_input = request.form.get('pregunta', '')
    if validar_input(mi_input):
      return redirect(url_for('exito'))
    else:
      return redirect(url_for('malo'))
  return render_template('pregunta.html')
```