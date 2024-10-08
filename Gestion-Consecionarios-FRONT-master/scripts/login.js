localStorage.clear();
//Password//
function myPassword() {
  const password = document.getElementById('logPassword');
  const show = document.getElementById('eye');
  const hide = document.getElementById('eye-slash');

  if (password.type === "password") {
    password.type = "text";
    show.style.opacity = "0";
    hide.style.opacity = "1";
  } else {
    password.type = "password";
    show.style.opacity = "1";
    hide.style.opacity = "0";
  }
}

////Login///
async function login() {


  const email = document.getElementById('logEmail').value;
  const contrasena = document.getElementById('logPassword').value;
  const url = `https://aaaaa-deploy-back.vercel.app/users/logearse?email=${email}&contraseña=${contrasena}`;
  console.log("entra")
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
    data = await response.json();
    console.log(data)
    if (data === false) {
      alert("Contraseña o Email erronea");
    } else {
      validarTipoUsuario(data);
    }
  } catch (error) {
    alert("Hubo un problema con la autenticación. Inténtalo nuevamente.");
    console.error("Error:", error);
  }
}

function validarTipoUsuario(response) {
  localStorage.setItem("usuario", JSON.stringify(response));
  if ("root" === response) {
    window.location.href = "";
  }
  if ("admin" === response) {
    window.location.href = "./views/adminInicio.html";
  }
  if ("supervisor" === response) {
    window.location.href = "./views/inicio-supervisor.html";
  }
  if ("gerente" === response) {
    window.location.href = "";
  }
  if ("tecnico" === response) {
    window.location.href = "./views/inicio-tecnico.html";
  }
}

document.getElementById('login-btn').addEventListener('click', function (e) {
  e.preventDefault();
  login();
});


