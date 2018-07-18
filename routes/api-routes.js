// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
//



module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });
//
	
	
// mandamos la lista de las propiedades
app.get("/api/obtener", function(req, res) {
  
  function propiedades(cuales){

    return db.Inmueble.findAndCountAll({  
        where: { 
          municipio:cuales 
        },
        attributes:["id","calle","Num","interior","colonia","municipio","estado","tipo","propiedad","habitaciones","metros","baños","plantas","precio","estacionamiento","amueblado","terraza","alberca","aire","usuario","descripcion","lat", "lon","images"]
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

propiedades("zapopan").then(function(result){
  res.send(JSON.stringify(result));
 }).catch(function(err) {

console.log("no");

});;


 //fin 
});

	
	


	
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
	  console.log("no");
      res.json("/repetido");
      // res.status(422).json(err.errors[0].message);
    });
  });
//
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
//
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
	  
	
	  
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

	
	

	
	
	
	
	
	
	
	
	
	
	
	
};
