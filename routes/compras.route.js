const dataStore = require('../db/datastore');
const usuariosService = require('../services/usuarios.services');
const paquetesService = require('../services/paquetes.services');
const adminService = require('../services/admin.services');

module.exports = function (server) {
	server.get('/compras', (req, res) => {
		let compras = adminService.getCompras();
		res.status(200).json(compras);
	});

	server.get('/compras/:id', (req, res) => {
		let idCompra = req.params.id;
		try {
			let resultado = adminService.getCompraPorId(idCompra);
			res.status(200).json(resultado);
		} catch (err) {
			res.status(404).json({ Error: err.message });
		}
	});

	server.post('/compras', (req, res) => {
		let compraNueva = req.body;
		try {
			let compra = dataStore.agregarCompra(compraNueva);
			res.status(201).json(compra);
		} catch (err) {
			res.status(409).json({ Error: err.message });
		}
	});
};
