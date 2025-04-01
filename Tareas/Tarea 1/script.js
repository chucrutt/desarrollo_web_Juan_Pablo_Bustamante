function toggleMenu() {
    document.getElementById("menu").classList.toggle("open");
}
document.addEventListener("DOMContentLoaded", function () {
    const regionesYComunas = {
        "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
        "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
        "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Tocopilla", "María Elena"],
        "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Freirina", "Huasco", "Alto del Carmen"],
        "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "Vicuña", "Illapel", "Los Vilos", "Salamanca", "Ovalle", "Monte Patria", "Combarbalá", "Punitaqui", "Río Hurtado"],
        "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón", "San Antonio", "Cartagena", "El Quisco", "El Tabo", "Algarrobo", "Los Andes", "San Felipe", "Quillota", "La Calera", "Limache"],
        "Metropolitana": ["Santiago", "Puente Alto", "Maipú", "Las Condes", "Providencia", "La Florida", "Ñuñoa", "San Bernardo", "Peñalolén", "Pudahuel", "Quilicura", "Independencia", "Conchalí", "Recoleta", "Lo Barnechea", "Vitacura", "Cerrillos", "Cerro Navia", "El Bosque", "Estación Central", "Huechuraba", "La Cisterna", "La Granja", "La Pintana", "Lo Espejo", "Lo Prado", "Macul", "Pedro Aguirre Cerda", "Quinta Normal", "Renca", "San Joaquín", "San Miguel", "San Ramón"],
        "O'Higgins": ["Rancagua", "Rengo", "San Fernando", "Santa Cruz", "San Vicente", "Pichilemu", "Machalí", "Graneros", "Doñihue", "Codegua", "Chimbarongo"],
        "Maule": ["Talca", "Curicó", "Linares", "Cauquenes", "Molina", "San Javier", "Constitución", "Parral", "Longaví", "Colbún", "Retiro", "Yerbas Buenas"],
        "Ñuble": ["Chillán", "Bulnes", "San Carlos", "Yungay", "Quirihue", "Coelemu", "Cobquecura", "El Carmen", "Pemuco", "Quillón"],
        "Biobío": ["Concepción", "Coronel", "Talcahuano", "Los Ángeles", "San Pedro de la Paz", "Lota", "Hualpén", "Tomé", "Cabrero", "Nacimiento", "Mulchén", "Lebu"],
        "La Araucanía": ["Temuco", "Villarrica", "Angol", "Pucón", "Padre Las Casas", "Nueva Imperial", "Carahue", "Lautaro", "Victoria", "Collipulli"],
        "Los Ríos": ["Valdivia", "La Unión", "Panguipulli", "Río Bueno", "Futrono", "Lago Ranco", "Paillaco", "Lanco", "Mariquina"],
        "Los Lagos": ["Puerto Montt", "Castro", "Ancud", "Quellón", "Puerto Varas", "Osorno", "Frutillar", "Llanquihue", "Calbuco", "Chaitén"],
        "Aysén": ["Coyhaique", "Aysén", "Chile Chico", "Cochrane", "Puerto Cisnes", "Tortel", "Guaitecas", "O'Higgins"],
        "Magallanes": ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos", "Puerto Williams", "Timaukel", "Primavera", "Torres del Paine"]
    };

    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");

    // Poblar las opciones de regiones dinámicamente
    regionSelect.innerHTML = '<option value="">Seleccione una región</option>';
    Object.keys(regionesYComunas).forEach(region => {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });

    regionSelect.addEventListener("change", function () {
        const regionSeleccionada = regionSelect.value;
        comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';

        if (regionSeleccionada && regionesYComunas[regionSeleccionada]) {
            regionesYComunas[regionSeleccionada].forEach(comuna => {
                const option = document.createElement("option");
                option.value = comuna;
                option.textContent = comuna;
                comunaSelect.appendChild(option);
            });
        }
    });
});

function toggleInput(inputId) {
    var inputField = document.getElementById(inputId);
    if (inputField.style.display === "none" || inputField.style.display === "") {
        inputField.style.display = "block";
    } else {
        inputField.style.display = "none";
    }
}