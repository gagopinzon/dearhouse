
var db = require("../models");
const _ = require('lodash');

function obtenerUsuario(cual){

    return db.Usuario.findOne({  
        where: { 
          id:cual 
        }
      }).then(corre => {
        if (!corre) {
          return done(null, false, {
            message: "ño"
          });
        };
      
        return corre;
     

    }
  ).catch(function(err) {
   
  console.log(err);
  
  });

}

obtenerUsuario(1).then(function(result){
    console.log(result.nombre);
 }).catch(function(err) {

console.log("uhmmm");

});






