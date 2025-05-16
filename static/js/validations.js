const validateName = (name) => {
    if (!name) return false;
    if (name.length >= 200) return false;
    return true;
};

const validateEmail = (email) => {
    if (!email) return false;
    let lengthValid = email.length <= 100;
    let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let formatValid = re.test(email);
    return lengthValid && formatValid;
};

const validatePhoneNumber = (phoneNumber) => {
    let lengthValid = phoneNumber.length >= 8;
    let re = /^\+\d{3}\.\d{8}$/;
    let formatValid = re.test(phoneNumber);
    return lengthValid && formatValid;
};

const validateFiles = (files) => {
    if (!files || files.length === 0) return false;
    let lengthValid = 1 <= files.length && files.length <= 5;

    return lengthValid;
};

const validateSelect = (select) => {
    if (!select) return false;
    return true;
};

const validateCheckboxes = () => {
    const checkedCount = document.querySelectorAll('.contact-checkbox:checked').length;
    return checkedCount <= 5;
};

const validateDates = (fechaInicioStr, fechaTerminoStr) => {
    if (!fechaInicioStr) return false;
    if (!fechaTerminoStr) return true; 

    if (fechaInicioStr && fechaTerminoStr) {
        let fechaInicio = new Date(fechaInicioStr);
        let fechaTermino = new Date(fechaTerminoStr);

        if (fechaTermino < fechaInicio) {
            return false
        }
    }
    return true
};

const validateSector = (sector) => {
    if (sector.length > 100) return false;
    return true;
}

const validateTemasCheckboxes = () => {
    const checkboxes = document.querySelectorAll('input[name="tema"]:checked');
    return checkboxes.length > 0;
};

const validateForm = () => {
    // obtener elementos del DOM usando el nombre del formulario.
    let myForm = document.forms["myForm"];
    let email = myForm["email"].value;
    let phoneNumber = myForm["phone"].value;
    let name = myForm["nombre"].value;
    let region = myForm["select-region"].value;
    let comuna = myForm["select-comuna"].value;
    let fechaInicioStr = myForm["fecha-inicio"].value;
    let fechaTerminoStr = myForm["fecha-termino"].value;
    let sector = myForm["sector"].value
    let fileInputs = document.querySelectorAll('input[type="file"][name="files"]');
    let files = [];
    const otroTemaChecked = document.getElementById("tema-otro").checked;
    let otroTema = myForm["otro-tema"].value;

    fileInputs.forEach(input => {
        for (let i = 0; i < input.files.length; i++) {
            files.push(input.files[i]);
        }
    });


    // variables auxiliares de validación y función.
    let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) => {
        invalidInputs.push(inputName);
        isValid &&= false;
    };

    // lógica de validación
    if (!validateSelect(region)) {
        setInvalidInput("Region no seleccionada");
    }
    if (!validateSelect(comuna)) {
        setInvalidInput("Comuna no seleccionada");
    }
    if (!validateSector(sector)) {
        setInvalidInput("Sector invalido");
    }
    if (!validateName(name)) {
        setInvalidInput("Nombre invalido");
    }
    if (!validateEmail(email)) {
        setInvalidInput("Email invalido");
    }
    if (!validatePhoneNumber(phoneNumber)) {
        setInvalidInput("Número invalido");
    }
    if (!validateCheckboxes()) {
        setInvalidInput("CheckBoxes (máx. 5)");
    }
    if (!validateDates(fechaInicioStr, fechaTerminoStr)) {
        setInvalidInput("fecha de termino debe ser mayor a la fecha de inicio")
    }
    if (!validateTemasCheckboxes()) {
        setInvalidInput("Debe seleccionar al menos 1 tema");
    }
    if (otroTemaChecked && (!otroTema || otroTema.length < 3 || otroTema.length > 15)) {
        setInvalidInput("Debe especificar el tema si marcó 'Otro'");
    }
    if (!validateFiles(files)) {
    setInvalidInput("Archivos inválidos (deben ser entre 1 y 5)");
    }

    // finalmente mostrar la validación
    let validationBox = document.getElementById("val-box");
    let validationMessageElem = document.getElementById("val-msg");
    let validationListElem = document.getElementById("val-list");
    let formContainer = document.querySelector(".main-container");

    if (!isValid) {
        validationListElem.textContent = "";
        // agregar elementos inválidos al elemento val-list.
        for (input of invalidInputs) {
            let listElement = document.createElement("li");
            listElement.innerText = input;
            validationListElem.append(listElement);
        }
        // establecer val-msg
        validationMessageElem.innerText = "Los siguientes campos son inválidos:";

        // aplicar estilos de error
        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";

        // hacer visible el mensaje de validación
        validationBox.hidden = false;
    } else {
        // establecer mensaje de confirmación
        validationMessageElem.innerText = "¿Está seguro que desea agregar esta actividad?";
        validationListElem.textContent = "";

        // aplicar estilos de confirmación
        validationBox.style.backgroundColor = "#fff3cd";
        validationBox.style.borderLeftColor = "#ff9800";

        // Botón "Sí, estoy seguro"
        let confirmButton = document.createElement("button");
        confirmButton.innerText = "Sí, estoy seguro";
        confirmButton.style.marginRight = "10px";
        confirmButton.addEventListener("click", () => {
            validationMessageElem.innerText = "Hemos recibido su información, muchas gracias y suerte en su actividad.";
            validationListElem.textContent = "";

            // Cambiar estilos a éxito
            validationBox.style.backgroundColor = "#ddffdd";
            validationBox.style.borderLeftColor = "#4CAF50";

            // submit formulario a flask
            myForm.submit();

            // Botón para volver a la portada
            let backToHomeButton = document.createElement("button");
            backToHomeButton.innerText = "Volver a la portada";
            backToHomeButton.addEventListener("click", () => {
                window.location.href = "/";
            });

            validationListElem.appendChild(backToHomeButton);
        });

        // Botón "No, quiero volver"
        let cancelButton = document.createElement("button");
        cancelButton.innerText = "No, no estoy seguro, quiero volver al formulario";
        cancelButton.addEventListener("click", () => {
            myForm.style.display = "block";
            validationBox.hidden = true;
        });

        validationListElem.appendChild(confirmButton);
        validationListElem.appendChild(cancelButton);

        // Mostrar el cuadro
        validationBox.hidden = false;
    }
};

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validateForm);
