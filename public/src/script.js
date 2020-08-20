// VARIABLES

const loginApellido = document.querySelector('#login-apellido');
const loginNombre = document.querySelector('#login-nombre');
const loginEmail = document.querySelector('#login-mail');
const loginContrasenia = document.querySelector('#login-contrasenia');
const loginBtn = document.querySelector('#btn-login-ingresar');
const signinApellido = document.querySelector('#signin-apellido');
const signinNombre = document.querySelector('#signin-nombre');
const signinEmail = document.querySelector('#signin-mail');
const signinContrasenia = document.querySelector('#signin-contrasenia');
const signinBtn = document.querySelector('#btn-signin-registrar');
const paquetesBtn = document.querySelector('#btn-mis-paquetes');
const loginFormSeccion = document.querySelector('.form-login');
const signinFormSeccion = document.querySelector('.form-signin');
const areaDeIngreso = document.querySelector('#header');
const formularioLogIn = document.querySelector('#form-login');
const formularioSignIn = document.querySelector('#form-signin');
const saludoUsuario = document.querySelector('#saludo-usuario');
const logInFallido = document.querySelector('#login-fallido');
const btnReserva = document.querySelectorAll('.btn-success');
const btnCompra = document.querySelectorAll('.btn-danger');
const paqueteLugar = document.querySelectorAll('.lugar');
const paquetePrecio = document.querySelectorAll('.precio');
const paqueteFecha = document.querySelectorAll('.fecha');
const paqueteImagen = document.querySelectorAll('.foto');
const paqueteDiv = document.querySelectorAll('.mb-4');
const paquetesComprados = document.querySelector('#mis-paquetes-lista');

let idUsuarioActual;

// MOSTRAR PAQUETES DISPONIBLES

function cargarPaquetes() {
	try {
		const response = fetch('/paquetes/')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				for (let i = 0; i < data.length; i++) {
					const element = data[i];
					paqueteLugar[i].innerText = element.destino;
					paquetePrecio[i].innerText = `Precio: ${element.precio}`;
					paqueteFecha[i].innerText = `Fechas: ${element.fecha}`;
					paqueteImagen[i].setAttribute('src', element.imagen);
					paqueteImagen[i].setAttribute('alt', element.destino);
					paqueteDiv[i].classList.remove('oculto');
				}
				return data;
			});
		return response;
	} catch (error) {
		return console.error(error);
	}
}

cargarPaquetes();

// FUNCIÓN PARA LOGUEARSE

function logIn(usuario) {
	try {
		fetch('/usuarios/login/', {
			method: 'POST',
			body: JSON.stringify(usuario),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				if (data) {
					localStorage.setItem('token', data.token);
					saludoUsuario.innerText = `Bienvenido de nuevo ${data.usuarioExistente.nombre} ${data.usuarioExistente.apellido}`;
					saludoUsuario.classList.remove('oculto');
					logInFallido.classList.add('oculto');
					idUsuarioActual = data.usuarioExistente.id;
					paquetesBtn.disabled = false;
					btnCompra.forEach((element) => {
						element.disabled = false;
					});
					btnReserva.forEach((element) => {
						element.disabled = false;
					});
					return data;
				} else {
					saludoUsuario.classList.add('oculto');
					logInFallido.classList.remove('oculto');
				}
				return data;
			});
		return response;
	} catch (error) {
		return error;
	}
}

// FUNCIÓN PARA REGISTRARSE

function signIn(usuario) {
	try {
		fetch('/usuarios/', {
			method: 'POST',
			body: JSON.stringify(usuario),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				idUsuarioActual = data.id;
				paquetesBtn.disabled = false;
				btnCompra.forEach((element) => {
					element.disabled = false;
				});
				btnReserva.forEach((element) => {
					element.disabled = false;
				});
			});
	} catch (error) {
		return error;
	}
}

// CLASES NECESARIAS PARA EL REGISTRO Y LOGUEO

