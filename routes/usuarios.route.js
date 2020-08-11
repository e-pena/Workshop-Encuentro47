const usuariosService = require('../services/usuarios.services');
const paquetesService = require('../services/paquetes.services');
const dataStore = require('../db/datastore');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authToken = require('../middlewares/auth.token');

module.exports = function (server) {
	server.get('/usuarios', (req, res) => {
		let usuarios = usuariosService.getUsuarios();
		res.status(200).json(usuarios);
	});

	server.get('/usuarios/:id', (req, res) => {
		let idUsuario = req.params.id;
		try {
			let resultado = usuariosService.getUsuarioPorId(idUsuario);
			res.status(200).json(resultado);
		} catch (err) {
			res.status(404).json({ Error: err.message });
		}
	});

	server.get('/usuarios/:id/paquetes', (req, res) => {
		let idUsuario = req.params.id;
		try {
			let usuario = usuariosService.getUsuarioPorId(idUsuario);
			let paquetesDeUsuario = usuario.idDePaquetesComprados;
			if (paquetesDeUsuario.length > 0) {
				let resultado = paquetesService.getPaquetesComprados(paquetesDeUsuario);
				res.status(200).json(resultado);
			} else {
				res.status(200).send('El usuario no compró ningún paquete. Es pobre');
			}
		} catch (err) {
			res.status(404).json({ Error: err.message });
		}
	});

	server.post('/usuarios', (req, res) => {
		let usuarioNuevo = req.body;
		try {
			let usuario = usuariosService.comprobarNuevoUsuario(usuarioNuevo);
			res.status(201).json(usuario);
		} catch (err) {
			res.status(409).json({ Error: err.message });
		}
	});

	server.post('/usuarios/login', (req, res) => {
		let email = req.body.email;
		let contrasenia = req.body.contrasenia;
		let usuarioExistente = dataStore.usuarios.find((r) => r.email == email);
		if (!usuarioExistente) {
			throw new Error('No se puede validar');
		} else {
			bcrypt
				.compare(contrasenia, usuarioExistente.contrasenia)
				.then((match) => {
					if (match) {
						let payload = {
							email: usuarioExistente.email,
							nombre: usuarioExistente.nombre,
							apellido: usuarioExistente.apellido,
							roles: usuarioExistente.roles,
						};
						jwt.sign(payload, authToken.claveSecreta, function (error, token) {
							if (error) {
								res.status(500).send({ Error: message.error });
							} else {
								res.status(200).send({ usuarioExistente, token });
							}
						});
					} else {
						return res.status(200).send({ message: 'Contraseña incorrecta' });
					}
				})
				.catch((error) => {
					return res.status(404).send({ error });
				});
		}
	});

	server.delete('/usuarios/:id', authToken.verificarTokenAdmin, (req, res) => {
		let idUsuarioABorrar = req.params.id;
		try {
			dataStore.borrarUsuarioPorId(idUsuarioABorrar);
			res.status(200).send('Usuario borrado con éxito');
		} catch (error) {
			res.status(404).json({ Error: err.message });
		}
	});
};
