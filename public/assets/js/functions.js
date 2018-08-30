////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function clickEvents($this) {

    var $grid = $('.grid');
    var $content = $('.content');
    var $contentLoader = $('.content-loader');

    var b = itemsInRow + 1;
    if ($($this).hasClass('item')) {
        var _this = $($this).children('a');
    }
    else {
        _this = $($this);
    }

    if (_this.attr('data-transition-parent') && !_this.hasClass('close')) {
        if (_this.attr('data-transition-parent') == '.content-loader') {
            if (!$contentLoader.hasClass('idle') || !$grid.hasClass('idle')) {
                setTimeout(function () {
                    $grid.addClass('idle');
                }, 700);
                $.each(itemsInRowArray, function (i) {
                    setTimeout(function () {
                        b--;
                        var referenceItemOffset = $('.item:nth-child(' + b + 'n)').css('left');
                        $('.item').each(function () {
                            if ($(this).css('left') == referenceItemOffset) {
                                $(this).addClass('stretch');
                            }
                        });
                    }, i * 100);
                });
            }

            if (_this.attr('data-expand-width')) {

                var oldActiveCol = activeCol;
                activeCol = _this.attr('data-expand-width');

                if (oldActiveCol && oldActiveCol != activeCol) {
                    $('.content').addClass('fade_out');
                    removeAnimation($content);
                    if ($contentLoader.hasClass('idle')) {
                        setTimeout(function () {
                            $grid.removeClass('offset-' + oldActiveCol);
                            $contentLoader.removeClass(oldActiveCol);
                            $grid.addClass('offset-' + activeCol);
                            $contentLoader.addClass(activeCol);
                            loadPage(_this);
                        }, 700);
                    }
                    else {
                        $grid.removeClass('offset-' + oldActiveCol);
                        $contentLoader.removeClass(oldActiveCol);
                        $grid.addClass('offset-' + activeCol);
                        $contentLoader.addClass(activeCol);
                        loadPage(_this);
                    }
                }
                else if (oldActiveCol) {
                    $($content).addClass('fade_out');
                    setTimeout(function () {
                        loadPage(_this);
                    }, 700);
                    $('.grid').addClass('offset-' + activeCol);
                    $contentLoader.addClass(activeCol);
                }
                else {
                    loadPage(_this);
                    $grid.addClass('offset-' + activeCol);
                    gridOffsetLeft();
                    $contentLoader.addClass(activeCol);
                }
                //                    console.log( $grid.offset().left );
                //                    setTimeout(function(){
                //                        console.log( $grid.offset().left );
                //                    }, 700);

            }
        }

        parentElement = _this.attr('data-transition-parent');
        animateElement(parentElement);
    }
}

function gridOffsetLeft() {
    if ($('body').hasClass('has-map')) {
        var containerOffsetLeft = $('#main-container').offset().left;
        $('.map-wrapper').css('left', containerOffsetLeft + 45);
        $('.map-wrapper').css('margin-left', 0);
        if ($('.masonry.full-width').length) {
            $('.masonry.full-width').css('left', $('.masonry.full-width').offset().left + 30);
        }
    }
}

function removeOffsetLeft() {
    if ($('body').hasClass('has-map')) {
        $('.map-wrapper').css('left', 0);
        $('.masonry.full-width').css('left', 0);
    }
}

// Display Admin Tools -------------------------------------------------------------------------------------------------

function showAdminTools(masonry) {
    $('.item').each(function () {
        var adminToolHtml =
            '<div class="admin-tools">' +
            '<div class="top">' +
            '<figure class="confirm-delete"><i class="fa fa-check"></i></figure>' +
            '<figure class="edit"><i class="fa fa-pencil"></i></figure>' +
            '</div>' +
            '<div class="bottom">' +
            '<figure class="cancel-delete"><i class="fa fa-times"></i></figure>' +
            '<figure class="delete"><i class="fa fa-trash"></i></figure>' +
            '</div>' +
            '</div>';
        $(this).append(adminToolHtml);
    });
    $('.delete, .cancel-delete').on('click', function () {
        $(this).parent().parent().parent().toggleClass('delete-clicked');
    });

    $('.confirm-delete').on('click', function () {
        masonry.remove($(this).parent().parent().parent());
        masonry.layout();
    });
}

