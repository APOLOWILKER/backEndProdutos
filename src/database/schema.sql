CREATE DATABASE meusdoces;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS doces (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  doceName VARCHAR NOT NULL,
  category_id UUID,
  FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS usuarios (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  email VARCHAR NOT NULL UNIQUE,
  senha VARCHAR NOT NULL
);
