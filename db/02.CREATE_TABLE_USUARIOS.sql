CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR (255) NOT NULL,
    apellido VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    contrasenia VARCHAR (255) NOT NULL,
    rol_admin BOOLEAN NOT NULL,
)