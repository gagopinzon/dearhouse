// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Inmueble = sequelize.define('Inmueble', {   
calle: {
  type: DataTypes.STRING,
  allowNull: false
},
Num: {
  type: DataTypes.STRING  
},
interior: {
  type: DataTypes.STRING  
},
colonia: {
  type: DataTypes.STRING  
},
municipio: {
  type: DataTypes.STRING  
},
estado: {
  type: DataTypes.STRING  
},
tipo: {
  type: DataTypes.STRING  
},
propiedad: {
  type: DataTypes.STRING  
},
habitaciones: {
  type: DataTypes.STRING  
},
baños: {
  type: DataTypes.STRING  
},
plantas: {
  type: DataTypes.STRING  
},
precio: {
  type: DataTypes.STRING  
},
estacionamiento: {
  type: DataTypes.STRING  
},
amueblado: {
  type: DataTypes.STRING  
},
terraza: {
  type: DataTypes.STRING  
},
alberca: {
  type: DataTypes.STRING  
},
aire: {
  type: DataTypes.STRING  
},
usuario: {
  type: DataTypes.STRING  
},
lat: {
  type: DataTypes.STRING  
},
lon: {
  type: DataTypes.STRING  
} }
);


  return Inmueble;
};