// BANDERA: Validar formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar envío del formulario
    clearErrors(); // Limpiar errores anteriores

    // Validar campos
    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    const telefonoValido = validarTelefono();
    const mensajeValido = validarMensaje();

    // Si todos los campos son válidos, enviar el formulario
    if (nombreValido && emailValido && telefonoValido && mensajeValido) {
        alert('Formulario enviado correctamente.');
        // Aquí podrías enviar el formulario al servidor
    }
});

// Función para validar el nombre
function validarNombre() {
    const nombre = document.getElementById('nombre').value.trim();
    if (nombre === '') {
        showError('nombreError', 'El nombre es obligatorio.');
        return false;
    }
    return true;
}

// Función para validar el correo electrónico
function validarEmail() {
    const email = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email
    if (email === '') {
        showError('emailError', 'El correo electrónico es obligatorio.');
        return false;
    } else if (!regex.test(email)) {
        showError('emailError', 'Ingresa un correo electrónico válido.');
        return false;
    }
    return true;
}

// Función para validar el teléfono
function validarTelefono() {
    const telefono = document.getElementById('telefono').value.trim();
    const regex = /^\d{10}$/; // Expresión regular para validar teléfono (10 dígitos)
    if (telefono === '') {
        showError('telefonoError', 'El teléfono es obligatorio.');
        return false;
    } else if (!regex.test(telefono)) {
        showError('telefonoError', 'Ingresa un teléfono válido (10 dígitos).');
        return false;
    }
    return true;
}

// Función para validar el mensaje
function validarMensaje() {
    const mensaje = document.getElementById('mensaje').value.trim();
    if (mensaje === '') {
        showError('mensajeError', 'El mensaje es obligatorio.');
        return false;
    }
    return true;
}

// Función para mostrar errores
function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

// Función para limpiar errores
function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.textContent = '');
}