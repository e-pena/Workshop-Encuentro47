const tablaVentas = document.querySelector('#tabla-ventas');
const tablaPaquetes = document.querySelector('#tabla-paquetes');
const tablaUsuarios = document.querySelector('#tabla-usuarios');
const formAgregarPaquete = document.querySelector('#agregar-paquete');
const btnConfirmarPaquete = document.querySelector('#post-btn');
const destinoPost = document.querySelector('#post-destino');
const precioPost = document.querySelector('#post-precio');
const fechaPost = document.querySelector('#post-fecha');
const imagenPost = document.querySelector('#post-imagen');
const idPaqueteABorrar = document.querySelector('#id-paquete-borrado');
const btnEliminarPaquete = document.querySelector('#borrar-paquete-btn');
const idUsuarioABorrar = document.querySelector('#id-usuario-borrado');
const btnEliminarUsuario = document.querySelector('#borrar-usuario-btn');
const idOperacionABorrar = document.querySelector('#id-operacion-borrado');
const btnEliminarOperacion = document.querySelector('#borrar-operacion-btn');

const loginApellido = document.querySelector('#login-apellido');
const loginNombre = document.querySelector('#login-nombre');
const loginEmail = document.querySelector('#login-mail');
const loginContrasenia = document.querySelector('#login-contrasenia');
const loginBtn = document.querySelector('#btn-login-ingresar');
const loginFormSeccion = document.querySelector('.form-login');
const formularioLogIn = document.querySelector('#form-login');
const saludoUsuario = document.querySelector('#saludo-usuario');
const logInFallido = document.querySelector('#login-fallido');
const datosParaAdmin = document.querySelector('#datos-admin');

let token = `Bearer ${localStorage.getItem('token')}`;

function logIn(usuario) {
	try {
		fetch('http://127.0.0.1:3000/usuarios/login/', {
			method: 'POST',
			body: JSON.stringify(usuario),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.usuarioExistente.roles.length > 1) {
					localStorage.setItem('token', data.token);
					saludoUsuario.innerText = `Bienvenido de nuevo ${data.usuarioExistente.nombre} ${data.usuarioExistente.apellido}`;
					saludoUsuario.classList.remove('oculto');
					logInFallido.classList.add('oculto');
					datosParaAdmin.classList.remove('oculto');
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

class UsuarioRegistrado {
	constructor(email, contrasenia) {
		this.email = email;
		this.contrasenia = contrasenia;
	}
	email = '';
	contrasenia = '';
}

loginBtn.addEventListener('click', (e) => {
	e.preventDefault();
	let email = loginEmail.value;
	let contrasenia = loginContrasenia.value;
	let usuarioExistente = new UsuarioRegistrado(email, contrasenia);
	console.log(usuarioExistente);
	logIn(usuarioExistente);
});

function cargarPaquetesDisponibles() {
	try {
		const response = fetch('http://127.0.0.1:3000/paquetes/')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				for (let i = 0; i < data.length; i++) {
					const element = data[i];
					let cantidadDeVentas = element.compradores.length;
					let paquete = document.createElement('tr');
					paquete.innerHTML = `<th scope="row">${element.id}</th>
                <td>${element.destino}</td>
                <td>${element.fecha}</td>
                <td>${element.precio}</td>
                <td>${cantidadDeVentas}</td>`;
					tablaPaquetes.appendChild(paquete);
				}
				return data;
			});
		return response;
	} catch (error) {
		return console.error(error);
	}
}

function cargarUsuariosRegistrados() {
	try {
		const response = fetch('http://127.0.0.1:3000/usuarios/')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				for (let i = 0; i < data.length; i++) {
					const element = data[i];
					let cantidadDeCompras = element.idDePaquetesComprados.length;
					let usuario = document.createElement('tr');
					usuario.innerHTML = `<th scope="row">${element.id}</th>
                <td>${element.apellido}</td>
                <td>${element.nombre}</td>
                <td>${element.email}</td>
                <td>${cantidadDeCompras}</td>`;
					tablaUsuarios.appendChild(usuario);
				}
				return data;
			});
		return response;
	} catch (error) {
		return console.error(error);
	}
}

function cargarVentas() {
	try {
		const response = fetch('http://127.0.0.1:3000/compras/')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				for (let i = 0; i < data.length; i++) {
					const element = data[i];
					let pago;
					if (element.pagoRealizado == true) {
						pago = 'Pagado';
					} else {
						pago = 'Pendiente';
					}
					let venta = document.createElement('tr');
					venta.innerHTML = `<th scope="row">${element.id}</th>
                <td>${element.idPaquete}</td>
                <td>${element.idUsuario}</td>
                <td>${element.precio}</td>
                <td>${pago}</td>`;
					tablaVentas.appendChild(venta);
				}
				return data;
			});
		return response;
	} catch (error) {
		return error;
	}
}

function crearNuevoPaquete(paquete) {
	try {
		fetch('http://127.0.0.1:3000/paquetes/', {
			method: 'POST',
			body: JSON.stringify(paquete),
			headers: { 'Content-Type': 'application/json', Authorization: token },
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			});
	} catch (error) {
		return error;
	}
}

function eliminarPaquete(idPaquete) {
	try {
		fetch(`http://127.0.0.1:3000/paquetes/${idPaquete}`, {
			method: 'DELETE',
			headers: { Authorization: token },
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			});
	} catch (error) {
		return error;
	}
}

btnEliminarPaquete.addEventListener('click', (e) => {
	e.preventDefault();
	let idPaquete = idPaqueteABorrar.value;
	eliminarPaquete(idPaquete);
	alert('El paquete ha sido eliminado');
});

function eliminarUsuario(idUsuario) {
	try {
		fetch(`http://127.0.0.1:3000/usuarios/${idUsuario}`, {
			method: 'DELETE',
			headers: { Authorization: token },
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			});
	} catch (error) {
		return error;
	}
}

btnEliminarUsuario.addEventListener('click', (e) => {
	e.preventDefault();
	let idUsuario = idUsuarioABorrar.value;
	eliminarUsuario(idUsuario);
	alert('El usuario ha sido eliminado');
});

function eliminarOperacion(idOperacion) {
	try {
		fetch(`http://127.0.0.1:3000/compras/${idOperacion}`, {
			method: 'DELETE',
			headers: { Authorization: token },
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			});
	} catch (error) {
		return error;
	}
}

btnEliminarOperacion.addEventListener('click', (e) => {
	e.preventDefault();
	let idOperacion = idOperacionABorrar.value;
	eliminarOperacion(idOperacion);
	alert('La operación ha sido eliminada');
});

class PaqueteNuevo {
	constructor(destino, precio, fecha, imagen) {
		this.destino = destino;
		this.precio = precio;
		this.fecha = fecha;
		this.imagen = imagen;
	}
	destino = '';
	precio = 0;
	fecha = '';
	imagen = '';
}

btnConfirmarPaquete.addEventListener('click', (e) => {
	e.preventDefault();
	let destino = destinoPost.value;
	let precio = precioPost.value;
	let fecha = fechaPost.value;
	let imagen = imagenPost.value;
	let nuevoPaquete = new PaqueteNuevo(destino, precio, fecha, imagen);
	console.log(nuevoPaquete);
	crearNuevoPaquete(nuevoPaquete);
	alert('El paquete ha sido creado');
});

cargarPaquetesDisponibles();
cargarUsuariosRegistrados();
cargarVentas();
