const usuariosService = require('../services/usuarios.services');
const paquetesService = require('../services/paquetes.services');
const dataStore = require('../db/datastore');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verificarTokenAdmin, claveSecreta, verificarTokenUsuario } = require('../middlewares/auth.token');

module.exports = function (server) {
	server.get('/usuarios', async (req, res) => {
		let usuarios = await usuariosService.getUsuarios();
		res.status(200).json(usuarios);
	});

	server.get('/usuarios/:id', async (req, res) => {
		let idUsuario = req.params.id;
		try {
			let resultado = await usuariosService.getUsuarioPorId(idUsuario);
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

	server.post('/usuarios', async (req, res) => {
		let usuarioNuevo = req.body;
		try {
			let usuario = await usuariosService.comprobarNuevoUsuario(usuarioNuevo);
			res.status(201).json(usuario);
		} catch (err) {
			res.status(409).json({ Error: err.message });
		}
	});

	server.post('/usuarios/login', async (req, res) => {
		try {
			let email = req.body.email;
			let contrasenia = req.body.contrasenia;
			let usuarioExistente = await usuariosService.login(email, contrasenia);
			if (!usuarioExistente) {
				throw new Error('No se puede validar');
			} else {
				let payload = {
					email: usuarioExistente.email,
					nombre: usuarioExistente.nombre,
					apellido: usuarioExistente.apellido,
					rol: usuarioExistente.rol_admin,
				};
				jwt.sign(payload, claveSecreta, function (error, token) {
					if (error) {
						res.status(500).send({ Error: message.error });
					} else {
						res.status(200).send(token);
					}
				});
			}
		} catch (error) {
			return res.status(404).send({ error });
		}
	});

	server.delete('/usuarios/:id', verificarTokenAdmin, async (req, res) => {
		let idUsuarioABorrar = req.params.id;
		try {
			let resultado = await usuariosService.borrarUsuarioPorId(idUsuarioABorrar);
			res.status(200).send(resultado);
		} catch (error) {
			res.status(404).json({ Error: err.message });
		}
	});
};