// Click on grid -------------------------------------------------------------------------------------------------------

function clickOnGrid() {
    var $grid = $('.grid');
    var $pageContent = $('.page-content');
    var offset;

    $grid.click(function () {
        if ($grid.hasClass('idle') && !$pageContent.hasClass('item-clicked')) {
            offset = ($grid.width() + $grid.offset().left) - $(window).width();
            $grid.removeClass('offset-' + activeCol);
            //$grid.addClass('offset-'+activeCol);
            //alert( $grid.css('transform') );
            $grid.css('transform', 'translateX(' + (offset) + 'px)');
            $('.page-content').addClass('grid-clicked');
        }
    });

    $('.grid .item').on('click', function () {
        if ($pageContent.hasClass('grid-clicked')) {
            $pageContent.addClass('item-clicked');
            $grid.css('transform', '');
            $pageContent.removeClass('grid-clicked');
            $grid.addClass('offset-' + activeCol);
        }
    });

    $grid.on('mouseleave', function () {
        if ($grid.hasClass('idle')) {
            $pageContent.removeClass('item-clicked');
            $pageContent.removeClass('grid-clicked');
            $grid.css('transform', '');
            $grid.addClass('offset-' + activeCol);
        }
    });
}

function hoverOnGrid() {
    var waitOnHover;
    $grid = $('.grid');
    $grid.hover(function () {
        clearInterval(waitOnHover);
        if ($(this).hasClass('idle')) {
            //console.log("has");
            var time = 0;
            waitOnHover = setInterval(function () {
                time++;
                console.log(time);
                if (time >= 20) {
                    clearInterval(waitOnHover);
                    $grid.removeClass('offset-' + activeCol);
                    $grid.addClass('offset-col-2');
                    $('.page-content').addClass('grid-hovered');
                }
            }, 100);
        }
        else {
            clearInterval(waitOnHover)
        }
    }, function () {
        if ($('.page-content').hasClass('grid-hovered')) {
            $('.page-content').removeClass('grid-hovered');
            $grid.removeClass('offset-col-2');
            $grid.addClass('offset-' + activeCol);
            clearInterval(waitOnHover);
        }
        clearInterval(waitOnHover);
    });
}

// Load Page -----------------------------------------------------------------------------------------------------------

function loadPage(_this) {
    var $contentLoader = $('.content-loader');
    if ($(_this).attr('data-external')) {
        $('.content').removeClass('fade_out');
        var parentElement = $(_this).attr('data-transition-parent');
        if ($('#loader').length == 0) {
            $('.content').append('<div id="loader"></div>');
        }
        $('.content #loader').load($(_this).attr('href'), function (response, status, xhr) {
            bootstrapSelect();
            animateElement(parentElement);

            if ($(window).scrollTop() > $('body header:first').height()) {
                $('.content-loader').css('top', $(window).scrollTop() - ($('body header:first').height() + $('.promotion-area').height() + headerMargin + $('.page-content .search').height()));
                lastTopOffset = $contentLoader.offset().top;
                var contentLoaderHeight = $('.content-loader').height();
                var headerHeight = $('body header:first').height();
                var offsetFromTop = $(window).scrollTop();
                var heightDifference = (contentLoaderHeight + headerHeight + offsetFromTop) - documentHeight;

                if (heightDifference > 0) {
                    $('#page-wrapper').height(contentLoaderHeight + headerHeight + offsetFromTop);
                }
            }
            else {
                $('.content-loader').css('top', 0);
            }

            if (status == 'error') {
                console.log(status)
            }
        });
    }
}

// Bootstrap select ----------------------------------------------------------------------------------------------------

