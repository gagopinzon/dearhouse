$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.post("/api/cualID").then(function(data) {
 
        var galeria=data.direccion[0].images;

    var res = galeria.split("||-");
    console.log(res[0]);
    var str="<div></div>";
    
    if(data.direccion[0].images)     { var gallery = res[0]}
     else                        { gallery = 'assets/img/default-item.png' }



     for (i = 0; i < res.length; i++) {
   
       if(i==0){
           str="";
       }
console.log(res[i]);
            str += "<div><img src=/images/" + res[i] + "></div>";
}
setTimeout('slickIt()',300);

document.getElementById("rotationImages").innerHTML = str;


    $(".imagen").text(data.direccion[0].calle);
     $(".calle").text(data.direccion[0].calle);
     $(".numero").text(" " + data.direccion[0].Num);
     $(".colonia").text(data.direccion[0].colonia);
     $(".cuartos").text(data.direccion[0].habitaciones);
     $(".baños").text(data.direccion[0].baños);
     $(".area").text(data.direccion[0].metros);
     $(".estacionamiento").text(data.direccion[0].estacionamiento);
     $(".lat").text(data.direccion[0].lat);
     $(".lon").text(data.direccion[0].lon);
     $(".nombre").text(data.usuario.nombre + " " + data.usuario.apellido);
     $(".telefono").text(data.usuario.telefono);
     $(".correo").text(data.usuario.email);
     $(".descripcionUsuario").text(data.usuario.descripcion);
     var amueblado=data.direccion[0].amueblado;
     if(amueblado==1){amueblado="Amueblado"}else{amueblado=""};
     $(".amueblado").text(amueblado);

     var terraza=data.direccion[0].terraza;
     if(terraza==1){terraza="Tiene Terraza"}else{terraza=""};
     $(".terraza").text(terraza);

     var alberca=data.direccion[0].alberca;
     if(alberca==1){alberca="Tiene alberca"}else{alberca=""};
     $(".alberca").text(alberca);

     var aire=data.direccion[0].aire;
     if(aire==1){aire="Tiene Aire Acondicionado"}else{aire=""};
     $(".aire").text(aire);

     var servicio=data.direccion[0].servicio;
     if(servicio==1){servicio="Tiene cuarto de Servicio"}else{servicio=""};
     $(".servicio").text(servicio);

     var lavado=data.direccion[0].lavado;    
     if(lavado==1){lavado="Tiene cuarto de Lavado"}else{lavado=""};
     $(".lavado").text(lavado);

     var mascotas=data.direccion[0].mascotas;  
     if(mascotas==1){mascotas="Se aceptan mascotas"}else{mascotas=""};
     $(".mascotas").text(mascotas);

     var tipo = data.direccion[0].tipo; 
        if(tipo== 1){tipo="Venta"}
        if(tipo== 2){tipo="Renta"}
        $(".tipo").text(tipo);
        $(".precio").text(data.direccion[0].precio);
        $(".descripcion").text(data.direccion[0].descripcion);







        var _latitude = data.direccion[0].lat;
        var _longitude = data.direccion[0].lon;

        var draggableMarker = false;
        var scrollwheel = true;
        var element = document.querySelector('body');
    
        if( hasClass(element, 'external') ){
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "../../js/external.js";
            head.appendChild(script);
        }
        else { 
         
            simpleMap(_latitude, _longitude,draggableMarker, scrollwheel);
            rating();
            averageColor( $('.content-container') );
        }
    
        function hasClass(element, cls) {
            return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
        }
    








    });



  });
