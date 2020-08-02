const dataStore = require('../db/datastore');
const datastore = require('../db/datastore');

function getCompras() {
	return datastore.usuarioPaqueteComprado;
}

function getCompraPorId(id) {
	let compra = dataStore.usuarioPaqueteComprado.find((r) => r.id == id);
	if (compra) {
		return compra;
	} else {
		throw new Error('El usuario no existe');
	}
}

module.exports = { getCompras, getCompraPorId };
