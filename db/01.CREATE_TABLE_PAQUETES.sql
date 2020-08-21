CREATE TABLE paquetes (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    destino VARCHAR (510) NOT NULL,
    precio INT UNSIGNED NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    imagen VARCHAR (510) NOT NULL,
)