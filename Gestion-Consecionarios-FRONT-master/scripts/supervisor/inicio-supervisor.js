localStorage.removeItem("controles-pendientes");
//Get de los vehiculos registrados
async function obtenerVehiculosRegistrados() {
  const url = `https://aaaaa-deploy-back.vercel.app/users/verVehiculosRegistradosEnUnaSede?sede_id=1`;

  try {
    // Realiza la solicitud GET
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("Error al obtener los datos de los vehículos");
    }

    // Convierte la respuesta a JSON
    const vehiculosData = await response.json();

    // Guarda los datos en el localStorage
    localStorage.setItem("vehiculosRegistrados", JSON.stringify(vehiculosData));

    console.log("Datos de vehículos registrados guardados en el localStorage");
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
  }
}
obtenerVehiculosRegistrados();

//Enlisto autos
function recuperarVehiculosRegistrados() {
  const vehiculosData = localStorage.getItem("vehiculosRegistrados");

  const vehiculos = vehiculosData ? JSON.parse(vehiculosData) : null;

  return vehiculos;
}
const vehiculosRegistrados = recuperarVehiculosRegistrados();
console.log(vehiculosRegistrados);
function enlistarAutos() {
  const contenedor = document.getElementById("notifications");
  vehiculosRegistrados.forEach((vehiculo) => {
    const singleBox = document.createElement("div");
    singleBox.classList.add("single-box");

    singleBox.innerHTML = `
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
              <p>${vehiculo.marca}</p>
            </div>
            <div class="text-flex">
              <p>Modelo:</p>
              <p>${vehiculo.modelo}</p>
            </div>
            <div class="text-flex">
              <p>Año de Fabricación:</p>
              <p>${vehiculo.año}</p>
            </div>
          </div>
        </div>
        <div class="box-img">
          <a href="./auto-supervisor.html"><img src="../assets/logos/box-control.png" alt="" class="user-pic-pic editar" /></a>
          
        </div>
      `;

    contenedor.appendChild(singleBox);
  });
}

enlistarAutos();

//Guardar auto que clickea

function guardarEdicionVehiculo() {
  const botonesEditar = document.querySelectorAll(".editar");
  const vehiculosGuardados = JSON.parse(
    localStorage.getItem("vehiculosRegistrados")
  );
  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", function (event) {
      // Evitar que el enlace redirija inmediatamente
      event.preventDefault();

      const vehiculoBox = this.closest(".single-box");

      const patente = vehiculoBox.querySelector(".patente-p").textContent;
      const vehiculoEncontrado = vehiculosGuardados.find(
        (vehiculo) => vehiculo.patente.toUpperCase() === patente.toUpperCase()
      );
      console.log(vehiculoEncontrado);

      const datosVehiculo = {
        patente: patente,
        marca: vehiculoEncontrado.marca,
        modelo: vehiculoEncontrado.modelo,
        año: vehiculoEncontrado.año,
        km: vehiculoEncontrado.km,
      };

      localStorage.setItem("vehiculoEditar", JSON.stringify(datosVehiculo));
      window.location.href = "./auto-supervisor.html";
    });
  });
}
guardarEdicionVehiculo();
