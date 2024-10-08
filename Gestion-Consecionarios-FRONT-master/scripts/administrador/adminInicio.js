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

//Verifico que todas los inputs son validos///
function verificarClasesValidasFormulario() {
  // Obtén los inputs del formulario
  const inputs = [
    document.getElementById('patente'),
    document.getElementById('modelo'),
    document.getElementById('marca'),
    document.getElementById('anio-fab'),
    document.getElementById('km')
  ];

  // Verifica si todos los inputs tienen la clase 'is-valid'
  for (let input of inputs) {
    if (!input.classList.contains('is-valid')) {
      return false; // Si algún input no tiene la clase, retorna false
    }
  }

  return true; // Si todos los inputs tienen la clase, retorna true
}

//Post Vehiculo
document
  .getElementById("guardar-btn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    if (verificarClasesValidasFormulario()) {
      // Captura los valores de los campos
      const patente = document.getElementById("patente").value;
      const modelo = document.getElementById("modelo").value;
      const marca = document.getElementById("marca").value;
      const anioFab = document.getElementById("anio-fab").value;

      const km = document.getElementById("km").value;

      // Validar que los campos no estén vacíos
      if (!patente || !modelo || !marca || !anioFab || !km) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      // Crear un objeto JSON con los datos del formulario
      const data = {
        patente,
        marca,
        modelo,
        año: anioFab,
        km: parseInt(km, 10),
        concesionario_ubicado: 1, // Asume que usuarioJSON es un objeto global con el cuilDueño
      };
      console.log(data);
      // Enviar el JSON a la API usando fetch
      fetch("https://aaaaa-deploy-back.vercel.app/users/registrarVehiculo", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          alert("Vehículo guardado con éxito");
          location.reload(true);
          // Aquí puedes hacer alguna acción tras el éxito, como redirigir o limpiar el formulario
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Hubo un problema al guardar el vehículo.");
        });
    } else {
      alert("Completar los campos con datos validos")
    }
  });

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

    contenedor.appendChild(singleBox);
  });
}

enlistarAutos();

//Eliminar el auto
function eliminarVehiculo() {
  const botonesEliminar = document.querySelectorAll(".eliminar-vehiculo");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", async function () {
      const vehiculoBox = this.closest(".single-box");

      const patente = vehiculoBox.querySelector(".patente-p").textContent;

      // URL del endpoint para eliminar el vehículo
      const urlDeleteVehiculo = `https://aaaaa-deploy-back.vercel.app/users/eliminarVehiculo?patente=${patente}`;

      try {
        // Hacer la solicitud DELETE al endpoint
        const response = await fetch(urlDeleteVehiculo, {
          method: "DELETE",
        });

        if (response.ok) {
          // Si la solicitud es exitosa, eliminar el elemento visualmente del DOM
          vehiculoBox.remove();
          console.log(`Vehículo con patente ${patente} eliminado del sistema`);
          location.reload(true);
        } else {
          // Si hay un error, mostrar un mensaje
          console.error(
            `Error al eliminar el vehículo con patente ${patente}: ${response.statusText}`
          );
          alert("No se pudo eliminar el vehículo, intente nuevamente.");
        }
      } catch (error) {
        console.error("Error en la solicitud de eliminación:", error);
        alert("Ocurrió un error al intentar eliminar el vehículo.");
      }
    });
  });
}
eliminarVehiculo();
