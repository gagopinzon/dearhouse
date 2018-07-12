
var db = require("../models");
const _ = require('lodash');

function propiedades(cuales){

    return db.Inmueble.findOne({  
        where: { 
          Num:cuales 
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
   
  console.log("no");
  
  });

}

propiedades("5588").then(function(result){
    console.log(result.calle);
 }).catch(function(err) {

console.log("no");

});;






