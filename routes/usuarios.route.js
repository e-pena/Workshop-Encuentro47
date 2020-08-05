const usuariosService = require('../services/usuarios.services');
const paquetesService = require('../services/paquetes.services');
const dataStore = require('../db/datastore');

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
		let usuario = dataStore.usuarios.find((r) => r.email == req.body.email);
		if (usuario == null) {
			return res.status(400).send('No se encontró el usuario');
		}
		try {
			if (usuario.contrasenia == req.body.contrasenia) {
				res.status(200).send(usuario);
			} else {
				res.status(400).send('Contraseña inválida');
			}
		} catch (err) {
			res.status(400).json({ Error: err.message });
		}
	});

	server.delete('/usuarios/:id', (req, res) => {
		let idUsuarioABorrar = req.params.id;
		try {
			dataStore.borrarUsuarioPorId(idUsuarioABorrar);
			res.status(200).send('Usuario borrado con éxito');
		} catch (error) {
			res.status(404).json({ Error: err.message });
		}
	});
};
