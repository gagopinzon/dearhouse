function drawInfobox(infoboxContent, json, i){

    if( json[i].precio )        { var price = '<div class="price average-color"><span>' + json[i].precio + '</span></div>' }
        else                        { price = '' }
    if(json[i].id)             { var id = json[i].id }
        else                        { id = '' }
    //if(json.url)            { var url = json[i].url }
    if(json.tipo)            { var url = json[i].tipo }
        else                        { url = '' }
    if(json[i].tipo)           { var type = json[i].type }
        else                        { type = '' }
    if(json[i].calle)          { var title = json[i].calle }
        else                        { title = '' }
    if(json[i].estado)       { var location = json[i].estado }
        else                        { location = '' }
   // if(json[i].gallery)     { var gallery = json[i].gallery }
    //    else                        { gallery[0] = '../img/default-item.jpg' }
  if(json[i].estado)     { var gallery =json[i].estado }
     else                        { gallery[0] = '../img/default-item.jpg' }
    var ibContent = '';
    ibContent =
    '<div class="infobox">' +
        '<div class="left">' +
            '<a href="'+ url +'" data-expand-width="col-9" data-transition-parent=".content-loader" data-external="true">' +
                '<div class="image">' +
                    price +
                    '<img src="'+ gallery +'" alt="">' +
                '</div>' +
                '<header class="average-color">' +
                    '<h1 class="animate move_from_top_short">'+ title +'</h1>' +
                    '<h2 class="animate move_from_top_short"><span>'+ location +'</span></h2>' +
                '</header>' +
            '</a>' +
        '</div>' +
        '<div class="right">' +
            '<article class="animate move_from_top_short">' +
                '<h3>Description</h3>' +
                '<p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa, viverra interdum eros ut, imperdiet </p>' +
            '</article>' +
            '<article class="animate move_from_top_short">' +
                '<h3>Overview</h3>' +
                '<dl>' +
                    '<dt>Bathrooms</dt>' +
                    '<dd>1</dd>' +
                    '<dt>Bedrooms</dt>' +
                    '<dd>2</dd>' +
                    '<dt>Area</dt>' +
                    '<dd>165m<sup>2</sup></dd>' +
                    '<dt>Garages</dt>' +
                    '<dd>1</dd>' +
                '</dl>' +
            '</article>' +
        '</div>' +
    '</div>';

    return ibContent;
}