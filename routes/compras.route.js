const dataStore = require('../db/datastore');
const usuariosService = require('../services/usuarios.services');
const paquetesService = require('../services/paquetes.services');
const adminService = require('../services/admin.services');
const authToken = require('../middlewares/auth.token');

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

	server.post('/compras', authToken.verificarTokenAdmin, (req, res) => {
		let compraNueva = req.body;
		try {
			let compra = dataStore.agregarCompra(compraNueva);
			res.status(201).json(compra);
		} catch (err) {
			res.status(409).json({ Error: err.message });
		}
	});

	server.delete('/compras/:id', authToken.verificarTokenAdmin, (req, res) => {
		let idCompraABorrar = req.params.id;
		try {
			dataStore.borrarCompraPorId(idCompraABorrar);
			res.status(200).send('Operación borrada con éxito');
		} catch (error) {
			res.status(404).json({ Error: err.message });
		}
	});
};
