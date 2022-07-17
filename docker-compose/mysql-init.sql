--
-- Padrão de criação da tabela do mysql
--

-- Base: db_nestjs_signin
-- User: u_nest
-- Pass: NzAfzfw4rCrqN9yoa2G6QvDR3sdz4qom

-- Cria a base
CREATE DATABASE IF NOT EXISTS db_nestjs_signin
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci;

-- Cria um usuário
CREATE USER `u_nest`@'%' IDENTIFIED BY 'NzAfzfw4rCrqN9yoa2G6QvDR3sdz4qom';

-- Define os privilégios do usuário
GRANT ALTER, CREATE, DELETE, DROP, INDEX, 
INSERT, SELECT, UPDATE, REFERENCES 
	ON *.* TO 'u_nest'@'%';