function bootstrapSelect() {
    var select = $('select');
    if (select.length > 0) {
        select.selectpicker();
    }
    var bootstrapSelect = $('.bootstrap-select');
    var dropDownMenu = $('div.dropdown-menu');

    bootstrapSelect.on('shown.bs.dropdown', function () {
        $(this).find(dropDownMenu).removeClass('slide_out');
        $(this).find(dropDownMenu).addClass('slide_in');
    });
    bootstrapSelect.on('hide.bs.dropdown', function () {
        $(this).find(dropDownMenu).removeClass('slide_in idle');
        $(this).find(dropDownMenu).addClass('slide_out');
        //dropDownMenu.removeClass('slide_in idle');
        //dropDownMenu.addClass('slide_out');
    });
    bootstrapSelect.on('hidden.bs.dropdown', function () {
        var _this = $(this);
        $(_this).addClass('open');
        setTimeout(function () {
            $(_this).removeClass('open');
        }, 300);
    });
}

// Get average color from image and set as background color ------------------------------------------------------------

function averageColor(element) {
    $(element).each(function () {
        var _this = $(this);
        var image = _this.find('.image').children('img');
        var averageColor;
        var saturatedColor;
        imagesLoaded(image, function (e) {
            averageColor = image.averageColorAsString();
            saturatedColor = $.Color(averageColor).hsla(null, .04, 0.6, null);
            $(_this).find('.average-color').css('background-color', saturatedColor);
        });
    });
}

// Animate the element -------------------------------------------------------------------------------------------------

function animateElement(parentElement) {
    $(parentElement).addClass('idle');
    setTimeout(function () {
        $(parentElement).find('.animate').each(function (i) {
            if ($(parentElement).hasClass('idle')) {
                $(this).addClass('idle');
                $(this).css('transition-delay', (i * transitionDelay) + 's');
                $(this).css('-webkit-transition-delay', (i * transitionDelay) + 's');
            }
        });
    }, transitionDelay);
}

// Remove animation class when element is being hidden -----------------------------------------------------------------

function removeAnimation(parentElement) {
    $(parentElement).find('.animate').each(function () {
        $(this).removeClass('idle');
    });
}

// Calculate how many item are in one row ------------------------------------------------------------------------------

function calculateItemsInRow() {
    itemsInRow = 0;
    $('.grid .item').each(function (i) {
        if ($(this).css('top') == '0px') {
            itemsInRow++;
            itemsInRowArray.push(i);
        }
    });
}

// Rating --------------------------------------------------------------------------------------------------------------

function rating(element) {
    var ratingElement =
        '<span class="stars">' +
        '<i class="fa fa-star s1" data-score="1"></i>' +
        '<i class="fa fa-star s2" data-score="2"></i>' +
        '<i class="fa fa-star s3" data-score="3"></i>' +
        '<i class="fa fa-star s4" data-score="4"></i>' +
        '<i class="fa fa-star s5" data-score="5"></i>' +
        '</span>'
        ;
    if (!element) { element = ''; }
    $.each($(element + ' .rating'), function (i) {
        $(this).append(ratingElement);
        if ($(this).hasClass('active')) {
            $(this).append('<input readonly hidden="" name="score_' + $(this).attr('data-name') + '" id="score_' + $(this).attr('data-name') + '">');
        }
        var rating = $(this).attr('data-rating');
        for (var e = 0; e < rating; e++) {
            var rate = e + 1;
            $(this).children('.stars').children('.s' + rate).addClass('active');
        }
    });

    var ratingActive = $('.rating.active i');
    ratingActive.hover(function () {
        for (var i = 0; i < $(this).attr('data-score'); i++) {
            var a = i + 1;
            $(this).parent().children('.s' + a).addClass('hover');
        }
    },
        function () {
            for (var i = 0; i < $(this).attr('data-score'); i++) {
                var a = i + 1;
                $(this).parent().children('.s' + a).removeClass('hover');
            }
        });
    ratingActive.on('click', function () {
        $(this).parent().parent().children('input').val($(this).attr('data-score'));
        $(this).parent().children('.fa').removeClass('active');
        for (var i = 0; i < $(this).attr('data-score'); i++) {
            var a = i + 1;
            $(this).parent().children('.s' + a).addClass('active');
        }
    });
}

// Simple Map ----------------------------------------------------------------------------------------------------------

