////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var $ = jQuery.noConflict();
var transitionDelay = .07;
var itemsInRow = 0;
var itemsInRowArray = [];
var activeCol;
var parentElement;
var documentHeight;
var lastScrollTop = 0;
var topOffset;
var lastTopOffset;
var headerMargin;
var promotionAreaPadding;

$(document).ready(function($) {
    "use strict";

    var $grid = $('.grid');
    var $masonry = $('.masonry');
    var $content = $('.content');
    var $contentLoader = $('.content-loader');

    $('.search-overlay').height( $(window).height() );






//  Bootstrap Select ---------------------------------------------------------------------------------------------------

    bootstrapSelect();

//  Get Header and Promotion Area margin -------------------------------------------------------------------------------

    if( $('#header').length ){
        var headerElement = window.getComputedStyle( document.querySelector('#header'), null);
        headerMargin = parseInt((headerElement.marginBottom).replace(/[A-Za-z$-]/g, ""));
    }
    else {
        headerMargin = 0;
    }

    if( $('.promotion-area').length ){
        var promotionAreaElement = window.getComputedStyle( document.querySelector('.promotion-area'), null);
        promotionAreaPadding = parseInt((promotionAreaElement.paddingBottom).replace(/[A-Za-z$-]/g, ""));
    }
    else {
        promotionAreaPadding = 0;
    }






//  Click Events -------------------------------------------------------------------------------------------------------



    $('.close').on('click',function() {
        if( $(this).attr('data-close-parent') ){
            var element = $(this).attr('data-close-parent');
            $('a[href="' +element+ '"]').trigger('click');
            removeAnimation(element);
        }
        else {
            removeAnimation($content);
            $('.submit-button').removeClass('submit-page-open');
            $grid.removeClass('idle offset-' + activeCol );
            $content.removeClass('idle');
            $('#page-wrapper').css('height','');

            if( !$('.grid').hasClass('idle') ) {
                setTimeout(function(){
                    $contentLoader.removeClass( 'idle' );
                    $contentLoader.removeClass( activeCol );
                    $('.content #loader').remove();
                    activeCol = '';
                }, 800);
            }

            var b = 0;
            $.each( itemsInRowArray, function (i) {
                setTimeout(function(){
                    b++;
                    var referenceItemOffset = $('.item:nth-child(' + b + 'n)').css('left');
                    $('.item').each(function() {
                        if( $(this).css('left') == referenceItemOffset ){
                            $(this).removeClass('stretch');
                        }
                    });
                }, i * 100);
            });
        }
        removeOffsetLeft();
    });

    $('a, button, .btn-group, .btn, .item a').on('click',function() {
        clickEvents(this);
    });



//  Disable page reloading if href is #

    $('a[href="#"], a[data-external]').on('click',function(e) {
        e.preventDefault();
    });

//  Average color of image


  
//  No UI Slider -------------------------------------------------------------------------------------------------------


// Autocomplete address ------------------------------------------------------------------------------------------------




    
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Load
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).load(function(){
    documentHeight = $(document).height();
});
