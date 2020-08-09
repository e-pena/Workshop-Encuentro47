const paquetesService = require('../services/paquetes.services');
const dataStore = require('../db/datastore');
const authToken = require('../middlewares/auth.token');

module.exports = function (server) {
	server.get('/paquetes', (req, res) => {
		let paquetes = paquetesService.getPaquetes();
		res.status(200).json(paquetes);
	});

	server.get('/paquetes/:id', (req, res) => {
		let idPaquete = req.params.id;
		try {
			let resultado = paquetesService.getPaquetePorId(idPaquete);
			res.status(200).json(resultado);
		} catch (err) {
			res.status(404).json({ Error: err.message });
		}
	});

	server.post('/paquetes', authToken.verificarTokenAdmin, (req, res) => {
		let paqueteNuevo = req.body;
		try {
			let paquete = dataStore.crearNuevoPaquete(paqueteNuevo);
			res.status(201).json(paquete);
		} catch (err) {
			res.status(409).json({ Error: err.message });
		}
	});

	server.delete('/paquetes/:id', authToken.verificarTokenAdmin, (req, res) => {
		let idPaqueteABorrar = req.params.id;
		try {
			dataStore.borrarPaquetePorId(idPaqueteABorrar);
			res.status(200).send('Paquete borrado con éxito');
		} catch (error) {
			res.status(404).json({ Error: err.message });
		}
	});
};