class UsuarioRegistrado {
	constructor(email, contrasenia) {
		this.email = email;
		this.contrasenia = contrasenia;
	}
	email = '';
	contrasenia = '';
}

class UsuarioNuevo {
	constructor(nombre, apellido, email, contrasenia) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
		this.contrasenia = contrasenia;
	}
	nombre = '';
	apellido = '';
	email = '';
	contrasenia = '';
}

// FUNCIONALIDAD DE BOTONES DE REGISTRO Y LOGUEO

loginBtn.addEventListener('click', (e) => {
	e.preventDefault();
	let email = loginEmail.value;
	let contrasenia = loginContrasenia.value;
	let usuarioExistente = new UsuarioRegistrado(email, contrasenia);
	console.log(usuarioExistente);
	logIn(usuarioExistente);
});

signinBtn.addEventListener('click', (e) => {
	e.preventDefault();
	let apellido = signinApellido.value;
	let nombre = signinNombre.value;
	let email = signinEmail.value;
	let contrasenia = signinContrasenia.value;
	if (apellido && nombre && email) {
		let usuarioNuevo = new UsuarioNuevo(nombre, apellido, email, contrasenia);
		console.log(usuarioNuevo);
		signIn(usuarioNuevo);
		saludoUsuario.innerText = `Registro exitoso. Por favor, realice el log in`;
		saludoUsuario.classList.remove('oculto');
		logInFallido.classList.add('oculto');
	}
});

// FUNCIONALIDAD PARA MOSTRAR LOS PAQUETES COMPRADOS POR EL USUARIO REGISTRADO

paquetesBtn.addEventListener('click', (e) => {
	e.preventDefault();
	try {
		const response = fetch(`/usuarios/${idUsuarioActual}/paquetes`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				paquetesComprados.innerHTML = '';
				for (let i = 0; i < data.length; i++) {
					const element = data[i];
					paquetesComprados.innerHTML += `<p>Tiene un viaje a ${element.destino} de ${element.fecha} con un costo de $${element.precio}<p>`;
				}
				return data;
			});
		return response;
	} catch (error) {
		return error;
	}
});

// FUNCIONES PARA RESERVAR O COMPRAR UN PAQUETE

function reservarPaquete(ubicacionPaquete) {
	try {
		const response = fetch('/paquetes/')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				let paquete = data[ubicacionPaquete];
				let paqueteReservado = {
					idUsuario: idUsuarioActual,
					idPaquete: paquete.id,
					pagoRealizado: false,
					precio: paquete.precio,
				};
				reservarOComprarPaquete(paqueteReservado);
				return data;
			});
		return response;
	} catch (error) {
		return error;
	}
}

function comprarPaquete(ubicacionPaquete) {
	try {
		const response = fetch('/paquetes/')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				let paquete = data[ubicacionPaquete];
				let paqueteReservado = {
					idUsuario: idUsuarioActual,
					idPaquete: paquete.id,
					pagoRealizado: true,
					precio: paquete.precio,
				};
				reservarOComprarPaquete(paqueteReservado);
				return data;
			});
		return response;
	} catch (error) {
		return error;
	}
}

function reservarOComprarPaquete(paquete) {
	try {
		fetch('/compras', {
			method: 'POST',
			body: JSON.stringify(paquete),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				return data;
			});
	} catch (error) {
		return error;
	}
}

// BOTONES PARA LA RESERVA O COMPRA DE UN PAQUETE

for (let i = 0; i < btnReserva.length; i++) {
	const element = btnReserva[i];
	element.addEventListener('click', () => {
		if (idUsuarioActual > 0) {
			let paquete = reservarPaquete(i);
			return paquete;
		} else {
			alert('Ingrese a su cuenta para realizar compras o reservas');
		}
	});
}

for (let i = 0; i < btnCompra.length; i++) {
	const element = btnCompra[i];
	element.addEventListener('click', () => {
		if (idUsuarioActual > 0) {
			let paquete = comprarPaquete(i);
			return paquete;
		} else {
			alert('Ingrese a su cuenta para realizar compras o reservas');
		}
	});
}
