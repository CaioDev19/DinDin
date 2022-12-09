CREATE TABLE usuarios(
	id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

CREATE TABLE categorias(
	id SERIAL PRIMARY KEY,
  descricao VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE transacoes(
	id SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor BIGINT CHECK(valor > 0) NOT NULL,
  data DATE DEFAULT NOW(),
  categoria_id INT NOT NULL,
  usuario_id INT NOT NULL,
  tipo VARCHAR(50),
  CONSTRAINT fk_categoria
    FOREIGN KEY(categoria_id)
      REFERENCES categorias(id),
  CONSTRAINT fk_usuario
    FOREIGN KEY(usuario_id)
      REFERENCES usuarios(id)
);

INSERT INTO categorias (descricao)
VALUES 
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');