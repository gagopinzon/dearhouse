-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-08-2018 a las 06:32:19
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_users`
--
CREATE DATABASE IF NOT EXISTS `db_users` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `db_users`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hola`
--

CREATE TABLE `hola` (
  `a` int(11) NOT NULL,
  `b` int(11) NOT NULL,
  `c` int(11) NOT NULL,
  `d` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmuebles`
--

CREATE TABLE `inmuebles` (
  `id` int(11) NOT NULL,
  `calle` varchar(255) NOT NULL,
  `Num` varchar(255) DEFAULT NULL,
  `interior` varchar(255) DEFAULT NULL,
  `colonia` varchar(255) DEFAULT NULL,
  `municipio` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `propiedad` varchar(255) DEFAULT NULL,
  `habitaciones` varchar(255) DEFAULT NULL,
  `baños` varchar(255) DEFAULT NULL,
  `plantas` varchar(255) DEFAULT NULL,
  `precio` varchar(255) DEFAULT NULL,
  `estacionamiento` varchar(255) DEFAULT NULL,
  `amueblado` varchar(255) DEFAULT NULL,
  `terraza` varchar(255) DEFAULT NULL,
  `alberca` varchar(255) DEFAULT NULL,
  `aire` varchar(255) DEFAULT NULL,
  `servicio` text NOT NULL,
  `lavado` text NOT NULL,
  `mascotas` text NOT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  `lat` varchar(255) DEFAULT NULL,
  `lon` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `metros` text NOT NULL,
  `descripcion` text NOT NULL,
  `images` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `inmuebles`
--

INSERT INTO `inmuebles` (`id`, `calle`, `Num`, `interior`, `colonia`, `municipio`, `estado`, `tipo`, `propiedad`, `habitaciones`, `baños`, `plantas`, `precio`, `estacionamiento`, `amueblado`, `terraza`, `alberca`, `aire`, `servicio`, `lavado`, `mascotas`, `usuario`, `lat`, `lon`, `createdAt`, `updatedAt`, `metros`, `descripcion`, `images`) VALUES
(1, 'Pedro Simon Laplace', '5588', '2', 'arboledas', 'zapopan', 'jalisco', '1', '1', '3', '1', '1', '10000', '1', '0', '1', '0', '0', '1', '0', '1', '1', '20.630330', '-103.426862', '2018-07-11 12:00:00', '2018-07-11 11:00:00', '130', 'la casa de simon laplace', 'alfaro-perfil.jpg||-amlo_album_panini_mundial.2e16d0ba.fill-800x400-c100.png||-ayanalfaro.png'),
(3, 'a las cumbres', '348', NULL, 'prados vallarta', 'zapopan', 'jalisco', '1', '1', '1', '1', '1', '6300', '1', '0', '1', '0', '0', '1', '0', '1', '1', '20.675238', '-103.419052', '2018-07-11 09:00:00', '2018-07-11 17:00:00', '80', 'la casa de ahorita', 'logo.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'mrgago@gmail.com', '$2a$10$HZ9AlafhgOLCYAJQ4uBg5OUrGg78Pp2qxHjLBCWRjV5DgGXA2yUbC', '2018-07-04 16:20:03', '2018-08-06 02:04:14'),
(2, 'raul@aa.com', '$2a$10$no6waQjxAz9ELGMoQwPIKeDQkLHni3IWb5rxFNuwyEbelKE.Hap4C', '2018-08-05 23:44:39', '2018-08-05 23:44:39'),
(4, 'b@b.com', '$2a$10$X8MUagmq4gWCtncAbyB.5uAkPCQdOVLuCfC6GbWSEVi1c0ZSjqg6e', '2018-08-06 00:20:23', '2018-08-06 00:20:23'),
(5, 'c@c.com', '$2a$10$3olFc6FzP0z6Q2hNG3nL9OHEP7jHRX6QU81CiNDQ22kv6AG14wUIS', '2018-08-06 01:10:39', '2018-08-06 01:10:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `ubicacion` text,
  `descripcion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `telefono`, `imagen`, `website`, `ubicacion`, `descripcion`, `createdAt`, `updatedAt`) VALUES
(1, 'Gabriel Alberto', 'Pinzón Pérez', 'mrgago@gmail.com', '3316820187', NULL, 'www.gago.com', 'Guadalajara, Jalisco', 'hola. esto es una prueba y si funciono ahora si', '2018-07-05 00:00:00', '2018-08-06 02:06:02'),
(2, 'pepe', 'pecas', 'pepe@pecas.com', '1234567890', NULL, 'pepe.com', 'Zapopan, Jalisco', 'prueba2', '2018-07-22 00:00:00', '2018-07-16 00:00:00'),
(3, NULL, NULL, 'c@c.com', NULL, NULL, NULL, NULL, NULL, '2018-08-06 01:10:39', '2018-08-06 01:10:39'),
(4, '4', '4', '4', '4', '4', '4', '4', '4', '2018-08-08 00:00:00', '2018-08-07 00:00:00'),
(5, '5', '5', '5', '5', '5', '5', '5', '5', '2018-08-14 00:00:00', '2018-08-09 00:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `inmuebles`
--
ALTER TABLE `inmuebles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inmuebles`
--
ALTER TABLE `inmuebles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
