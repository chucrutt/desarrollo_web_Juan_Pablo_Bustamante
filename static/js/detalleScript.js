document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.getElementById("close-modal");

    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = img.src;
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        modalImg.src = "";
    });

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            modalImg.src = "";
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const actividadId = window.location.pathname.match(/(\d+)/)[0];

    function cargarComentarios() {
        fetch(`/api/comentarios/${actividadId}`)
            .then(r => r.json())
            .then(data => {
                const cont = document.getElementById('comentarios-listado');
                if (data.length === 0) {
                    cont.innerHTML = "<h3>Comentarios</h3><p>No hay comentarios aún.</p>";
                    return;
                }
                cont.innerHTML = `<h3>Comentarios</h3>
                    <ul class="lista-comentarios">
                        ${data.map(c => `
                            <li>
                                <span class="comentario-fecha">${c.fecha}</span>
                                <strong>${c.nombre}</strong>:<br>
                                <span>${c.texto}</span>
                            </li>
                        `).join('')}
                    </ul>`;
            });
    }

    cargarComentarios();

    // Manejo del formulario
    const form = document.querySelector('.form-comentario');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const nombre = form.nombre.value.trim();
            const comentario = form.comentario.value.trim();
            let errores = [];
            if (nombre.length < 3 || nombre.length > 80) {
                errores.push("El nombre debe tener entre 3 y 80 caracteres.");
            }
            if (comentario.length < 5 || comentario.length > 300) {
                errores.push("El comentario debe tener entre 5 y 300 caracteres.");
            }
            const errorDiv = document.getElementById('comentario-errores');
            errorDiv.innerHTML = errores.join('<br>');
            if (errores.length > 0) return;

            fetch(`/api/comentarios/${actividadId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, comentario })
            })
            .then(r => r.json().then(data => ({ok: r.ok, data})))
            .then(res => {
                if (!res.ok) {
                    errorDiv.innerHTML = (res.data.errores || ["Error al agregar comentario"]).join('<br>');
                } else {
                    form.reset();
                    errorDiv.innerHTML = "";
                    cargarComentarios();
                }
            })
            .catch(() => {
                errorDiv.innerHTML = "Error de conexión.";
            });
        });
    }
});