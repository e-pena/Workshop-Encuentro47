CREATE TABLE usuarioPaqueteComprado (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    pago BOOLEAN NOT NULL,
    precio INT NOT NULL,
    usuario_id INT NOT NULL,
    paquete_id INT NOT NULL,
    CONSTRAINT FK_usuarioComprador FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id),
    CONSTRAINT FK_paqueteComprado FOREIGN KEY (paquete_id)
    REFERENCES paquetes(id)
)