

const dataAlert = {
    aprobado: {
        icon: "✓",
        title: "Éxito",
        msg: "El mensaje fue enviado correctamente.",
        status: "success",

    },
    error: {
        icon: "✕",
        title: "Error",
        msg: "Hubo un problema al enviar el formulario.",
        status: "error",

    },
    alert: {
        icon: "!",
        title: "Atención",
        msg: "Faltan completar algunos campos obligatorios.",
        status: "warning",
    },
    info: {
        icon: "i",
        title: "Información",
        msg: "Estamos procesando tu solicitud.",
        status: "info",
    },
    emailInvalido: {
        icon: "!",
        title: "Email inválido",
        msg: "El email debe contener '@' y '.'",
        status: "warning",
    }
}

const mostrarAlerta = (data, timeAlert = 3000) => {

    const container = document.getElementById("alert-container");

    const alert = document.createElement("div");
    alert.className = `alert ${data.status}`;

    alert.innerHTML = `
        <div class="alert-icon">
            ${data.icon}
        </div>

        <div class="alert-content">
            <h4>${data.title}</h4>
            <p>${data.msg}</p>
        </div>

        <button class="alert-close">&times;</button>
    `;

    container.appendChild(alert);

    // Botón cerrar
    alert.querySelector(".alert-close").addEventListener("click", () => {
        removerAlert(alert);
    });

    // Se elimina automáticamente a los 4 segundos
    setTimeout(() => {
        removerAlert(alert);
    }, timeAlert);
}

const removerAlert = (alert) => {

    alert.style.opacity = "0";
    alert.style.transform = "translateX(100px)";

    setTimeout(() => {
        alert.remove();
    }, 300);

}


const validarEmail = (email) => {
    return email.includes("@") && email.includes(".");
}

const validarFormulario = (e) => {
    e.preventDefault();
    const campos = {
        nombre: document.getElementById("nombre").value.trim(),
        email: document.getElementById("email").value.trim(),
        asunto: document.getElementById("asunto").value.trim(),
        mensaje: document.getElementById("mensaje").value.trim(),
    }

    const hayVacios = Object.values(campos).some(valor => valor == "");
    if (hayVacios) {
        mostrarAlerta(dataAlert.alert);
        return;
    }
    else if (!validarEmail(campos.email)) {
        mostrarAlerta(dataAlert.emailInvalido);
        return;
    }
    else {
        mostrarAlerta(dataAlert.aprobado);
        e.target.reset();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario-contacto");
    if (form) {
        form.addEventListener("submit", validarFormulario);
    }
});
