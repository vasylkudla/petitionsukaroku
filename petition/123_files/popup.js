'use strict';  

var Popup = {

        init : function()
        {
            this.getScrollbarWidth();
            this.events();
        },

        show : function( id, content )
        {
            jQuery('body').addClass('popup-open').css('padding-right', scrollWidth + 'px');
            jQuery('<div class="popup-bg"></div>').appendTo( jQuery('body') );
            jQuery(id).addClass('active').css('padding-right', scrollWidth + 'px');
            this.centerMode(id);
            
            if (jQuery(id).find('#text-message') && content) {
                jQuery(id).find('#text-message').html(content);
            }
 
            jQuery(id).trigger("show.popup");
            
            setTimeout(function() {
                jQuery(id).trigger("shown.popup");
            }, 500);

        },

        hide : function( id )
        {
            jQuery('body').removeClass('popup-open').css('padding-right', 0);
            jQuery('.popup-bg').remove();
            jQuery(id).removeClass('active');

            jQuery(id).trigger("hide.popup");

            setTimeout(function() {
                jQuery(id).trigger("hidden.popup");
            }, 500);
        },

        centerMode : function( id )
        {
            var popup = jQuery(id).find('.popup');

            if ($.fn.imagesLoaded) {
                imagesLoaded(popup, function(instance)
                {
                    var popup_h = popup.height(),
                        margin = jQuery(window).height() - popup_h;

                    ( margin > 0 ) ? popup.css('margin-top', (margin / 2) + 'px') : false;
                });    
            }
        },

        getScrollbarWidth : function()
        {
            var div = document.createElement('div');
            
            div.style.overflowY = 'scroll';
            div.style.width = '50px';
            div.style.height = '50px';
            
            div.style.visibility = 'hidden';
            
            document.body.appendChild(div);
            window.scrollWidth = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);
        },

        events : function()
        {
            jQuery('.popup-container').on('click', function()
            {
                Popup.hide('.popup-container');    
            });

            jQuery('.popup').on('click', function( event )
            {
                event.stopPropagation();
            });

            jQuery('[data-popup]').on('click', function()
            {
                var id = jQuery(this).data('target');

                Popup.show(id);
                return false;
            });

            jQuery('[data-popup-close]').on('click', function()
            {
                var id = jQuery(this).closest('.popup-container').attr('id');

                if ( id ) {
                    Popup.hide('#'+id);
                    return false;
                }
            });
        }

    }

    jQuery(function()
    {
        Popup.init();
    });