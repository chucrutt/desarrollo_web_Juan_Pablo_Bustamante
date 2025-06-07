document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/actividades_por_dia')
        .then(response => response.json())
        .then(data => {
            const fechas = data.map(item => item.fecha);
            const cantidades = data.map(item => item.cantidad);

            Highcharts.chart('graficos', {
                chart: { type: 'line' },
                title: { text: 'Cantidad de Actividades por Día' },
                xAxis: {
                    categories: fechas,
                    title: { text: 'Día' }
                },
                yAxis: {
                    title: { text: 'Cantidad de Actividades' },
                    allowDecimals: false
                },
                series: [{
                    name: 'Actividades',
                    data: cantidades
                }]
            });
        });

    // Gráfico de torta por tipo de actividad
    fetch('/api/actividades_por_tema')
        .then(response => response.json())
        .then(data => {
            const seriesData = data.map(item => ({
                name: item.tema,
                y: item.cantidad
            }));

            Highcharts.chart('grafico-torta', {
                chart: { type: 'pie' },
                title: { text: 'Total de Actividades por Tipo' },
                series: [{
                    name: 'Cantidad',
                    colorByPoint: true,
                    data: seriesData
                }]
            });
        });

    // Gráfico de barras por mes y franja horaria
    fetch('/api/actividades_por_mes_y_franja')
        .then(response => response.json())
        .then(data => {
            Highcharts.chart('grafico-barras', {
                chart: { type: 'column' },
                title: { text: 'Actividades por Mes y Franja Horaria' },
                xAxis: {
                    categories: data.meses,
                    title: { text: 'Mes' }
                },
                yAxis: {
                    min: 0,
                    title: { text: 'Cantidad de Actividades' },
                    allowDecimals: false
                },
                series: data.series
            });
        });
});