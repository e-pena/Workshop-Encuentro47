let paquetes = [
	{
		id: 1,
		destino: 'Cataratas del Iguazú',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		imagen: 'https://miequipajedemano.com/wp-content/uploads/2018/01/visitar-las-cataratas-del-iguazu.jpg',
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
		imagen: 'https://www.aviatur.com/source/revista-horizontes/machu-picchu-peru.jpg',
		compradores: [],
	},
	{
		id: 3,
		destino: 'Japón',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		imagen: 'https://mochilerosentailandia.com/wp-content/uploads/2018/07/japon-primavera.jpg',
		compradores: [],
	},
	{
		id: 4,
		destino: 'New York',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		imagen:
			'https://s3-eu-west-1.amazonaws.com/eflanguagesblog/wp-content/uploads/sites/26/2018/07/18150652/new-york-movies.jpg',
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
		imagen:
			'https://86087-590828-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2016/01/paris-fin-de-semana-1024x683.jpeg',
		compradores: [],
	},
	{
		id: 6,
		destino: 'Punta del Este',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		imagen:
			'https://s1.eestatic.com/2019/12/01/viajes/Viajes-Punta_del_Este-Uruguay-Viajes_448717341_139407134_1706x960.jpg',
		compradores: [],
	},
	{
		id: 7,
		destino: 'Río de Janeiro',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		imagen: 'https://www.turismoviajar.com/wp-content/uploads/2019/10/Rio-de-Janeiro-2020.jpg',
		compradores: [],
	},
	{
		id: 8,
		destino: 'Roma',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		imagen: 'https://static.ellitoral.com/um/fotos/297292_07.jpg',
		compradores: [],
	},
	{
		id: 9,
		destino: 'Ushuaia',
		precio: 5000,
		fecha: '10-08-2021 a 20-08-2021',
		imagen:
			'https://www.cronista.com/__export/1503626112241/sites/diarioelcronista/img/2017/08/24/3d4.jpg_258117318.jpg',
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

function agregarCompra(compra) {
	let nuevaCompra = compra;
	nuevaCompra.id = obtenerUltimoIdUsuarioPaqueteComprado();
	usuarioPaqueteComprado.push(nuevaCompra);
	let nuevaCompraPaquete = paquetes.find((r) => r.id == nuevaCompra.idPaquete);
	let objetoPaquete = {
		idDeComprador: nuevaCompra.idUsuario,
		pagoRealizado: nuevaCompra.pagoRealizado,
	};
	nuevaCompraPaquete.compradores.push(objetoPaquete);
	let nuevaCompraUsuario = usuarios.find((r) => r.id == nuevaCompra.idUsuario);
	nuevaCompraUsuario.idDePaquetesComprados.push(nuevaCompra.idPaquete);
	return nuevaCompra;
}

module.exports = { paquetes, usuarios, usuarioPaqueteComprado, crearNuevoPaquete, agregarUsuario, agregarCompra };
