# Ejercicio 4

**Nombre**: Juan Pablo Bustamante Flaño

---
## Observaciones
Tenga en cuenta las siguientes observaciones al realizar el ejercicio:

- El ejercicio es de carácter **personal**; la copia será penalizada con **nota mínima**.
- De ser necesario investigar, usted esta **autorizado a utilizar internet** como herramienta.
- El uso de modelos generativos de lenguaje como **ChatGPT está estrictamente prohibido** y será penalizado con **nota mínima**. 

## Pregunta 1

HTTP es un protocolo *stateless*, esto significa que no existe ninguna relación entre dos pares (request, response). Esto es particularmente problematico al intentar mantener la coherencia entre una cadena de requests dependientes como por ejemplo el manipular un carrito de compras en un sitio de e-commerce. Como se ha mencionado en clases, una solución para este problema es el uso de **cookies**, las cuales nos permiten mantener un mismo contexto para varias requests. 

Si bien las cookies son muy utiles para mantener una o mas sesiones mientras nos comunicamos con un servidor web, el usarlas o no es una decision moralmente no trivial. En efecto, a lo largo del tiempo el uso de las cookies ha sido cuestionado en numerosas ocasiones.

El objetivo de esta pregunta es que usted investigue las razones por las que el uso de las cookies es controversial y las explique con sus propias palabras.

**Respuesta**:
Una cookie es un pequeño archivo de datos que se guarda en el navegador del usuario. Esta puede ser:

- De primera parte, creada por el sitio que visitas con el propósito de guardar información como tu sesión iniciada, recordar tu ubicación o conservar preferencias como el modo oscuro.

- De tercera parte; estas son las consideradas más controversiales, ya que son creadas principalmente por anuncios externos con el propósito de rastrear tu actividad entre diferentes sitios web y mostrar anuncios dirigidos según los intereses del usuario.

Los principales problemas con las cookies de terceros son que generan incomodidad por razones de privacidad y que puedes recibir anuncios personalizados incluso si no diste tu consentimiento claro. Aunque las cookies en sí mismas no son programas y no pueden ejecutar código ni afectar directamente el computador del usuario, algunas personas han aprovechado el hecho de que las cookies de terceros pueden seguirte a través de diferentes sitios web y, por medio de cookies maliciosas, espiar sin consentimiento, vulnerando la privacidad o facilitando ataques más serios, como el robo de datos de inicio de sesión.

Con el propósito de resguardar la privacidad y seguridad de los usuarios, se han creado leyes para evitar que los sitios instalen cookies sin el consentimiento del usuario. Esto ha llevado a los reconocidos avisos de "aceptar cookies". Sin embargo, se han generado muchos problemas con los avisos de cookies: muchas veces el botón de "aceptar todas" suele ser prominente y fácil de presionar; por otro lado, rechazar todas o algunas de las cookies a menudo requiere seleccionar manualmente entre varias opciones y menús complejos. Algunos sitios incluso presentan "cookie walls", que no te permiten ingresar al sitio si no aceptas algunas de las cookies. Otras páginas web han diseñado incorrectamente los avisos de cookies, y rechazar todas puede impedir que funciones básicas del sitio operen correctamente.

Algunas de las soluciones más populares para estos problemas son: usar extensiones para tu navegador que oculten o rechacen automáticamente las cookies de terceros y/o configurar tu navegador (si este lo permite) para bloquear las cookies de terceros por defecto.

## Pregunta 2

Como vimos en el auxiliar, al usar la función **fetch** de Javascript estamos cargando un recurso desde una URL diferente a la que se esta usando. Por esto pueden haber problemas de Cross Origin Request Sharing o **CORS** por sus siglas en inglés.

Investigue y explique qué es CORS. Detalle por qué es importante este mecanismo (**Hint**: Las peticiones AJAX llevan las cookies que se tienen en el sitio objetivo). Nombre una cabecera HTTP de solicitud y una cabecera HTTP de respuesta asociado a este mecanismo.

**Respuesta**:
CORS (Cross Origin Resource Sharing) es una forma que tienen los servidores web de decirle a los navegadores que tienen permitido pedir datos o autorizar que recursos sean cargados desde otro sitio web diferente al suyo (otro dominio, puerto o protocolo). Por defecto, los navegadores no permiten esto para proteger la seguridad del usuario, pero si el servidor de la página web lo permite (usando cabeceras especiales llamadas CORS), puede permitirlo.

Para alguna páginas web es sumamente útil usar información externa, conectar con otros servicios o compartir contenido. Como esto abre una nueva vulnerabilidad, el protocolo de CORS funciona como una capa de seguridad para evitar que tus datos sean leidos desde otros sitios sin autorización.

Cuando una página web hace una petición AJAX (como con fetch() o XMLHttpRequest) a otro sitio, esas peticiones pueden incluir cookies del usuario almacenadas en ese sitio. Por ejemplo, si estás logueado en tu banco, y otra página (maliciosa) hace una petición a ese banco usando AJAX, podría acceder a tu información personal si no existiera CORS.

CORS evita esto al exigir que el servidor del banco diga explícitamente que confía en el otro sitio para pedir esa información, si el servidor no lo permite, el navegador bloquea la solicitud.

Como se menciona en esta guía de CORS (https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) para hacer una solicitud se suele usar el encabezado ORIGIN (ej. Origin: https://developer.mozilla.org:80) y como respuesta el servidor devuelve un encabezado Acces-Controll-Allow-Origin que permite que se pueda acceder a ese recurso desde cualquier origen (Access-Control-Allow-Origin: *) o alguno/s en particular (Access-Control-Allow-Origin: https://foo.example).

## Pregunta 3: Implementación Práctica

Para esta pregunta, deberá implementar una solución que demuestre su comprensión de AJAX y Promesas utilizando la API pública de CoinGecko. Esta API proporciona datos históricos de criptomonedas sin necesidad de autenticación.

Endpoint a utilizar: `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily`

Junto con este enunciado, se adjuntan 2 archivos, index.html y script,js. Los cuales gráfican el resultado de llamar a este endpoint usando highcharts. Podrá notar que falta la función obtenerDatosBitcoin(), la cual ustedes deberán programar para que cumpla con ser:
- Una función asincrona (Para poder llamarla en paralelo)
- Utilice bloques de ´try´ y ´catch´, manejando posibles errores.

**Solo deben editar script.js, en particular la función obtenerDatosBitcoin()**. Entreguen acá abajo su implementación de la función obtenerDatosBitcoin(), y solo esta función, asuma que el resto de script.js está disponible, y es con este que se probará el funcionamiento de su solución:

```javascript
async function obtenerDatosBitcoin() {
  const url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily';
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`Error en la respuesta: ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos.prices.map(p => [p[0], p[1]]);
  } catch (error) {
    console.error("Error al obtener los datos de Bitcoin:", error);
    return [];
  }
}
```

HINT: Recuerde que su función debe ser **asincrona** y que su solución debe al intentar llamar a un endpoint erroneo, mostrar en **consola** un error.
