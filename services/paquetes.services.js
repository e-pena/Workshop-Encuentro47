const dataStore = require('../db/datastore');

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
	let paquetesComprados = dataStore.paquetes.filter((r) => r.id == paquetesDeUsuario);
	return paquetesComprados;
}

module.exports = { getPaquetes, getPaquetePorId, getPaquetesComprados };
