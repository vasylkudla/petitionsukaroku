'use strict';

/*mobile*/
var useragents=['android','astel','audiovox','blackberry','chtml','docomo','ericsson','hand','iphone ','ipod','2me','ava','j-phone','kddi','lg','midp','mini','minimo','mobi','mobile','mobileexplorer','mot-e','motorola','mot-v','netfront','nokia', 'palm','palmos','palmsource','pda','pdxgw','phone','plucker','portable','portalmmm','sagem','samsung','sanyo','sgh','sharp','sie-m','sie-s','smartphone','softbank','sprint','symbian','telit','tsm','vodafone','wap','windowsce','wml','xiino'];

var agt=navigator.userAgent.toLowerCase();
var is_mobile=false;
  for(var i=0;i<useragents.length;i++){
    if(agt.indexOf(useragents[i])!=-1){
      is_mobile=true;
      var user_agent=agt; break;
    }
  }
/*!mobile*/

var petItem = {

    init : function()
    {
        if ( !$('.pet_item').length ) {
            return false;    
        }

        this.setHeight();
        this.events();
    },

    mobileHover : function()
    {
        $('.pet_item').removeClass('css_hover');
        $('.pet_item').click(function(event) {
            var _this = $(this);

            if ( _this.hasClass('js_hover') ) {
                _this.removeClass('js_hover');
            } else {
                event.preventDefault();
                _this.addClass('js_hover');
            }

        });    
    },

    setHeight : function() {
        $('.pet_item').each(function(index,el) {
            $(el).css('height', $(el).find('.pet_content').outerHeight() );
        });
    },

    events : function()
    {
        if ( is_mobile ) {
            petItem.mobileHover();
        } 
    }
}  


$(function() {

    petItem.init();    

    if ( $('.js_select').length ) {
        $('.js_select').selectBox({
            mobile: true
        });
    }

    $('#js_nav').click(function() {
        $('body').addClass('menu_open');
    });

    $('#js_nav_close').click(function() {
        $('body').removeClass('menu_open');    
    });

    $('#js_list').click(function() {
        $('body').toggleClass('list_open');
    });

    if ( $('#pet-tab').length ) {
        Tabs.init('pet-tab');
    }

    $('#js-votes').click(function() {
        $(this).prop('disabled',true);
        $('.petition_votes_wijet').addClass('active');
    });

    $('#js-help-close').click(function() {
        $('#js-votes').prop('disabled',false);
        $('.petition_votes_wijet').removeClass('active');
    });

    $('#js-go-answer').click(function() {
        $('#pet-tab .tabs_child').eq(0).find('.tabs_link').click();

        if ( $(window).width() < 767 ) {
            $("body,html").animate({"scrollTop": $('#pet-tab').offset().top}, 500);
        }
    });

    $('.show_password').click(function() {
        var input = $(this).closest('.password_section').find('.txt_input');

        if ( input.hasClass('active') ) {
            return false;
        } 
        
        input.attr('type', 'text').addClass('active');

        setTimeout(function() {
            input.attr('type', 'password').removeClass('active');
        }, 5000);
    });

});