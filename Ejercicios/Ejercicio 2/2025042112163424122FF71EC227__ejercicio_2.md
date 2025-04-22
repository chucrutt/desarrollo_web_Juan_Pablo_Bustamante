# Ejercicio 2
**Nombre**: Juan Pablo Bustamante Flaño

---

## Observaciones
Tenga en cuenta las siguientes observaciones al realizar el ejercicio:

- El ejercicio es de carácter **personal**; la copia será penalizada con **nota mínima**.
- De ser necesario investigar, usted esta **autorizado a utilizar internet** como herramienta. Sin embargo, **debe citar** toda fuente que utilice para responder las preguntas.
- El uso de modelos generativos de lenguaje como **ChatGPT está estrictamente prohibido** y será penalizado con **nota mínima**
- En ambas preguntas se le pide incluir referencias para su desarrollo. No se compliquen con citar de cierta forma, solo que se de a entender de donde obtuvieron la info que que utilizaron.

## Pregunta 1

¿Qué es el ataque de "Cross Site Scripting" (XSS) y cómo podría prevenirse? Describa un escenario en el cual este tipo de ataque podría ser especialmente peligroso. Para responder esta pregunta, puede basarse en [este articulo de la OWASP](https://owasp.org/www-community/attacks/xss/).

**Respuesta**: 
El ataque Cross Site Scripting (XSS) es un tipo de inyección que consiste en enviar scripts maliciosos a sitios web de confianza, desde el navegador del atacante hacia otros usuarios del sitio. Las fallas que permiten este tipo de ataques suelen deberse al mal manejo de entradas de usuario por parte del desarrollador, al no validarlas ni codificarlas correctamente. Como el usuario confía en que se encuentra en un sitio legítimo, ejecuta el script sin saber que está siendo atacado. Este tipo de ataques puede permitir al atacante acceder a cookies, información de inicio de sesión u otros datos sensibles almacenados en el navegador y utilizados por el sitio web, e incluso modificar el contenido del HTML.

Para poder prevenir este tipo de ataques podemos clasificarlos en 3 tipos:
- XSS Reflejado: No se almacena, sino que se ejecuta cuando la victima hace clic en un enlace. El script malicioso se encuentra en una solicitud al sitio web, como en un URL y se refleja inmediatamente en la respuesta del servidor.
- XSS Almacenado: El script se almacena en el servidor y luego se envía a los usuarios cuando visitan la página web que muestra ese contenido. Es más peligroso pues afecta a todo el que visite el sitio web.
- XSS Basado en DOM: Ocurre cuando el script se ejecuta al modificar el modelo de objetos del documento (DOM) en el navegador. Es el código de JavaScript que introduce la vulnerabilidad al manipular datos inseguros directamante.

Estrategias de prevención:
1. Modificar y validar los datos para que no sean interpretados como comando o código, sino como datos literales (escapar datos)
    - En HTML usar caracteres como <, >, &, ", ' y /
    - Validar datos y entradas en JavaScript para evitar inyecciónes de código
    - Si se permite que el usuario pueda personalizar el estilo del sitio web usando variables dentro de CSS deben validarse
2. Usar API's seguras
    - Usar frameworks o funciones que automaticamente eviten XSS, como React, Angular o templating engines que escapan el contenido por defecto
3. Evitar funciones peligrosas
    - No usar innerHTML, document.write(), eval(), setTimeout(), con cadenas generadas dinámicamente
    - Preferir funciones como textContent o createElement
4. Utilizar Content Security Policy (CSP)
    - Implementar una política CSP para restringir de dónde pueden cargarse y ejecutarse scripts.

Fuentes:
- Definición de ataques XSS: https://owasp.org/www-community/attacks/xss/
- Tipos y clasificación: https://owasp.org/www-community/Types_of_Cross-Site_Scripting
- Estrategias de prevención: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html

## Pregunta 2
Como se mencionó en auxiliar, existen varias herramientas que se pueden utilizar para programar aplicaciones web más complejas que las que hemos visto en el curso. Esta pregunta busca que ud. investigue 3 librerías de javascript o *frameworks* de front-end y describa sus principales características, ventajas, desventajas y ejemplos de uso. Finalmente, indique cuál de las tecnologías presentadas utilizaria para implementar su página web personal y por qué.

**Nota:** Se espera que ud. escriba un breve resumen de cada tecnología, seguido de al menos 2 ventajas y 2 desventajas de cada una.

**Respuesta**:
1. React
    - React es conocido por tener una curva de aprendizaje "gentil" y ser una libreria permite flexibilidad. Sin embargo, para aprovechar todo el potencial de React, hay aprender sobre herramientas adicionales como Redux (para manejar el estado) y React Router (para la navegación).
    - React es muy adaptable y se usa tanto en aplicaciones pequeñas como en grandes proyectos. Tiene una comunidad enorme que ofrece apoyo, tutoriales y recursos. Además, React se usa mucho en empresas grandes como Facebook, Instagram y Airbnb.
    - La documentación de React es excelente, clara y bien organizada. Además, hay muchos tutoriales adicionales en internet y cursos para ayudar a los desarrolladores.
    - React es uno de los frameworks más populares y utilizados en la actualidad, con una gran adopción tanto por parte de startups como de grandes empresas.
    - El ecosistema de React es robusto, con muchas bibliotecas y herramientas para gestionar el estado, enrutamiento, animaciones, pruebas, etc.
2. Angular
    - Angular es de las tres opciones el más complejo de aprender, principalmente porque debes usar typescript además de JavaScript. Es un framework completo, lo que significa que trae muchas funcionalidades integradas (como el manejo de rutas y formularios).
    - Angular es un framework muy estructurado y adecuado para grandes aplicaciones empresariales. Su comunidad es grande, con muchas empresas que lo usan, como Google, Microsoft y Adobe. Su ecosistema es más rígido comparado con React, pero esto también le da ventajas en proyectos más complejos.
    - La documentación oficial de Angular es larga y con mucho detalle, pero puede resultar abrumadora por la complejidad del framework.
    - Angular es muy popular en aplicaciones grandes y en grandes empresas, aunque en proyectos más pequeños ha sido reemplazado por frameworks más ligeros como React y Vue.
    - Angular tiene un ecosistema muy completo, pero al mismo tiempo esto lo hace más pesado.
3. Vue.js
    - Vue tiene una curva de aprendizaje mucho más baja que Angular y React, con una sintaxis mucho más intuitiva.
    - Vue tiene una comunidad más pequeña que React y Angular, sin embargo sigue siendo muy activa y está creciendo rápidamente.
    - La documentación de Vue es conocida por ser clara, completa y fácil de seguir.
    - Vue está ganando popularidad rápidamente, especialmente en proyectos de pequeña a mediana escala, pero su adopción en grandes empresas todavía es más limitada en comparación con React y Angular.
    - Vue tiene un buen ecosistema, con bibliotecas como Vuex para el manejo del estado y Vue Router para la navegación. Sin embargo, tiene un ecosistema más pequeño en comparación con React.

Si tuviera que elegir un framework para crear una página web personal o para comenzar a aprender, me enfocaría en tres aspectos principalmente: primero, que sea fácil de aprender y utilizar; segundo, que tenga una alta demanda laboral, es decir, que sea ampliamente utilizado tanto por empresas grandes como pequeñas; y tercero, que tenga proyección a futuro, ya sea porque el propio framework se mantenga vigente o si en el futuro surge un nuevo framework muy popular que se base en gran medida en el que ya manejo, también sería una ventaja. Por lo tanto, creo que la mejor opción dentro de estos 3 frameworks/librerias es React.


Fuentes:
- https://2024.stateofjs.com/en-US/libraries/front-end-frameworks/
- https://survey.stackoverflow.co/2024/technology
- https://es.legacy.reactjs.org/docs/getting-started.html
- https://docs.angular.lat/docs
- https://vuejs.org/guide/introduction
- https://amela.tech/a-detailed-2024-comparison-angular-vs-react-vs-vue-js/
