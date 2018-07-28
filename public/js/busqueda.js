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
});



});