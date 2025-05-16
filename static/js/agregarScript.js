// Filtrar comunas por region
document.getElementById('select-region').addEventListener('change', function () {
    const regionId = this.value;
    const comunaSelect = document.getElementById('select-comuna');
    const options = comunaSelect.querySelectorAll('option');

    options.forEach(opt => {
        const comunaRegionId = opt.getAttribute('data-region-id');
        if (!comunaRegionId || regionId === "") {
            opt.hidden = false;
        } else {
            opt.hidden = comunaRegionId !== regionId;
        }
    });

    comunaSelect.value = "";
});

// Checkboxees
const checkboxes = document.querySelectorAll('.contact-checkbox');
const maxSelected = 5;

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // Lógica de mostrar/ocultar inputs
        const inputDiv = document.getElementById(`input-${checkbox.value}`);
        if (checkbox.checked) {
            inputDiv.style.display = 'block';
        } else {
            inputDiv.style.display = 'none';
            const input = inputDiv.querySelector('input');
            if (input) input.value = '';
        }
    });
});

// Fecha y hora local
window.addEventListener('DOMContentLoaded', () => {
    const inputInicio = document.getElementById('fecha-inicio');
    const inputTermino = document.getElementById('fecha-termino');

    const now = new Date();

    // Función para formatear a 'YYYY-MM-DDTHH:MM'
    function formatDatetime(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const inicioStr = formatDatetime(now);
    inputInicio.value = inicioStr;

    // Crear nueva fecha con 3 horas adicionales
    const terminoDate = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    const terminoStr = formatDatetime(terminoDate);
    inputTermino.value = terminoStr;
});

// Otro tema
document.addEventListener("DOMContentLoaded", () => {
    const otroCheckbox = document.getElementById("tema-otro");
    const otroTemaContainer = document.getElementById("otro-tema-container");

    otroCheckbox.addEventListener("change", () => {
        if (otroCheckbox.checked) {
            otroTemaContainer.style.display = "block";
        } else {
            otroTemaContainer.style.display = "none";
        }
    });
});

// mas imagenes
document.addEventListener("DOMContentLoaded", () => {
    const fileInputsContainer = document.getElementById("file-inputs");
    const addFileBtn = document.getElementById("add-file-btn");
    const maxFiles = 5;

    addFileBtn.addEventListener("click", () => {

        const newInput = document.createElement("input");
        newInput.type = "file";
        newInput.name = "files";
        newInput.classList.add("file-input");
        newInput.accept = "image/*,.pdf";

        fileInputsContainer.appendChild(newInput);
    });
});