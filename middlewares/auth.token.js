const jwt = require('jsonwebtoken');
const claveSecreta = 'ClaveSecreta';

function verificarTokenAdmin(req, res, next) {
	if (req.path != '/usuarios/login' && req.path != '/usuarios') {
		if (req.headers.authorization) {
			let token = req.headers.authorization.split(' ')[1];
			jwt.verify(token, claveSecreta, function (error, decoded) {
				if (error) {
					return res.status(403).send({ message: 'Sin permisos' });
				} else {
					if (decoded.roles.length > 1) {
						next();
					} else {
						return res.status(403).send({ message: 'Sin permisos' });
					}
				}
			});
		}
	} else {
		next();
	}
}

function verificarTokenUsuario(req, res, next) {
	if (req.path != '/usuarios/login' && req.path != '/usuarios') {
		if (req.headers.authorization) {
			let token = req.headers.authorization.split(' ')[1];
			jwt.verify(token, claveSecreta, function (error, decoded) {
				if (error) {
					return res.status(403).send({ message: 'Sin permisos' });
				} else {
					if (decoded.roles.length == 1) {
						next();
					} else {
						return res.status(403).send({ message: 'Sin permisos' });
					}
				}
			});
		}
	} else {
		next();
	}
}

module.exports = { verificarTokenAdmin, verificarTokenUsuario, claveSecreta };
