document.addEventListener("DOMContentLoaded", function () {
  const patenteInput = document.querySelector("#patente");
  const modeloInput = document.querySelector("#modelo");
  const marcaInput = document.querySelector("#marca");
  const anioFabInput = document.querySelector("#anio-fab");
  const kmInput = document.querySelector("#km");

  const patenteFeedback = document.querySelector("#patente-feedback");
  const modeloFeedback = document.querySelector("#modelo-feedback");
  const marcaFeedback = document.querySelector("#marca-feedback");
  const anioFabFeedback = document.querySelector("#anio-fab-feedback");
  const kmFeedback = document.querySelector("#km-feedback");

  function validarPatente(patente) {
    const regex = /^[A-Z]{3}[0-9]{3}$|^[A-Z]{2}[0-9]{3}[A-Z]{2}$/;
    return regex.test(patente);
  }

  function validarTextoSoloLetras(texto) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(texto);
  }

  function validarModelo(modelo) {
    //const regexSoloLetras = /^[a-zA-Z\s]+$/; // Solo letras
    const regexAlfanumerico = /^[a-zA-Z0-9\s]+$/; // Letras y números

    return regexAlfanumerico.test(modelo);
  }

  function validarFechaAnio(fecha) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(fecha);
  }

  function validarKilometros(km) {
    return km >= 0 && km <= 450000;
  }

  function mostrarError(input, feedback, mensaje) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid"); // Eliminar la clase is-valid
    feedback.textContent = mensaje;
    feedback.style.display = "block";
  }

  function limpiarError(input, feedback) {
    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");
    feedback.textContent = ""; // Limpiar mensaje de feedback
    feedback.style.display = "none"; // Ocultar el feedback
  }

  patenteInput.addEventListener("input", function () {
    const patenteValue = patenteInput.value.toUpperCase(); // Convertir a mayúsculas
    patenteInput.value = patenteValue; // Actualizar el valor del input

    if (!validarPatente(patenteValue)) {
      mostrarError(patenteInput, patenteFeedback, "Formato permitido: AAA111 o AA111AA");
    } else {
      limpiarError(patenteInput, patenteFeedback);
      patenteInput.classList.add("is-valid"); // Agregar clase de éxito
    }
  });

  modeloInput.addEventListener("input", function () {
    if (!validarModelo(modeloInput.value)) {
      mostrarError(modeloInput, modeloFeedback, "El modelo no debe contener caracteres especiales.");
    } else {
      limpiarError(modeloInput, modeloFeedback);
      modeloInput.classList.add("is-valid");
    }
  });

  marcaInput.addEventListener("input", function () {
    if (!validarTextoSoloLetras(marcaInput.value)) {
      mostrarError(marcaInput, marcaFeedback, "La marca solo puede contener letras.");
    } else {
      limpiarError(marcaInput, marcaFeedback);
      marcaInput.classList.add("is-valid");
    }
  });

  anioFabInput.addEventListener("input", function () {
    if (!validarFechaAnio(anioFabInput.value)) {
      mostrarError(anioFabInput, anioFabFeedback, "El formato debe ser YYYY-MM-DD y la fecha debe ser válida.");
    } else {
      const fecha = new Date(anioFabInput.value);
      const fechaHoy = new Date();
      if (fecha > fechaHoy) {
        mostrarError(anioFabInput, anioFabFeedback, "La fecha no puede ser futura.");
      } else {
        limpiarError(anioFabInput, anioFabFeedback);
        anioFabInput.classList.add("is-valid");
      }
    }
  });

  // Nueva función para validar la fecha de fabricación
  function validarFechaAnio(fecha) {
    // Comprobar si el formato es YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(fecha)) {
      return false;
    }

    // Separar año, mes y día
    const [anio, mes, dia] = fecha.split('-').map(Number);

    // Crear una fecha a partir de los valores
    const fechaObj = new Date(anio, mes - 1, dia); // mes - 1 porque los meses empiezan en 0

    // Comprobar si la fecha generada es válida
    return fechaObj.getFullYear() === anio &&
      fechaObj.getMonth() === (mes - 1) &&
      fechaObj.getDate() === dia;
  }

  kmInput.addEventListener("input", function () {
    const km = parseInt(kmInput.value, 10);
    if (!validarKilometros(km)) {
      mostrarError(kmInput, kmFeedback, "El kilometraje debe estar entre 0 y 450,000.");
    } else {
      limpiarError(kmInput, kmFeedback);
      kmInput.classList.add("is-valid");
    }
  });

  // Función para cerrar el popup
  function cerrarPopup() {
    // Limpiar clases de validación
    const inputs = document.querySelectorAll(".form-element input");
    inputs.forEach(input => {
      input.classList.remove("is-valid", "is-invalid"); // Remueve ambas clases
    });

    // Limpiar mensajes de feedback
    const feedbacks = [patenteFeedback, modeloFeedback, marcaFeedback, anioFabFeedback, kmFeedback];
    feedbacks.forEach(feedback => {
      feedback.textContent = ""; // Limpiar contenido del feedback
      feedback.style.display = "none"; // Ocultar el feedback
    });

    // Ocultar el popup
    document.querySelector(".popup").classList.remove("active");
    document.querySelector(".popup-container").classList.remove("active");

  }

  // Asignar el evento de cerrar al botón "Cancelar"
  document.querySelector("#cancelar-btn").addEventListener("click", cerrarPopup);

  // También asignamos el evento al botón de cerrar (si existe)
  document.querySelector(".popup .close-btn").addEventListener("click", cerrarPopup);
});