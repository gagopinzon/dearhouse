
$(document).ready(function () {
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



  











});