var mapStyles = [{ "featureType": "administrative.locality", "elementType": "all", "stylers": [{ "hue": "#2c2e33" }, { "saturation": 7 }, { "lightness": 19 }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": 31 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": 31 }, { "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "labels", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": -2 }, { "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "hue": "#e9ebed" }, { "saturation": -90 }, { "lightness": -8 }, { "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "hue": "#e9ebed" }, { "saturation": 10 }, { "lightness": 69 }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "hue": "#e9ebed" }, { "saturation": -78 }, { "lightness": 67 }, { "visibility": "simplified" }] }];

function simpleMap(_latitude, _longitude, draggableMarker, scrollwheel, externalCall) {

    if (externalCall == true) {
        if ($('.content-container').attr('id') == 'item-detail') {
            var path = '../../';
        }
        else {
            path = '../';
        }
        var markerIcon = path + "img/marker.png";
        loadScript(path + "js/richmarker-compiled.js", renderMap);
    }
    else {
        markerIcon = "assets/img/marker.png";
        setTimeout(function () {
            renderMap();
        }, 1000);

    }

    function renderMap() {
        var mapCenter = new google.maps.LatLng(_latitude, _longitude);
        var mapOptions = {
            zoom: 8,
            center: mapCenter,
            disableDefaultUI: true,
            scrollwheel: scrollwheel,
            styles: mapStyles,
            panControl: false,
            zoomControl: false,
            draggable: true
        };
        var mapElement = document.getElementById('map-simple');
        var map = new google.maps.Map(mapElement, mapOptions);

        google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
            $('#map-simple').addClass('idle');
            google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
                $('#map-simple').addClass('idle');
            });
        });

        // Google map marker content
  // Geolocation of user -----------------------------------------------------------------------------------------
    var geocoder = new google.maps.Geocoder();
    var marker;
    $('#verificaMapa').on("click", function () {
        event.preventDefault();
    geocodeAddress(geocoder, map);

    });

    function geocodeAddress(geocoder, resultsMap) {
      var address = document.getElementById('calle').value + " "  + document.getElementById('num').value + " "  + document.getElementById('colonia').value + " "  + document.getElementById('municipio').value + " "  + document.getElementById('estado').value;


        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                map.setCenter(results[0].geometry.location);
                map.setZoom(16);

                var lata = $('#latituteUp');
                lata.val(results[0].geometry.location.lat());    

                var longo = $('#longitudeUp');
                longo.val(results[0].geometry.location.lng());    

                


                if (marker) {
                    //if marker already was created change positon
                    marker.setPosition(results[0].geometry.location);
                } else {
                    //create a marker
                    marker = new google.maps.Marker({          
                        position: results[0].geometry.location,
                        map: resultsMap,
                        draggable: true
                    });
                };



             
            } else {
                alert('Parece que la dirección es incorrecta: ' + status);
            }
        });


    };

    //FIN ----------


    }



  
}

// Homepage Google Map -------------------------------------------------------------------------------------------------

