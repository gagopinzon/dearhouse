// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
//
var elides;


module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });
  //


  // mandamos la lista de las propiedades
  app.get("/api/obtener", function (req, res) {

    function propiedades() {

      return db.Inmueble.findAndCountAll({

        attributes: ["id", "calle", "Num", "interior", "colonia", "municipio", "estado", "tipo", "propiedad", "habitaciones", "metros", "baños", "plantas", "precio", "estacionamiento", "amueblado", "terraza", "alberca", "aire", "servicio", "lavado", "mascotas", "usuario", "descripcion", "lat", "lon", "images"]
      }).then(corre => {

        if (!corre) {
          return done(null, false, {
            message: "ño"
          });
        };

        return corre;

      }
      ).catch(function (err) {

        console.log("no");

      });

    }

    propiedades().then(function (result) {
      global.pines = result;
      res.send(JSON.stringify(result));

    }).catch(function (err) {

      console.log("no");

    });;


    //fin 
  });







  app.post("/api/filtroBusqueda", function (req, res) {
    function propiedades() {
      var propiedad = JSON.parse(req.body.tipoCan);
      if (!propiedad) {
        propiedad = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      };
      var tipo = JSON.parse(req.body.rentoventCan);
      if (!tipo) {
        tipo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      };
      var habitaciones = req.body.cuartoCan;
      if (!habitaciones) {
        habitaciones = 9999
      };

      var baños = req.body.baños;
      if (!baños) {
        baños = 9999
      };

      var precioMin = req.body.preciominCan;
      if (!precioMin) {
        precioMin = 1
      };

      var precioMax = req.body.preciomaxCan;
      if (!precioMax) {
        precioMax = 999999999
      };

      return db.Inmueble.findAndCountAll({
        where: {
          propiedad: { $in: propiedad },
          tipo: { $in: tipo },
          habitaciones: { $lte: habitaciones },
          baños: { $lte: baños },
          precio: { $between: [precioMin, precioMax] }

        },
        attributes: ["id", "calle", "Num", "interior", "colonia", "municipio", "estado", "tipo", "propiedad", "habitaciones", "metros", "baños", "plantas", "precio", "estacionamiento", "amueblado", "terraza", "alberca", "aire", "servicio", "lavado", "mascotas", "usuario", "descripcion", "lat", "lon", "images"]
      }).then(corre => {

        if (!corre) {
          return done(null, false, {
            message: "ño"
          });
        };

        return corre;

      }
      ).catch(function (err) {

        console.log("no");

      });

    }

    propiedades().then(function (result) {
      global.pines = result;
      res.send(JSON.stringify(result));

    }).catch(function (err) {

      console.log("no");

    });;
  });























  // Pasamos el id de la propiedad a inmueble.html
  app.post("/api/pasaID", function (req, res) {

    global.elides = req.body.cual;
    eluser = req.body.eluser;

    // The user is not logged in, send back an empty object





    function obtenerUsuario(cual) {

      return db.Usuario.findOne({
        where: {
          id: cual
        }
      }).then(corre => {
        if (!corre) {
          return done(null, false, {

          });
        };

        return corre;


      }
      ).catch(function (err) {

        console.log(err);

      });

    }
    obtenerUsuario(eluser).then(function (result) {
      global.eluser = result;
      res.send(JSON.stringify(global.elides));
    }).catch(function (err) {

      console.log("uhmmm");

    });


  });





  // Pasamos el id de la propiedad a inmueble.html
  app.post("/api/cualID", function (req, res) {
    var arrFound = global.pines.rows.filter(function (item) {
      return item.id == global.elides;
    });

    res.json({ direccion: arrFound, usuario: global.eluser });

  });













  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {

    db.Usuario.create({
      email: req.body.email,

    });

    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      console.log("no");
      res.json("/repetido");
      // res.status(422).json(err.errors[0].message);
    });
  });
  //
  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  //
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
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




  // obtenemos los datos para los Datos de Usuario
  app.post("/api/datosUsuario", function (req, res) {

    if (!req.user) {
      res.json({});
    }

    else {

      function obtenerDatosUsuario(cual) {
        return db.Usuario.findOne({
          where: {
            email: cual
          }
        }).then(DataUser => {
          if (!DataUser) {
            return done(null, false, {
              message: "ño"
            });
          };

          return DataUser;


        }
        ).catch(function (err) {

          console.log(err);

        });

      }
      obtenerDatosUsuario(req.user.email).then(function (resultUsuario) {
        console.log(resultUsuario);
        res.json(JSON.stringify(resultUsuario));

      }).catch(function (err) {


      });


    }
  });



  app.post("/api/actualizarUsuario", function (req, res) {



    db.Usuario.update({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
      website: req.body.website,
      ubicacion: req.body.ubicacion,
      descripcion: req.body.descripcion

    }, { where: { email: req.body.email } }
    ).then(function () {
      res.redirect(307, "http://www.google.com");
    }).catch(function (err) {
      console.log(err);
      console.log("no");
      res.json("/repetido");
      // res.status(422).json(err.errors[0].message);
    });
  });


  //imagenesw
  /* var multer = require('multer');
  var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/images'); // set the destination
    },
    filename: function (req, file, callback) {
      var numeroRandom = Math.floor(Math.random() * 1000);
      callback(null, Date.now() + numeroRandom + '.jpg'); // set the file name and extension
    }
  });
  var upload = multer({ storage: storage }).array('foto', 2);
  app.post('/api/subirfoto', upload, function (req, res, next) {
console.log(storedFiles); 
   




  });*/


  app.post('/api/subirNuevaPropiedad', function (req, res) {

    db.Inmueble.create({
      calle: req.body.calle,
      Num: req.body.num,
      interior: req.body.int,
      colonia: req.body.colonia,
      municipio: req.body.municipio,
      estado: req.body.estado,
      tipo: req.body.tipode,
      propiedad: req.body.propiedad,
      habitaciones: req.body.habitaciones,
      baños: req.body.banos,
      plantas: req.body.plantas,
      precio: req.body.precio,
      estacionamiento: req.body.estacionamiento,
      metros: req.body.metros,
      amueblado: req.body.amueblado,
      terraza: req.body.terraza,
      alberca: req.body.alberca,
      aire: req.body.aire,
      servicio:  req.body.servicio,
      lavado: req.body.lavado,
      mascotas: req.body.mascotas,
      lat: req.body.latitude,
      lon: req.body.longitude
    });
  });










};
