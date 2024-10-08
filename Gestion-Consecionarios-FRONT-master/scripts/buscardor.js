// Función para buscar y mostrar vehículos
function mostrarVehiculosFiltrados(vehiculosFiltrados) {
  const sectionCard = document.querySelector(".section-card .wrapper .notifications");

  const tarjetasVehiculos = sectionCard.querySelectorAll(".single-box");
  tarjetasVehiculos.forEach((tarjeta) => tarjeta.remove());

  // Eliminar mensaje de "No se encontraron vehículos" si existe
  const mensajeNoVehiculos = sectionCard.querySelector(".no-vehiculos");
  if (mensajeNoVehiculos) {
    mensajeNoVehiculos.remove();
  }

  if (vehiculosFiltrados.length > 0) {
    vehiculosFiltrados.forEach((vehiculo) => {
      // Crear la tarjeta del vehículo

      const divAuto = document.createElement("div");
      divAuto.classList.add("single-box");
      divAuto.innerHTML = `
        <div class="box-avatar-text">
          <div class="avatar">
            <img src="../assets/imagenes/corolla.png" alt="perfil-imagen" />
          </div>
          <div class="box-text">
            <div class="text-patente">
              <p class="patente-p">${vehiculo.patente.toUpperCase()}</p>
            </div>
            <div class="text-flex">
              <p>Marca:</p>
              <p>${vehiculo.marca.charAt(0).toUpperCase() + vehiculo.marca.slice(1).toLowerCase()}</p>
            </div>
            <div class="text-flex">
              <p>Modelo:</p>
              <p>${vehiculo.modelo.charAt(0).toUpperCase() + vehiculo.modelo.slice(1).toLowerCase()}</p>
            </div>
            <div class="text-flex">
              <p>Año de Fabricación:</p>
              <p>${vehiculo.año}</p>
            </div>
          </div>
        </div>
        <div class="box-img">
          <a class="editar-margin" href=""><img src="../assets/logos/edit-solid-24.png" alt="" class="user-pic-pic editar" /></a>
          <img src="../assets/logos/eliminar.png" alt="" class="user-pic-pic eliminar-vehiculo" />
        </div>
      `;

      // Añadir la tarjeta a la sección
      sectionCard.appendChild(divAuto);
    });

    // Después de crear los vehículos en el DOM, asignar eventos de edición
    guardarEdicionVehiculo();
    eliminarVehiculo();
  } else {
    const mensaje = document.createElement("div");
    mensaje.innerHTML = `
    <i class='bx bx-ghost'></i>
    <p>No se encontraron vehículos con esa patente, marca o modelo.</p>
  `;
    mensaje.classList.add("no-vehiculos");
    sectionCard.appendChild(mensaje);
  }
}

//Guardar auto que clickea
function guardarEdicionVehiculo() {
  const botonesEditar = document.querySelectorAll(".editar");
  const vehiculosGuardados = JSON.parse(
    localStorage.getItem("vehiculosRegistrados")
  );

  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", function (event) {
      event.preventDefault(); // Evitar redirección

      const vehiculoBox = this.closest(".single-box");

      // Obtener la patente del vehículo clickeado
      const patente = vehiculoBox.querySelector(".patente-p").textContent.trim();
      const vehiculoEncontrado = vehiculosGuardados.find(
        (vehiculo) => vehiculo.patente.toUpperCase() === patente.toUpperCase()
      );

      // Guardar el vehículo en localStorage para edición
      const datosVehiculo = {
        patente: vehiculoEncontrado.patente,
        marca: vehiculoEncontrado.marca,
        modelo: vehiculoEncontrado.modelo,
        año: vehiculoEncontrado.año,
        km: vehiculoEncontrado.km,
      };

      localStorage.setItem("vehiculoEditar", JSON.stringify(datosVehiculo));

      console.log('Vehículo guardado para edición:', datosVehiculo);

      // Lógica para abrir el popup de edición (si la tienes implementada)
      abrirPopup(true, datosVehiculo); // True indica que es edición
    });
  });
}


// Función que se llama en la búsqueda
document.getElementById("searchButton").addEventListener("click", function () {
  const inputValue = document.getElementById("patenteInput").value.toLowerCase();
  const vehiculos = JSON.parse(localStorage.getItem("vehiculosRegistrados")) || [];

  // Filtrar vehículos por patente, marca o modelo
  const vehiculosFiltrados = vehiculos.filter((vehiculo) =>
    vehiculo.patente.toLowerCase().includes(inputValue) ||
    vehiculo.marca.toLowerCase().includes(inputValue) ||
    vehiculo.modelo.toLowerCase().includes(inputValue)
  );

  // Mostrar vehículos filtrados
  mostrarVehiculosFiltrados(vehiculosFiltrados);
});