function createHomepageGoogleMap(_latitude, _longitude, cuantos, json) {

    $.get("assets/js/custom.infobox.js", function () {
        gMap();
    });
    function gMap() {
        if ($('body').hasClass('fullscreen-map')) {
            $('.map-wrapper #map').height($(window).height() - $('header:first').height() - 1 - $('.page-content .search').height());
        }
        var mapCenter = new google.maps.LatLng(_latitude, _longitude);
        var mapOptions = {
            zoom: 15,
            center: mapCenter,
            disableDefaultUI: false,
            scrollwheel: false,
            styles: mapStyles,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.BOTTOM_CENTER
            },
            panControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.RIGHT_TOP
            }
        };




        var mapElement = document.getElementById('map');
        var map = new google.maps.Map(mapElement, mapOptions);
        var newMarkers = [];
        var markerClicked = 0;
        var activeMarker = false;
        var lastClicked = false;


        for (var i = 0; i < json.length; i++) {

            // Google map marker content

            if (json[i].color) var color = json[i].color;
            else color = '';
            color = '';
            var markerContent = document.createElement('DIV');
            markerContent.innerHTML =
                '<div class="map-marker">' +
                '<div class="icon">' +
                '<img src="assets/img/marker.png">' +
                '</div>' +
                '</div>';

            // Create marker on the map

            var marker = new RichMarker({
                position: new google.maps.LatLng(json[i].lat, json[i].lon),
                map: map,
                draggable: false,
                content: markerContent,
                flat: true,
                id: json[i].id,
                usuario: json[i].usuario
            });

            newMarkers.push(marker);

            // Create infobox for marker

            var infoboxContent = document.createElement("div");
            var infoboxOptions = {
                content: infoboxContent,
                disableAutoPan: false,
                pixelOffset: new google.maps.Size(-260, -20),
                zIndex: null,
                alignBottom: true,
                boxClass: "infobox",
                enableEventPropagation: true,
                closeBoxMargin: "10px 10px -30px 0px",
                closeBoxURL: "assets/img/close-infobox.png",
                infoBoxClearance: new google.maps.Size(1, 1)
            };

            // Infobox HTML element

            infoboxContent.innerHTML = drawInfobox(infoboxContent, json, i);

            // Create new markers

            newMarkers[i].infobox = new InfoBox(infoboxOptions);

            // Show infobox after click

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    var cualid = this.id;
                    var cualUsuario = this.usuario;

                    $.post("/api/pasaID", {
                        cual: cualid,
                        eluser: cualUsuario


                    })


                    google.maps.event.addListener(map, 'click', function (event) {

                        lastClicked = newMarkers[i];

                    });
                    activeMarker = newMarkers[i];
                    if (activeMarker != lastClicked) {
                        for (var h = 0; h < newMarkers.length; h++) {
                            newMarkers[h].content.className = 'marker-loaded';
                            removeAnimation('.infobox');
                            newMarkers[h].infobox.close();
                        }
                        newMarkers[i].infobox.open(map, this);
                        newMarkers[i].infobox.setOptions({ boxClass: 'fade-in-marker' });
                        newMarkers[i].content.className = 'marker-active marker-loaded';
                        markerClicked = 1;
                        google.maps.event.addListener(newMarkers[i].infobox, 'domready', function () {
                            averageColor('.infobox');
                            animateElement('.infobox');

                            var $grid = $('.grid');
                            var $content = $('.content');
                            var $contentLoader = $('.content-loader');

                            $('.infobox a').on('click', function (e) {
                                e.preventDefault();
                                clickEvents(this);
                            });
                        });
                    }
                }
            })(marker, i));


            // Fade infobox after close is clicked

            google.maps.event.addListener(newMarkers[i].infobox, 'closeclick', (function (marker, i) {
                return function () {
                    activeMarker = 0;
                    newMarkers[i].content.className = 'marker-loaded';
                    newMarkers[i].infobox.setOptions({ boxClass: 'fade-out-marker' });
                    removeAnimation('.infobox');
                }
            })(marker, i));
        }

        // Close infobox after click on map

        google.maps.event.addListener(map, 'click', function (event) {
            if (activeMarker != false && lastClicked != false) {
                if (markerClicked == 1) {

                    activeMarker.infobox.open(map);
                    activeMarker.infobox.setOptions({ boxClass: 'fade-in-marker' });
                    activeMarker.content.className = 'marker-active marker-loaded';
                }
                else {
                    markerClicked = 0;
                    activeMarker.infobox.setOptions({ boxClass: 'fade-out-marker' });
                    activeMarker.content.className = 'marker-loaded';
                    removeAnimation('.infobox');
                    setTimeout(function () {
                        activeMarker.infobox.close();
                    }, 350);
                }
                markerClicked = 0;
            }
            if (activeMarker != false) {
                google.maps.event.addListener(activeMarker, 'click', function (event) {
                    markerClicked = 1;

                    removeAnimation('.infobox');
                });
            }
            markerClicked = 0;
        });

        // Create marker clusterer

        var clusterStyles = [
            {
                url: 'assets/img/cluster.png',
                height: 42,
                width: 42
            }
        ];

        var markerCluster = new MarkerClusterer(map, newMarkers, { styles: clusterStyles, maxZoom: 19 });
        markerCluster.onClick = function (clickedClusterIcon, sameLatitude, sameLongitude) {
            return multiChoice(sameLatitude, sameLongitude, json);

        };

        // Dynamic loading markers and data from JSON

        google.maps.event.addListener(map, 'idle', function () {
            var visibleArray = [];
            for (var i = 0; i < json.length; i++) {
                if (map.getBounds().contains(newMarkers[i].getPosition())) {
                    visibleArray.push(newMarkers[i]);
                    $.each(visibleArray, function (i) {
                        setTimeout(function () {
                            if (map.getBounds().contains(visibleArray[i].getPosition())) {
                                if (!visibleArray[i].content.className) {
                                    visibleArray[i].setMap(map);
                                    visibleArray[i].content.className += 'bounce-animation marker-loaded';
                                    markerCluster.repaint();
                                }
                            }
                        }, i * 50);
                    });
                } else {
                    newMarkers[i].content.className = '';
                    newMarkers[i].setMap(null);
                }
            }

            var visibleItemsArray = [];
        });

        function is_cached(src, a) {
            var image = new Image();
            var loadedImage = $('.results li #' + json[a].id + ' .image');

            image.src = src;
            if (image.complete) {
                $(".results").each(function () {
                    loadedImage.removeClass('loading');
                    loadedImage.addClass('loaded');
                });
            }
            else {
                $(".results").each(function () {
                    $('.results li #' + json[a].id + ' .image').addClass('loading');
                });
                $(image).load(function () {
                    loadedImage.removeClass('loading');
                    loadedImage.addClass('loaded');
                });
            }
        }

        // filtros de búsqueda -----------------------------------------------------------------------------------------

        $('#aplicarCambios').on("click", function () {

            for (var i = 0; i < newMarkers.length; i++) {

                newMarkers[i].setMap(null);

            }
            newMarkers.length = 0;













        });


        // Geolocation of user -----------------------------------------------------------------------------------------
        var geocoder = new google.maps.Geocoder();


        geocodeAddress(geocoder, map);


        function geocodeAddress(geocoder, resultsMap) {
            var address = document.getElementById('location').value;
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status === 'OK') {
                    resultsMap.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: resultsMap,
                        position: results[0].geometry.location
                    });
                } else {
                    //alert('Geocode was not successful for the following reason: ' + status);
                }
            });


        };


        // Autocomplete address ----------------------------------------------------------------------------------------

        var input = document.getElementById('location');
        var autocomplete = new google.maps.places.Autocomplete(input, {
            types: ["geocode"]
        });
        autocomplete.bindTo('bounds', map);



    }
}

