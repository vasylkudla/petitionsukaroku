'use strict';  

    var Tabs = {

        init : function( id )
        {
            var tabs = jQuery('#'+id);

            ( tabs.length ) ? this.events( id, tabs ) : false;
        },

        events : function( id, tabs )
        {
            var links = tabs.find('li a'),
                tabContainer = jQuery('.tab_container[ data-parent-id = "'+id+'" ]');

            links.on( 'click', function() {
                var _this = jQuery(this),
                    id = _this.attr('data-id');

                if ( _this.attr('disabled') ) {
                    return false;
                }

                tabs.find('li').removeClass('active');
                _this.closest('li').addClass('active');

                tabContainer.removeClass('active');
                jQuery('#'+id).addClass('active');
            });
        }
    }