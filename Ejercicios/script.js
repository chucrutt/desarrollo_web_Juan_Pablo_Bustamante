// Aquí puede poner su implementación de obtenerDatosBitcoin para hacer PRUEBAS, la solucion se entrega en el markdown



// desde acá hacia abajo no cambien nada

function procesarDatos(datos) {
  return datos.prices.map(([timestamp, precio]) => {
    const fecha = new Date(timestamp);
    return [fecha.getTime(), precio];
  });
}

async function crearGrafico() {
  try {
    const datos = await obtenerDatosBitcoin();
    const precios = procesarDatos(datos);

    Highcharts.chart('container', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Precio de Bitcoin (últimos 30 días)'
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Fecha'
        }
      },
      yAxis: {
        title: {
          text: 'Precio (USD)'
        }
      },
      tooltip: {
        xDateFormat: '%d/%m/%Y',
        shared: true
      },
      series: [{
        name: 'Bitcoin',
        data: precios,
        color: '#FF9900'
      }],
      legend: {
        enabled: true
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });

  } catch (error) {
    console.error('Error al crear el gráfico:', error);
    document.getElementById('container').innerHTML = '<p style="color:red;">No se pudieron cargar los datos.</p>';
  }
}

crearGrafico();