function redrawMap(map) {
    google.maps.event.trigger(map, 'resize');
}

// Load Script ---------------------------------------------------------------------------------------------------------

function loadScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}

// jQueryLoaded --------------------------------------------------------------------------------------------------------

function jQueryLoaded() {
    $('.content-container').addClass('container');

    if ($('.content-container').attr('id') == 'item-detail') {
        var path = '../../';
    }
    else {
        path = '../';
    }

    var $animate = $('.animate');
    for (var i = 0; i < $animate.length; i++) {
        $animate.addClass('idle');
    }

    if ($('img').length) {
        $('img').each(function (i) {
            var tempSrc = $(this).attr('src');
            var srcAppended = path + '../' + tempSrc;
            $(this).attr('src', srcAppended);
            if (i == $('img').length - 1) {
                imagesLoaded();
            }
        });
    }
    else {
        imagesLoaded();
    }

    $(window).load(function () {
        $('body').css('opacity', 1);
    });

    function imagesLoaded() {
        loadScript(path + "js/imagesloaded.pkgd.min.js", jqueryColor);
        loadScript(path + "bootstrap/js/bootstrap.min.js", false);
    }

    function jqueryColor() {
        if ($('.average-color').length) {
            loadScript(path + "js/jquery.color-2.1.2.min.js", jqueryAverageColor);
        }
        else {
            loadFunctions();
        }
    }

    function jqueryAverageColor() {
        loadScript(path + "js/jquery.average-color.js", loadFunctions);
    }

    function loadFunctions() {
        loadScript(path + "js/functions.js", runScripts);
    }

    function runScripts() {
        rating();
        if ($('.average-color').length) {
            averageColor($('.content-container'));
        }
        if ($('#map-simple').length) {
            loadMap();
        }
    }

    function loadMap() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?sensor=true&libraries=places&callback=initialize';
        document.body.appendChild(script);
    }
}

function initialize() {
    simpleMap(_latitude, _longitude, draggableMarker, scrollwheel, true);



}