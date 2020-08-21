const dataStore = require('../db/datastore');
const sql = require('../db/connection');
const bcrypt = require('bcrypt');
const selectUsuarios = 'SELECT * FROM usuarios ';
const authToken = require('../middlewares/auth.token');

async function getUsuarios() {
	let [resultado] = await sql.query(selectUsuarios);
	return resultado;
}

async function comprobarNuevoUsuario(usuario) {
	let [buscarUsuarioPorNombreYApellido] = await sql.query(
		selectUsuarios + 'WHERE nombre = :nombre AND apellido = :apellido AND email = :email',
		{ replacements: usuario }
	);
	if (!buscarUsuarioPorNombreYApellido) {
		throw new Error('El usuario ya existe');
	} else {
		let [resultado] = await sql.query(
			'INSERT INTO usuarios (nombre, apellido, email, contrasenia, rol_admin) VALUES (:nombre, :apellido, :email, :contrasenia, :rol_admin)',
			{
				replacements: {
					nombre: usuario.nombre,
					apellido: usuario.apellido,
					email: usuario.email,
					contrasenia: usuario.contrasenia,
					rol_admin: 0,
				},
			}
		);
		return resultado;
	}
}

async function getUsuarioPorId(id) {
	let [usuario] = await sql.query(selectUsuarios + 'WHERE id = ?', { replacements: [id] });
	if (usuario) {
		return usuario;
	} else {
		throw new Error('El usuario no existe');
	}
}

async function login(email, contrasenia) {
	let [usuario] = await sql.query(selectUsuarios + 'WHERE email = ? AND contrasenia = ?', {
		replacements: [email, contrasenia],
	});
	if (usuario) {
		return usuario;
	} else {
		return null;
	}
}

async function borrarUsuarioPorId(id) {
	let existeUsuario = await getUsuarioPorId(id);
	console.log(existeUsuario);
	if (existeUsuario) {
		let usuarioABorrar = await sql.query('DELETE FROM usuarios WHERE id = ?', { replacements: [id] });
		return usuarioABorrar;
	} else {
		throw new Error('El usuario no existe');
	}
}

module.exports = { getUsuarios, login, comprobarNuevoUsuario, getUsuarioPorId, borrarUsuarioPorId };
