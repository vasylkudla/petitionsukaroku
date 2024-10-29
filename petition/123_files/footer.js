'use strict';

var Footer = {

    foot: 'footer',
    empty_foot : '.footer_empty',

    init: function(){
        this.set_height()
    },
    set_height: function() {
        var height = $('footer .container:first-child').innerHeight() + $('.footer_bottom').innerHeight();

        $(Footer.foot).css({
            'height' : height + 'px',
            'marginTop' : '-' + height + 'px'
        })
        $(Footer.empty_foot).css({
            'height' : height + 'px'
        })
    }
}

$(function() {
    Footer.init();
});