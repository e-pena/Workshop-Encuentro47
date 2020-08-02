const getApellido = document.querySelector('#get-apellido');
const getNombre = document.querySelector('#get-nombre');
const getEmail = document.querySelector('#get-mail');
const getContrasenia = document.querySelector('#get-contrasenia');
const getBtn = document.querySelector('#btn-get-ingresar');
const postApellido = document.querySelector('#post-apellido');
const postNombre = document.querySelector('#post-nombre');
const postEmail = document.querySelector('#post-mail');
const postContrasenia = document.querySelector('#post-contrasenia');
const postBtn = document.querySelector('#btn-post-registrar');
const getFormSeccion = document.querySelector('.form-get');
const postFormSeccion = document.querySelector('.form-post');
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

let idUsuarioActual;

function cargarPaquetes() {
	try {
		const response = fetch('http://127.0.0.1:3000/paquetes/')
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
				}
				return data;
			});
	} catch (error) {
		return console.error(error);
	}
}

cargarPaquetes();

function logIn(usuario) {
	try {
		const response = fetch('http://127.0.0.1:3000/usuarios/')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				for (let i = 0; i < data.length; i++) {
					const element = data[i];
					if (
						usuario.nombre == element.nombre &&
						usuario.apellido == element.apellido &&
						usuario.email == element.email
					) {
						saludoUsuario.innerText = `Bienvenido de nuevo ${usuario.nombre} ${usuario.apellido}`;
						saludoUsuario.classList.remove('oculto');
						logInFallido.classList.add('oculto');
						idUsuarioActual = element.id;
						return data;
					}
				}
				saludoUsuario.classList.add('oculto');
				logInFallido.classList.remove('oculto');
				return data;
			});
		return response;
	} catch (error) {
		return error;
	}
}

function signIn(usuario) {
	try {
		fetch('http://127.0.0.1:3000/usuarios/', {
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
			});
	} catch (error) {
		return error;
	}
}

class UsuarioRegistrado {
	constructor(nombre, apellido, email) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
	}
	nombre = '';
	apellido = '';
	email = '';
}

class UsuarioNuevo {
	constructor(nombre, apellido, email) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
	}
	nombre = '';
	apellido = '';
	email = '';
}

getBtn.addEventListener('click', (e) => {
	e.preventDefault();
	let apellido = getApellido.value;
	let nombre = getNombre.value;
	let email = getEmail.value;
	let usuarioExistente = new UsuarioRegistrado(nombre, apellido, email);
	console.log(usuarioExistente);
	logIn(usuarioExistente);
});

postBtn.addEventListener('click', (e) => {
	e.preventDefault();
	let apellido = postApellido.value;
	let nombre = postNombre.value;
	let email = postEmail.value;
	let usuarioNuevo = new UsuarioNuevo(nombre, apellido, email);
	console.log(usuarioNuevo);
	signIn(usuarioNuevo);
	saludoUsuario.innerText = `Bienvenido ${usuarioNuevo.nombre} ${usuarioNuevo.apellido}`;
	saludoUsuario.classList.remove('oculto');
	logInFallido.classList.add('oculto');
});

function reconocerPaquete(ubicacionPaquete) {
	try {
		const response = fetch('http://127.0.0.1:3000/paquetes/')
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
				reservarPaquete(paqueteReservado);
				return data;
			});
		return response;
	} catch (error) {
		return error;
	}
}

function reservarPaquete(paqueteReservado) {
	try {
		fetch('http://127.0.0.1:3000/compras', {
			method: 'POST',
			body: JSON.stringify(paqueteReservado),
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

for (let i = 0; i < btnReserva.length; i++) {
	const element = btnReserva[i];
	element.addEventListener('click', () => {
		let paquete = reconocerPaquete(i);
		return paquete;
	});
}
