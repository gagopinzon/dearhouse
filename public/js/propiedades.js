
$(document).ready(function() {



      $.get("/api/obtener", {
       
      }).then(function(data, res) {
          data2=JSON.parse(data);
          //console.log("empieza " + data2.count); 
//console.log("empieza " + data2.rows[0].lat); 


    var _latitude = data2.rows[0].lat;
    var _longitude = data2.rows[0].lon;
    var _jsonPath = data2.rows;

    // Load JSON data and create Google Maps
    createHomepageGoogleMap(_latitude,_longitude,data2.count,data2.rows);



      })
  



     








});


