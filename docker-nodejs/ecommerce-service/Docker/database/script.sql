CREATE DATABASE IF NOT EXISTS travel_db;
USE travel_db;

-- Elimina las tablas si ya existen
DROP TABLE IF EXISTS QUOTATION;
DROP TABLE IF EXISTS PRICE;
DROP TABLE IF EXISTS COVERAGE;
DROP TABLE IF EXISTS VEHICLE;
DROP TABLE IF EXISTS PROVIDER;
DROP TABLE IF EXISTS CATEGORY;
DROP TABLE IF EXISTS PLACES;
DROP TABLE IF EXISTS USER;

-- Tabla de usuarios
CREATE TABLE USER (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO USER (name, email) VALUES 
('Juan Davis', 'juan.david@example.com'),
('Bob Jean', 'bob.jean@example.com'),
('Carlos Manrique', 'carlos.manrique@example.com'),
('David Leyva', 'david.leyva@example.com');

-- Tabla de lugares
CREATE TABLE PLACES (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

INSERT INTO PLACES (name) VALUES 
('Arequipa'),
('Barranca'),
('Piura'),
('Lima'),
('Iquitos'),
('Ucayali'),
('Tumbes'),
('Trujillo'),
('Cuzco'),
('Chiclayo');

-- Tabla de categorías de viaje
CREATE TABLE CATEGORY (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

INSERT INTO CATEGORY (name) VALUES
('Standard'),
('Premium');

-- Tabla de proveedores
CREATE TABLE PROVIDER (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

INSERT INTO PROVIDER (name) VALUES 
('PULLMAN BUS'),
('TURBUS');

-- Tabla de vehículos
CREATE TABLE VEHICLE (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  identificador VARCHAR(100) NOT NULL,
  capacity_standard INT NOT NULL,
  capacity_premium INT NOT NULL,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES CATEGORY(id)
);

INSERT INTO VEHICLE (name, identificador, capacity_standard, capacity_premium, category_id) VALUES 
('Bus Standard', 'VS001', 40, 0, 1),
('Bus Premium', 'VP001', 30, 10, 2);

-- Tabla de cobertura
CREATE TABLE COVERAGE (
  id INT AUTO_INCREMENT PRIMARY KEY,
  origin_place_id INT,
  destination_place_id INT,
  provider_id INT,
  vehicle_id INT,
  start_time DATETIME NOT NULL,
  duration_hours INT NOT NULL,
  FOREIGN KEY (origin_place_id) REFERENCES PLACES(id),
  FOREIGN KEY (destination_place_id) REFERENCES PLACES(id),
  FOREIGN KEY (provider_id) REFERENCES PROVIDER(id),
  FOREIGN KEY (vehicle_id) REFERENCES VEHICLE(id)
);

INSERT INTO COVERAGE (origin_place_id, destination_place_id, provider_id, vehicle_id, start_time, duration_hours) VALUES 
(1, 2, 1, 1, '2024-10-21 08:00:00', 5),
(2, 3, 2, 2, '2024-10-22 09:00:00', 4),
(4, 5, 1, 1, '2024-10-25 12:00:00', 7);

-- Tabla de precios
CREATE TABLE PRICE (
  id INT AUTO_INCREMENT PRIMARY KEY,
  coverage_id INT,
  valid_from DATE NOT NULL,
  valid_to DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (coverage_id) REFERENCES COVERAGE(id)
);

INSERT INTO PRICE (coverage_id, valid_from, valid_to, amount) VALUES 
(1, '2024-10-20', '2024-12-31', 50.00),
(2, '2024-10-20', '2024-12-31', 40.00),
(3, '2024-10-20', '2024-12-31', 70.00);

-- Tabla de cotizaciones
CREATE TABLE QUOTATION (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  coverage_id INT,
  category_id INT,
  travel_date DATE NOT NULL,
  passenger_count INT NOT NULL,
  status ENUM('creada', 'reserva', 'reserva cancelada') DEFAULT 'creada',
  FOREIGN KEY (user_id) REFERENCES USER(id),
  FOREIGN KEY (coverage_id) REFERENCES COVERAGE(id),
  FOREIGN KEY (category_id) REFERENCES CATEGORY(id)
);

INSERT INTO QUOTATION (user_id, coverage_id, category_id, travel_date, passenger_count, status) VALUES 
(1, 1, 1, '2024-10-21', 2, 'creada'),
(3, 2, 2, '2024-10-23', 1, 'creada');
