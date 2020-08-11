const dataStore = require('../db/datastore');
const datastore = require('../db/datastore');

function getPaquetes() {
	return dataStore.paquetes;
}

function getPaquetePorId(id) {
	let paquete = dataStore.paquetes.find((r) => r.id == id);
	if (paquete) {
		return paquete;
	} else {
		throw new Error('El paquete no existe');
	}
}

function getPaquetesComprados(paquetesDeUsuario) {
	let paquetesComprados = [];
	paquetesDeUsuario.forEach((element) => {
		let paqueteComprado = datastore.paquetes.find((r) => r.id == element);
		paquetesComprados.push(paqueteComprado);
	});
	return paquetesComprados;
}

module.exports = { getPaquetes, getPaquetePorId, getPaquetesComprados };
