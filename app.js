// VARIABLES GLOBALES

const express = require('express');
const paquetesRoute = require('./routes/paquetes.route');
const usuariosRoute = require('./routes/usuarios.route');

const server = express();

// MIDDLEWARES

server.use(express.static('./public'));

server.use(express.json());

// ROUTERS

paquetesRoute(server);
usuariosRoute(server);

// MANEJO DE ERRORES

server.use((err, req, res, next) => {
	if (!err) {
		return next();
	} else {
		res.status(500).send('Error en el servidor' + err.message);
	}
});

// INICIO DE SERVIDOR

server.listen(3000, () => {
	console.log('Server iniciado');
});
