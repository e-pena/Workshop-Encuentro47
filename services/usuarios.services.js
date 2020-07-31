const dataStore = require('../db/datastore');

function getUsuarios() {
	return dataStore.usuarios;
}

function comprobarNuevoUsuario(usuario) {
	let buscarUsuarioPorNombreYApellido = dataStore.usuarios.filter(
		(r) => r.nombre == usuario.nombre && r.apellido == usuario.apellido && r.email == usuario.email
	);
	if (buscarUsuarioPorNombreYApellido.length > 0) {
		throw new Error('El usuario ya existe');
	}
	return dataStore.agregarUsuario(usuario);
}

function getUsuarioPorId(id) {
	let usuario = dataStore.usuarios.find((r) => r.id == id);
	if (usuario) {
		return usuario;
	} else {
		throw new Error('El usuario no existe');
	}
}

module.exports = { getUsuarios, comprobarNuevoUsuario, getUsuarioPorId };
