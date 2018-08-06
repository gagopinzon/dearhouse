$(document).ready(function() {

      // This file just does a GET request to figure out which user is logged in
      // and updates the HTML on the page
      $.post("/api/datosUsuario").then(function(elUsuario) {
      //  $(".profile-text").text(data.email);
var user=JSON.parse(elUsuario);
 
       var nombre = $('#Nombre');
       nombre.val(user.nombre);

       var apellido = $('#Apellido');
       apellido.val(user.apellido);

       var email = $('#email');
       email.val(user.email);

       var telefono = $('#telefono');
       telefono.val(user.telefono);

       var website = $('#website');
       website.val(user.website);

       var ubicacion = $('#ubicacion');
       ubicacion.val(user.ubicacion);

       var descripcion = $('#descripcion');
       descripcion.val(user.descripcion);
      });



  // Getting references to our form and input
  var cambioUser = $("form.cambioUsuario");
  var nombreInput = $("#Nombre");
  var apellidoInput = $("#Apellido");
  var emailInput = $("#email");
  var telefonoInput = $("#telefono");
  var websiteInput = $("#website");
  var ubicacionInput = $("#ubicacion");
  var descripcionInput = $("#descripcion");

  // When the signup button is clicked, we validate the email and password are not blank
  cambioUser.on("submit", function(event) {

    event.preventDefault();
    var dUsuario = {
      nombre: nombreInput.val().trim(),
      apellido: apellidoInput.val().trim(),
      email: emailInput.val().trim(),
      telefono: telefonoInput.val().trim(),
      website: websiteInput.val().trim(),
      ubicacion: ubicacionInput.val().trim(),
      descripcion: descripcionInput.val().trim()
    };
    if (!dUsuario.nombre || !dUsuario.apellido || !dUsuario.email || !dUsuario.telefono || !dUsuario.website || !dUsuario.ubicacion || !dUsuario.descripcion ) {
      return;
    }

    hacerCambios(dUsuario.nombre, dUsuario.apellido, dUsuario.email, dUsuario.telefono, dUsuario.website, dUsuario.ubicacion, dUsuario.descripcion);

    function hacerCambios(nombre, apellido, email, telefono, website, ubicacion, descripcion){
      {
        $.post("/api/actualizarUsuario", {
          nombre:nombre,
          apellido:apellido,
          email: email,
          telefono:telefono,
          website:website,
          ubicacion:ubicacion,
          descripcion:descripcion
         
        }).then(function(data) {
          window.location.replace(data);
          // If there's an error, handle it by throwing up a boostrap alert
        }).catch(handleLoginErr);
      }
    
      function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      }
    }
console.log(dUsuario);


    });
    

     
  });