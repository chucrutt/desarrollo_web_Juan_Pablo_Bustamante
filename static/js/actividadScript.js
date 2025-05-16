document.addEventListener('DOMContentLoaded', function () {
    const filas = document.querySelectorAll('.actividad-fila');
    filas.forEach(fila => {
        fila.addEventListener('click', () => {
            const id = fila.dataset.id;
            window.location.href = `/actividad/${id}`;
        });
    });
});