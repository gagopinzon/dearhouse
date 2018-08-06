$(document).ready(function() {

  
  var busquedaForm = $("form.busqueda");
  var busquedaForm2 = $(".botBusqueda");
var busquedaForm3=$(".form-control-precio");





  busquedaForm.change(function(){
muestraBotonBusqueda();
});

  busquedaForm2.click(function(){
    muestraBotonBusqueda();
    });
    busquedaForm3.keypress(function(){
        muestraBotonBusqueda(); 
    })

function muestraBotonBusqueda(){

document.getElementById('aplicarCambios').style.visibility = 'visible';
document.getElementById('aplicarCambios').style.display = 'block';
$("#aplicarCambios").css("visibility", "visible");
$("#aplicarCambios").css("display", "block");
}



busquedaForm.on("submit", function(event) {
   document.getElementById('aplicarCambios').style.visibility = 'hidden';
    document.getElementById('aplicarCambios').style.display = 'none';

  var tipo = $("#tipo");
 
var rentovent = $("#renoven");

var cuarto=$("#cuartos");

var baños = $("#baños");

var preciomin=$("#minPrecio");

var preciomax=$("#maxPrecio");



    var busquedaData = {
     tipoCan: tipo.val(),
     rentoventCan: rentovent.val(),
    cuartoCan: cuarto.val(),
  bañosCan:baños.val(),
  preciominCan:preciomin.val(),
 preciomaxCan:preciomax.val()
    };

    filtroBusqueda(busquedaData.tipoCan, busquedaData.rentoventCan,busquedaData.cuartoCan,busquedaData.bañosCan,busquedaData.preciomaxCan,busquedaData.preciominCan);

    



});



function filtroBusqueda(tipoCan,rentoventCan,cuartoCan,bañosCan,preciomaxCan,preciominCan) {
console.log("siii" +rentoventCan);
  $.post("/api/filtroBusqueda", {
    tipoCan: JSON.stringify(tipoCan),
    rentoventCan: JSON.stringify(rentoventCan),
  cuartoCan: cuartoCan,
  bañosCan: bañosCan,
  preciomaxCan: preciomaxCan,
  preciominCan: preciominCan
  }).then(function(data) {
console.log("alo");
data2=JSON.parse(data);
//console.log("empieza " + data2.count); 
//console.log("empieza " + data2.rows[0].lat); 


var _latitude = data2.rows[0].lat;
var _longitude = data2.rows[0].lon;
var _jsonPath = data2.rows;

// Load JSON data and create Google Maps
createHomepageGoogleMap(_latitude,_longitude,data2.count,data2.rows);

  })//.catch(handleLoginErr);
}

function handleLoginErr(err) {
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}



});