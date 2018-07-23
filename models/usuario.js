// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Usuario = sequelize.define('Usuario', {   
nombre: {
  type: DataTypes.STRING,
  allowNull: false
},
apellido: {
  type: DataTypes.STRING  
},
email: {
  type: DataTypes.STRING  
},
telefono: {
  type: DataTypes.STRING  
},
imagen: {
  type: DataTypes.STRING  
},
website: {
  type: DataTypes.STRING  
},
descripcion: {
  type: DataTypes.STRING  
}
}
);


  return Usuario;
};