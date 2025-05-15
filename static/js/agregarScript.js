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