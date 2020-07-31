let paquetes = [
	{
		id: 1,
		destino: 'Cataratas del Iguazú',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		compradores: [
			{
				idDeComprador: 1,
				pagoRealizado: true,
			},
			{
				idDeComprador: 2,
				pagoRealizado: false,
			},
		],
	},
	{
		id: 2,
		destino: 'Cusco',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		compradores: [],
	},
	{
		id: 3,
		destino: 'Japón',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		compradores: [],
	},
	{
		id: 4,
		destino: 'New York',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		compradores: [
			{
				idDeComprador: 3,
				pagoRealizado: true,
			},
			{
				idDeComprador: 4,
				pagoRealizado: false,
			},
		],
	},
	{
		id: 5,
		destino: 'París',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		compradores: [],
	},
	{
		id: 6,
		destino: 'Punta del Este',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		compradores: [],
	},
	{
		id: 7,
		destino: 'Río de Janeiro',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		compradores: [],
	},
	{
		id: 8,
		destino: 'Roma',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		compradores: [],
	},
	{
		id: 9,
		destino: 'Ushuaia',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		compradores: [],
	},
];

let usuarios = [
	{
		id: 1,
		nombre: 'Godofredo',
		apellido: 'González',
		email: 'mimail@mail.com',
		contrasenia: '1234',
		idDePaquetesComprados: [1],
	},
	{
		id: 2,
		nombre: 'Hermenegildo',
		apellido: 'Perez',
		email: 'mimail@mail.com',
		contrasenia: '1234',
		idDePaquetesComprados: [1],
	},
	{
		id: 3,
		nombre: 'Amancio',
		apellido: 'Martínez',
		email: 'mimail@mail.com',
		contrasenia: '1234',
		idDePaquetesComprados: [4],
	},
	{
		id: 4,
		nombre: 'Rufino',
		apellido: 'Olguín',
		email: 'mimail@mail.com',
		contrasenia: '1234',
		idDePaquetesComprados: [4],
	},
	{
		id: 5,
		nombre: 'Virginia',
		apellido: 'Lell',
		email: 'mimail@mail.com',
		contrasenia: '1234',
		idDePaquetesComprados: [],
	},
	{
		id: 6,
		nombre: 'Caballito',
		apellido: 'Pena',
		email: 'mimail@mail.com',
		contrasenia: '1234',
		idDePaquetesComprados: [],
	},
	{
		id: 7,
		nombre: 'Mercedes',
		apellido: 'Lozano',
		email: 'mimail@mail.com',
		contrasenia: '1234',
		idDePaquetesComprados: [],
	},
	{
		id: 8,
		nombre: 'Arquímedes',
		apellido: 'Margan',
		email: 'mimail@mail.com',
		contrasenia: '1234',
		idDePaquetesComprados: [],
	},
	{
		id: 9,
		nombre: 'Puccio',
		apellido: 'Bisso',
		email: 'mimail@mail.com',
		contrasenia: '1234',
		idDePaquetesComprados: [],
	},
];

let usuarioPaqueteComprado = [
	{
		id: 1,
		idUsuario: 1,
		idPaquete: 1,
		pagoRealizado: true,
		precio: 5000,
	},
	{
		id: 2,
		idUsuario: 2,
		idPaquete: 1,
		pagoRealizado: false,
		precio: 5000,
	},
	{
		id: 3,
		idUsuario: 3,
		idPaquete: 4,
		pagoRealizado: true,
		precio: 5000,
	},
	{
		id: 4,
		idUsuario: 4,
		idPaquete: 4,
		pagoRealizado: false,
		precio: 5000,
	},
];

function obtenerUltimoIdPaquetes() {
	let data = paquetes.length;
	if (data === 0) {
		return 0;
	} else {
		for (let i = 0; i < paquetes.length; ++i) {
			data = paquetes[i].id;
		}
		return data + 1;
	}
}

function obtenerUltimoIdUsuarios() {
	let data = usuarios.length;
	if (data === 0) {
		return 0;
	} else {
		for (let i = 0; i < usuarios.length; ++i) {
			data = usuarios[i].id;
		}
		return data + 1;
	}
}

function obtenerUltimoIdUsuarioPaqueteComprado() {
	let data = usuarioPaqueteComprado.length;
	if (data === 0) {
		return 0;
	} else {
		for (let i = 0; i < usuarioPaqueteComprado.length; ++i) {
			data = usuarioPaqueteComprado[i].id;
		}
		return data + 1;
	}
}

function crearNuevoPaquete(data) {
	let nuevoPaquete = data;
	nuevoPaquete.id = obtenerUltimoIdPaquetes();
	nuevoPaquete.compradores = [];
	paquetes.push(nuevoPaquete);
	return nuevoPaquete;
}

function agregarUsuario(usuario) {
	let nuevoUsuario = usuario;
	nuevoUsuario.id = obtenerUltimoIdUsuarios();
	nuevoUsuario.idDePaquetesComprados = [];
	usuarios.push(nuevoUsuario);
	return nuevoUsuario;
}

module.exports = { paquetes, usuarios, usuarioPaqueteComprado, crearNuevoPaquete, agregarUsuario };
