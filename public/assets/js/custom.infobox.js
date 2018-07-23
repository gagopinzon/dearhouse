function drawInfobox(infoboxContent, json, i){
   
    if( json[i].precio )        { var precio = '<div class="price average-color"><span>' + json[i].precio + '</span></div>' }
        else                        { precio = '' }
    if(json[i].id)             { var id = json[i].id }
        else                        { id = '' }
    //if(json.url)            { var url = json[i].url }

    //1.- Venta         2.- Renta
    if(json[i].tipo)            {         
        var tipo = json[i].tipo 
        if(tipo== 1){tipo="Venta"}
        if(tipo== 2){tipo="Renta"}
    }
        else                        { tipo = '-' }

      //1.- casa         2.- depto          3.-terreno          4.-oficina          5.-Estudio  
    if(json[i].propiedad)           { 
        var propiedad = json[i].propiedad 
        if (propiedad == 1){propiedad="Casa"}
        if(propiedad ==2){propiedad="Departamento"}
        if(propiedad ==3){propiedad="Terreno"}
        if(propiedad ==4){propiedad="Oficina"}
        if(propiedad ==5){propiedad="Estudio"}
    }
        else                        { propiedad = '-' }

    if(json[i].calle)          { var calle = json[i].calle }
        else                        { calle = '' }
        if(json[i].municipio)       { var municipio = json[i].municipio }
        else                        { municipio = '-' }
    if(json[i].estado)       { var location = json[i].estado }
        else                        { location = '' }


    var galeria=json[i].images;

var res = galeria.split("||-");
console.log(res[0]);


    if(json[i].images)     { var gallery = res[0]}
        else                        { gallery = 'assets/img/default-item.png' }
    if(json[i].descripcion)     { var descripcion = json[i].descripcion }
        else                        { descripcion = 'Sin Descripción' }
    if(json[i].habitaciones)     { var habitaciones = json[i].habitaciones }
        else                        { habitaciones= '-' }
    if(json[i].baños)     { var baños = json[i].baños }
        else                        { baños= '-' }
        if(json[i].metros)     { var metros = json[i].metros }
        else                        { metros= '-' }
    if(json[i].estacionamiento)     { var estacionamiento = json[i].estacionamiento }
        else                        { estacionamiento= '-' }
    var ibContent = '';
    url = 'inmueble.html';
    ibContent =
    '<div class="infobox">' +
        '<div class="left">' +
            '<a href="'+ url +'" data-expand-width="col-9" data-transition-parent=".content-loader" data-external="true">' +
                '<div class="image">' +
                precio +
                    '<img src=/images/'+gallery+' alt="">' +
                '</div>' +
                '<header class="average-color">' +
                    '<h1 class="animate move_from_top_short">'+ calle +'</h1>' +
                    '<h2 class="animate move_from_top_short"><span>'+ municipio +' ' + location +'</span></h2>' +
                '</header>' +
            '</a>' +
        '</div>' +
        '<div class="right">' +
            '<article class="animate move_from_top_short">' +
            '<h3>'+ propiedad + ' en ' + tipo + '</h3>'+
                '<p>' + descripcion + ' </p>' +
            '</article>' +
            '<article class="animate move_from_top_short">' +
                '<h3>Vista Rápida</h3>' +
                '<dl>' +
                    '<dt>Cuartos</dt>' +
                    '<dd>' + habitaciones + '</dd>' +
                    '<dt>Baños</dt>' +
                    '<dd>' + baños + '</dd>' +
                    '<dt>Area</dt>' +
                    '<dd>'+ metros +' m<sup>2</sup></dd>' +
                    '<dt>Estacionamiento</dt>' +
                    '<dd>'+ estacionamiento +'</dd>' +
                '</dl>' +
            '</article>' +
        '</div>' +
    '</div>';

    return ibContent;
}