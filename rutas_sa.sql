-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2021 at 01:19 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `turimos_sa`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(3) NOT NULL COMMENT 'Primary key',
  `Usuario` varchar(255) NOT NULL,
  `Contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `Usuario`, `Contraseña`) VALUES
(1, 'user', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `puntos_turisticos`
--

CREATE TABLE `puntos_turisticos` (
  `ID` int(3) NOT NULL COMMENT 'FOREIGN KEY',
  `Numero_punto` int(3) NOT NULL,
  `Coord_X` double NOT NULL,
  `Coord_Y` double NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` text NOT NULL,
  `Icono` varchar(255) NOT NULL,
  `Direccion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `puntos_turisticos`
--

INSERT INTO `puntos_turisticos` (`ID`, `Numero_punto`, `Coord_X`, `Coord_Y`, `Nombre`, `Descripcion`, `Icono`, `Direccion`) VALUES
(1, 1, -33.60194890214756, -71.62421975422637, 'Puerto', 'Puerto pescados', 'Icono.jpg', 'Puerto #1'),
(1, 2, -33.58656421600778, -71.61184566226882, 'Verduleria', 'Verduras y frutas', 'Icono2.jpg', 'Verduleria #1'),
(2, 1, -33.592398, -71.595636, 'test', 'test desc', 'test ico', 'test calle'),
(2, 2, -33.600993, -71.606089, 'Parque', 'PARQUE BONITO', 'Icono4.jpg', 'UWU5'),
(3, 1, 10, 10, 'test', 'test', 'test', 'test'),
(3, 2, 10, 10, 'test', 'test', 'test', 'test'),
(4, 1, -33.58121967251228, -71.61526762157013, 'puerto ', 'descr', 'icono', 'calle 123'),
(4, 1, -33.58094258716381, -71.61953769838328, 'puerto  2', 'descr', 'icono', 'calle 123');

-- --------------------------------------------------------

--
-- Table structure for table `rutas`
--

CREATE TABLE `rutas` (
  `ID` int(3) NOT NULL COMMENT 'PRIMARY KEY',
  `Nombre` varchar(60) NOT NULL,
  `Estado` enum('Activa','No Activa') NOT NULL,
  `Descripcion` text NOT NULL,
  `Material_visual` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rutas`
--

INSERT INTO `rutas` (`ID`, `Nombre`, `Estado`, `Descripcion`, `Material_visual`) VALUES
(1, 'Ruta Prueba', 'Activa', 'descripcion 1', 'Imagen.jpg'),
(2, 'test', 'Activa', 'descripcion 2', 'test ahhhh'),
(3, 'test clase', 'Activa', 'test', 'test'),
(4, 'nueva ruta', 'Activa', 'descr', 'foto');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `rutas`
--
ALTER TABLE `rutas`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT COMMENT 'Primary key', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rutas`
--
ALTER TABLE `rutas`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY', AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
