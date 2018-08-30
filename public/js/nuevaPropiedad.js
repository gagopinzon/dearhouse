
$(document).ready(function () {


  $.post("/api/datosUsuario").then(function(elUsuario) {
    //  $(".profile-text").text(data.email);
var user=JSON.parse(elUsuario);
var elId = $('#elid');
elId.val(user.id);
  });


  var nuevaPropiedadForm = $("form.updatePropiedad");
  var calleUp = $("input#calle");
  var numUp = $("input#num");
  var intUp = $("input#interior");
  var coloniaUp = $("input#colonia");
  var municipioUp = $("input#municipio");
  var estadoUp = $("input#estado");
  var tipoUp = $(".tipo");
  var propiedadUp = $(".propiedad");
  var habitacionesUp = $("input#habitaciones");
  var banosUp = $("input#banos");
  var plantasUp = $("input#plantas");
  var precioUp = $("input#precio");
  var estacionamientoUp = $("input#estacionamiento");
  var metrosUp = $("input#metros");
  var amuebladoUp = $("input#amueblado");
  var terrazaUp = $("input#terraza");
  var albercaUp = $("input#alberca");
  var aireUp = $("input#aire");
  var servicioUp = $("input#servicio");
  var lavadoUp = $("input#lavado");
  var mascotasUp = $("input#mascotas");

  var latitudeUp = $("input#latituteUp");
  var longitudeUp = $("input#longitudeUp");

  var amueblado = 0;
  var terraza = 0;
  var alberca = 0;
  var aire = 0;
  var servicio = 0;
  var lavado = 0;
  var mascotas = 0;


  var _latitude = 51.541599;
  var _longitude = -0.112588;
  var draggableMarker = true;
  var scrollwheel = true;

  rating();

  averageColor($('#item-detail'));

  //bootstrapSelect();

  $('input').iCheck();

  $('.submit-button').addClass('submit-page-open');


  simpleMap(_latitude, _longitude, draggableMarker, scrollwheel);


  var input2 = document.getElementById('calle');
  var autocomplete = new google.maps.places.Autocomplete(input2, {
    types: ["geocode"]
  });
  autocomplete.bindTo('bounds', map);


  //image upload
  var selDiv = "";
  var storedFiles = [];
  $("#foto").on("change", handleFileSelect);

  selDiv = $("#photos_clearing");


  $("body").on("click", ".selFile", removeFile);


  function handleFileSelect(e) {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function (f) {

      if (!f.type.match("image.*")) {
        return;
      }
      storedFiles.push(f);

      var reader = new FileReader();
      reader.onload = function (e) {
        var html = "<div class='laGaleria'><img src=\"" + e.target.result + "\" data-file='" + f.name + "' class='selFile' title='Click to remove'><br>" + f.name + "<br clear=\"left\"/></div>";
        selDiv.append(html);

      }
      reader.readAsDataURL(f);
    });

  }

  function handleForm(e) {
    e.preventDefault();
    var data = new FormData();

    for (var i = 0, len = storedFiles.length; i < len; i++) {
      data.append('files', storedFiles[i]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'handler.cfm', true);

    xhr.onload = function (e) {
      if (this.status == 200) {
        console.log(e.currentTarget.responseText);
        alert(e.currentTarget.responseText + ' items uploaded.');
      }
    }

    xhr.send(data);
  }

  function removeFile(e) {
    var file = $(this).data("file");
    for (var i = 0; i < storedFiles.length; i++) {
      if (storedFiles[i].name === file) {
        storedFiles.splice(i, 1);
        break;
      }
    }
    $(this).parent().remove();




  };


  nuevaPropiedadForm.on("submit", function (event) {
    event.preventDefault();

    console.log(latitudeUp + "" + longitudeUp);



    if( amuebladoUp.prop("checked") ) {
      amueblado = 1;
  };
  if(terrazaUp.prop("checked") ) {
    terraza = 1;
};
if(albercaUp.prop("checked") ) {
  alberca = 1;
};
if(aireUp.prop("checked") ) {
  aire = 1;
};
if(servicioUp.prop("checked") ) {
  servicio = 1;
};
if(lavadoUp.prop("checked") ) {
  lavado = 1;
};
if(mascotasUp.prop("checked") ) {
  mascotas = 1;
};
    var propiedadData = {
      calle: calleUp.val().trim(),
      num: numUp.val().trim(),
      int: intUp.val().trim(),
      colonia: coloniaUp.val().trim(),
      municipio: municipioUp.val().trim(),
      estado: estadoUp.val().trim(),
      tipode: (tipoUp.val()).toString(),
      propiedad: propiedadUp.val(),
      habitaciones: habitacionesUp.val().trim(),
      banos: banosUp.val().trim(),
      plantas: plantasUp.val().trim(),
      precio: precioUp.val().trim(),
      estacionamiento: estacionamientoUp.val().trim(),
      metros: metrosUp.val().trim(),
      amueblado:amueblado,
      terraza:terraza,
      alberca:alberca,
      aire:aire,
      servicio:servicio,
      lavado:lavado,
      mascotas:mascotas,
      latitude:latitudeUp.val().trim(),
      longitude:longitudeUp.val().trim()
    };

    subirPropiedad(propiedadData.calle, propiedadData.num, propiedadData.int, propiedadData.colonia, propiedadData.municipio, propiedadData.estado, propiedadData.tipode, propiedadData.propiedad, propiedadData.habitaciones, propiedadData.banos, propiedadData.plantas, propiedadData.precio, propiedadData.estacionamiento, propiedadData.metros, propiedadData.amueblado, propiedadData.terraza, propiedadData.alberca, propiedadData.aire, propiedadData.servicio, propiedadData.lavado, propiedadData.mascotas, propiedadData.latitude, propiedadData.longitude);
    function subirPropiedad(calle, num, int, colonia, municipio, estado, tipode, propiedad, habitaciones, banos, plantas, precio, estacionamiento, metros,amueblado,terraza,alberca,aire,servicio,lavado,mascotas,latitude,longitude) {
      $.post("/api/subirNuevaPropiedad", {
        calle: calle,
        num: num,
        int: int,
        colonia: colonia,
        municipio: municipio,
        estado: estado,
        tipode: tipode,
        propiedad: propiedad,
        habitaciones: habitaciones,
        banos: banos,
        plantas: plantas,
        precio: precio,
        estacionamiento: estacionamiento,
        metros: metros,
        amueblado:amueblado,
        terraza:terraza,
        alberca:alberca,
        aire:aire,
        servicio:servicio,
        lavado:lavado,
        mascotas:mascotas,
        latitude:latitude,
        longitude:longitude
      }).then(function (data) {
        console.log(data);
        // window.location.replace(data);
        // If there's an error, log the error
      }).catch(function (err) {
        console.log(err);
      });
    }
  });


});
