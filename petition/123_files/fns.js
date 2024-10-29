function checkListScroll () {
	var $head = $('.list_header');
	var $head_scroll = $('.list_header_block');
	if($head.length<1) {
		return false;
	}
	var o = $head.offset();
	var st = $(window).scrollTop();

	if(st> o.top) {
		$head_scroll.addClass('fixed');
	}
	else {
		$head_scroll.removeClass('fixed');
	}
}
function TimerTimeout(elem,time,start_time) {
	var diff = parseInt((time-start_time)/1000);
	var hour = parseInt(diff/60/60);
	diff -= hour*60*60;
	var minute = parseInt(diff/60);
	diff -= minute*60;
	var second = diff;

	if (diff < 0) {
		$('.petition_timer').html('Збір підписів завершено');
	} else {
		if(hour<10) {
			hour = '0'+hour;
		}
		if(minute<10) {
			minute = '0'+minute;
		}
		if(second<10) {
			second = '0'+second;
		}
		var str = hour+':'+minute+':'+second;
		elem.html(str);
		setTimeout(function () {
			TimerTimeout(elem,time,start_time+1000);
		}, 1000);
	}
}
function Timer() {
	var dt = new Date();
	var start_time = dt.getTime();
	var $timer = $('.petition_timer_');
	var time = $timer.data('end')*1000;
	TimerTimeout($timer,time,start_time);
}
function Votes() {
	var $canvas = $('#votes_graph');
	if($canvas.length>0) {
		var $votes = $('#petition_votes_graph');
		var num = $votes.data('votes')*1;
		var max = 25000;

		var percent_num = num/max;
		var percent = percent_num*100;

		var start_pos = 1.5;
		var end_pos = start_pos + percent_num*2;
		var max_pos = 1.4999999;
		if(percent>=100) {
			end_pos = max_pos;
		}

		var context = $canvas[0].getContext('2d');
		var x = 85;
		var y = 85;
		var radius = 80;
		var startAngle = start_pos * Math.PI;
		var endAngle = end_pos * Math.PI;
		var counterClockwise = false;

		context.beginPath();
		context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
		context.lineWidth = 10;

		context.strokeStyle = '#00509d';
		context.stroke();
	}
}



function CheckRequired() {
	var $btn = $('.btn_input').not('.small, .login_btn');

	if($btn.length>0) {
		var disabled = false;

		$('.required').not('.input_checkbox').each(function () {

			var val = $.trim($(this).val());
			if( $(this).hasClass('mask') ) {
				val = val.replace(/[^\d]/g, '').toString();
				if(val.length<12) {
					disabled = true;
				}
			}

            if (val == '' ) {
				disabled = true;
			}

			var start = $(this).attr('data-start')*1;
			if( start>0 ) {
				var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if( val == '' || ($(this).attr('id')=='email' && !re.test(val) ) ) {
					$(this).addClass('error');
					$(this).siblings('.error_txt').first().removeClass('hidden');
				}
				else {
					$(this).removeClass('error');
					$(this).siblings('.error_txt').first().addClass('hidden');
				}
			}

		});

		$('.input_checkbox.required').each(function () {
			if(!$(this)[0].checked) {
				disabled = true;
				return false;
			}
		});

		if( $('#password').length>0 && $('#password_repeat').length>0 ) {
			var pass_val = $.trim( $('#password').val() );

            if (pass_val.length < 6) {
                disabled = true;
                $("#min_6").removeClass('hidden');
            } else {
                $("#min_6").addClass('hidden');
            }

			var pass_repeat_val = $.trim( $('#password_repeat').val() );
			if( pass_val !== pass_repeat_val && pass_val !== '' && pass_repeat_val !== '' ) {
				disabled = true;
				$('#password_repeat_error').removeClass('hidden');
			}
			else {
				$('#password_repeat_error').addClass('hidden');
			}
		}



        if( $('#g-recaptcha-response').length>0 ) {
			if($.trim($('#g-recaptcha-response').val()) == '') {
				disabled = true;
			}
		}


        if(disabled) {
			$btn.addClass('disabled');
		}
		else {
			$btn.removeClass('disabled');
		}


		setTimeout(CheckRequired,200);
	}
}

function ShowLoader () {
	$('.loader').removeClass('hidden');
}
function HideLoader () {
	$('.loader').addClass('hidden');
}
function getInternetExplorerVersion() {
	var rv = -1;
	if (navigator.appName == 'Microsoft Internet Explorer')
	{
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat( RegExp.$1 );
	}
	else if (navigator.appName == 'Netscape')
	{
		var ua = navigator.userAgent;
		var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat( RegExp.$1 );
	}
	return rv;
}

var list = null;


function LikesTotal(page) {
	var fb_btn = $('#fb_sharer');
	var tw_btn = $('#tw_sharer');
	var vk_btn = $('#vk_sharer');
	var gp_btn = $('#gp_sharer');
	var pageuri = (page);

	$.getJSON('https://api.facebook.com/restserver.php?method=links.getStats&callback=?&urls=' + pageuri + '&format=json', function(data) {
		var num = parseInt(data[0].total_count);
		fb_btn.find('span').text(num);
	});
	/*$.getJSON('https://urls.api.twitter.com/1/urls/count.json?url=' + pageuri + '&callback=?', function(data) {
		var num = parseInt(data.count);
		tw_btn.find('span').text(num);
	});*/

	VK = {};
	VK.Share = {};
	VK.Share.count = function(index, count){
		var num = parseInt(count);
		vk_btn.find('span').text(num);
	};

//	$.getJSON('https://plusone.google.com/_/+1/fastbutton?url=' + encodeURIComponent(pageuri) + '&format=json&&callback=?', function (data) {
//	    console.log(data);
//	});
}

var page = 'https://petition.president.gov.ua'+(window.location.pathname);
var url = encodeURIComponent(page);
var objSharer = {};

var popup_timer = null;
$(document).ready(function () {
    
	var fb_title = encodeURIComponent($('meta[property="og:title"]').attr('content'));
	var fb_description = encodeURIComponent($('meta[property="og:description"]').attr('content'));
	var fb_img = encodeURIComponent($('meta[property="og:image"]').attr('content'));

	var tw_text = encodeURIComponent($('meta[name="twitter:description"]').attr('content'));

	var vk_title = encodeURIComponent($('meta[name="title"]').attr('content'));
	var vk_description = encodeURIComponent($('meta[name="description"]').attr('content'));
	var vk_image = encodeURIComponent($('link[rel="image_src"]').attr('href'));

	objSharer['fb'] = 'http://www.facebook.com/sharer.php?s=100&p[title]='+fb_title+ '&p[summary]='+fb_description+'&p[url]='+url+'&p[images][0]='+fb_img;
	objSharer['fb_click'] = false;
	objSharer['tw'] = 'https://twitter.com/intent/tweet?url='+url+'&text='+tw_text;
	objSharer['tw_click'] = false;
	objSharer['vk'] = 'http://vk.com/share.php?url='+url+'&title='+vk_title+'&description='+vk_description+'&image='+vk_image+'&noparse=true';
	objSharer['vk_click'] = false;
    
//    objSharer['gp'] = 'https://plus.google.com/share?url='+url+'&title='+fb_title+'&description='+fb_description+'&image='+fb_img;
//    objSharer['gp_click'] = false;
	LikesTotal(page);
	$('#fb_sharer').click(function(){
		if(!objSharer['fb_click']){
			var social_box = $(this).find('span');
			var count = parseInt(social_box.text());
			if( isNaN(count) ){
				count = 0;
			}
			count = count + 1;
			social_box.text(count);
			objSharer['fb_click']
		}
		window.open(objSharer['fb'],'displayWindow','width=700,height=400,left=200,top=100,location=no, directories=no,status=no,toolbar=no,menubar=no');
		return false;
	});
	$('#tw_sharer').click(function(){
		if(!objSharer['tw_click']){
			var social_box = $(this).find('span');
			var count = parseInt(social_box.text());
			if( isNaN(count) ){
				count = 0;
			}
			count = count + 1;
			social_box.text(count);
			objSharer['tw_click'] = true;
		}
		window.open(objSharer['tw'],'displayWindow','width=550,height=420,left=200,top=100,location=no, directories=no,status=no,toolbar=no,menubar=no');
		return false;
	});
	$('#vk_sharer').click(function(){
		if(!objSharer['vk_click']){
			var social_box = $(this).find('span');
			var count = parseInt(social_box.text());
			if( isNaN(count) ){
				count = 0;
			}
			count = count + 1;
			social_box.text(count);
			objSharer['vk_click'] = true;
		}
		window.open(objSharer['vk'],'displayWindow','width=550,height=420,left=200,top=100,location=no, directories=no,status=no,toolbar=no,menubar=no');
		return false;
	});

//    $('#gp_sharer').click(function(){
//        if(!objSharer['gp_click']){
//            var social_box = $(this).find('span');
//            var count = parseInt(social_box.text());
//            if( isNaN(count) ){
//                count = 0;
//            }
//            count = count + 1;
//            social_box.text(count);
//            objSharer['gp_click'] = true;
//        }
//        window.open(objSharer['gp'],'','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
//        return false;
//    });


	var ie = getInternetExplorerVersion();
	if ( ie>=0 ){
		$('body').addClass('ie');
	}
	if( $('.list').length>0 ) {
		list = $('.list');
	}
	Votes();
	Timer();
	CheckRequired();
	$("#phone").mask("+38 (999) 999-99-99");
	$('.popup_close').click(function () {
		$('.fade').addClass('hidden');
		$('.popup').addClass('hidden');
		clearTimeout(popup_timer);
		popup_timer = null;
	});


	$('form').submit(function () {
		if ($(this).find('.btn_input').hasClass('disabled'))
			return false;
	});

	$('.vote_btn').click(function () {
		if( $(this).hasClass('disabled') ) {
			return false;
		}
		var params = {};

		var name = $.trim($('#name').val());
		var email = $.trim($('#email').val());
		var phone = $.trim($('#phone').val());
		var city = $.trim($('#city').val());
		var id = $.trim($('#id').val());
		var save = $.trim($('#save').val());
		var captcha = $.trim($('#g-recaptcha-response').val());
		var finger = $.trim($('#finger').val());
		var browser = $.trim($('#browser').val());

		params['name'] = name;
		params['email'] = email;
		params['phone'] = phone;
		params['city'] = city;
		params['id'] = id;
		params['save'] = save;
		params['captcha'] = captcha;
		params['finger'] = finger;
		params['browser'] = browser;

		$('.loader').removeClass('hidden');

		$.post( "/petition/vote", params, function( data ) {
			var resp = parseInt(data);
			var $content = $('.popup_content');
			if(resp===1) {
				var html = '<h2>Ваш підпис додано!</h2><p>Дякуємо за небайдужість!</p>';

				var num = $('.petition_votes_txt span').html()*1;
				$('.petition_votes_txt span').html(num+1);
				$('.petition_btn').addClass('disabled');
			}
			else if(resp === 2) {
				var html = '<h2>Голосування неможливе!</h2><p>Ви вже голосували за цю петицію раніше!</p>';
				$('.petition_btn').addClass('disabled');
			} else {
				var html = '<h2>Виникла помилка!</h2><p>Перевірте, чи виконано вхід на сайт або спробуйте ще раз пізніше!</p>';
			}
			$content.html(html);
			$('.loader').addClass('hidden');
		});

		return false;
	});

	$('#petition_vote_btn').click(function () {
		if ( $(this).hasClass('disabled') ) {
			return false;
		}
        $(this).prop('disabled',true);
        $(this).addClass('disabled');
        $('.petition_votes_wijet').addClass('active');
        
		var $fade = $('.fade');
		var $popup = $('.popup');

		$fade.removeClass('hidden');
		$('.loader').removeClass('hidden');
		var params = {};
		var id = $.trim($('#id').val());
		var finger = $.trim($('#finger').val());
		var browser = $.trim($('#browser').val());
		params['id'] = id;
		params['finger'] = finger;
		params['browser'] = browser;

		$.post( "/petition/vote", params, function( data ) {
			var resp = parseInt(data);
			var $content = $('.popup_content');
			if(resp===1) {
				var html = 'Дякуємо за підтримку! <br/> Ваш голос враховано!';
				var num = $('.petition_votes_txt span').html()*1;
				$('.petition_votes_txt span').html(num+1);
				$('.petition_btn').addClass('disabled');
                $('.pet_help .pethelp_icon > i').addClass('fa-check');
                $('.pet_help .pethelp_title').html(html);
                $('.petition_votes_wijet').addClass('active');
			}
			else if(resp === 2) {
				var html = '<p>Голосування неможливе!<p>Ви вже голосували за цю петицію раніше!</p>';
				$('.petition_btn').addClass('disabled');
                $('.pet_help .pethelp_icon > i').addClass('fa-times');
                $('.pet_help .pethelp_title').html(html);
                $('.petition_votes_wijet').addClass('active');
			} else {
                var html = '<p>Виникла помилка!<p>Перевірте, чи виконано вхід на сайт або спробуйте ще раз пізніше!</p>';
                $('.pet_help .pethelp_icon > i').addClass('fa-times');
                $('.pet_help .pethelp_title').html(html);
                $('.petition_votes_wijet').addClass('active');
			}
            
			$content.html(html);
			$popup.removeClass('hidden');
			var h = $popup.height();
			var wh = $(window).height();

			var top = $(window).scrollTop();
			if(wh>h) {
				top += (wh-h)/2 ;
			}

			$popup.css({
				top: top
			});
			$('.loader').addClass('hidden');
			popup_timer = setTimeout(function () {
				$fade.addClass('hidden');
				$popup.addClass('hidden');
				clearTimeout(popup_timer);
				popup_timer = null;
			}, 5000)
		});
	});

	$('.add_to_favourite').on('click', function () {
		add_to_favourite($(this), '.add_to_unfavourite');
	});
	
	$('#add_to_favourite').on('click', function () {
		add_to_favourite($(this), '#add_to_unfavourite');
		// var _this = $(this);
		//
		// if ( _this.hasClass('disabled') ) {
		// 	return false;
		// }
        //
		// // $(this).parent().hide();
		// _this.prop('disabled',true);
		// _this.addClass('disabled');
		//
		// $.post( "/petition/add_to_favourite", {id: $(this).data('id') }, function( response ) {
		// 	if (response.status==3) {
		// 		window.location.href = response.url;
		// 	} else if(response.status==1)  {
		// 		_this.parent().hide();
		// 		$('#add_to_unfavourite').prop('disabled', false);
		// 		$('#add_to_unfavourite').removeClass('disabled');
		// 		$('#add_to_unfavourite').parent().show();
		// 		Popup.show('#success-add-to-favourite', response.message);
		// 	} else {
		// 		Popup.show('#error-add-to-favourite', response.message);
		// 	}
		//	
		// });
	});

	$('.add_to_unfavourite').on('click', function () {
		add_to_unfavourite($(this), '.add_to_favourite');
	});

	$('#add_to_unfavourite').on('click', function () {
		add_to_unfavourite($(this), '#add_to_favourite');
		// var _this = $(this);
		//
		// if (_this.hasClass('disabled')) {
		// 	return false;
		// }
        //
		// _this.prop('disabled',true);
		// _this.addClass('disabled');
		//
		// $.post( "/petition/add_to_unfavourite", {id: $(this).data('id') }, function( response ) {
		// 	 if (response.status == 3) {
		// 		window.location.href = response.url;
		// 	} else if (response.status == 1) {
		// 		 _this.parent().hide();
		// 		 $('#add_to_favourite').prop('disabled', false);
		// 		 $('#add_to_favourite').removeClass('disabled');
		// 		 $('#add_to_favourite').parent().show();
		// 		 Popup.show('#success-add-to-favourite', response.message);
		// 	} else {
		// 		 Popup.show('#error-add-to-favourite', response.message);
		// 	 }
		// });
	});

	$('#petition_themes').on('change', function(){
		$('#petition_themes_form').submit();
	});

	$('.fade,.popup,.popup_container').click(function (e) {
		return false;
		if( $(this).hasClass('popup_container') ) {
			e.stopPropagation();
		}
		else {
			var $fade = $('.fade');
			var $popup = $('.popup');
			if(!$fade.hasClass('hidden')) {
				$fade.addClass('hidden');
				$popup.addClass('hidden');
			}
		}
	});

	if( $('.petition_additional').length>0 ) {
		$('section').not('.fltr').css({
			minHeight: $('.petition_additional').outerHeight(true)+26
		});
	}

	if($('#petition_vote_btn').length>0 && !$('#petition_vote_btn').hasClass('disabled')) {

	}

	$('.required').keyup(function () {
		var start = $(this).data('start') * 1;
		if(start < 1) {
			$(this).attr('data-start', 1);
		}
	});
    
    //profile
    $('#user-email-button-edit').on('click', function() {
        $(this).hide();
        $('#user-email-detail').hide();
        $('#user-email-button-save').show();
        $('#user-email-button-cancel').show();
        $('#user-email-edit').show();
    });

    $('#user-email-button-cancel').on('click', function() {
        $(this).hide();
        $('#user-email-edit').val($('#user-email-detail').data('email'));
        $('#user-email-detail').show();
        $('#user-email-button-edit').show();
        $('#user-email-button-save').hide();
        $('#user-email-button-cancel').hide();
        $('#user-email-edit').hide(); 
    });

    $('.message-box').on('click', '.close', function(){
        $(this).parent().remove();
    });
    
    if($('#copy_wijet_urllink').length) {
        document.getElementById("copy_wijet_urllink").addEventListener("click", function () {
            $('#PtCopyTarget').val(window.location.href);
            if(copyToClipboard(document.getElementById("PtCopyTarget"))){
                Popup.show('#copy-petition-done');
            }
        });
    }
	
	var tech_question = $("#tech_question");
	if (tech_question.length) {
		tech_question.find("input").bind('copy paste cut', function (e) {
			return false;
		});
		tech_question.find("textarea").bind('copy paste cut', function (e) {
			return false;
		});
	}

});
$(window).scroll(function () {
	if(list !== null) {
		checkListScroll();
	}
});

function add_to_favourite(_this, btn_unfavourite) 
{
	if ( _this.hasClass('disabled') ) {
		return false;
	}

	// $(this).parent().hide();
	_this.prop('disabled',true);
	_this.addClass('disabled');

	$.post( "/petition/add_to_favourite", {id: _this.data('id')}, function( response ) {
		if (response.status==3) {
			window.location.href = response.url;
		} else if(response.status==1)  {
			_this.parent().hide();
			var unfavourite_btn = _this.parent().parent().find(btn_unfavourite);
			unfavourite_btn.prop('disabled', false);
			unfavourite_btn.removeClass('disabled');
			unfavourite_btn.parent().show();
			Popup.show('#success-add-to-favourite', response.message);
		} else {
			Popup.show('#error-add-to-favourite', response.message);
		}

	});
}

function add_to_unfavourite(_this, btn_favourite)
{
	if ( _this.hasClass('disabled') ) {
		return false;
	}

	// $(this).parent().hide();
	_this.prop('disabled',true);
	_this.addClass('disabled');

	$.post( "/petition/add_to_unfavourite", {id: _this.data('id')}, function( response ) {
		 if (response.status == 3) {
			window.location.href = response.url;
		} else if (response.status == 1) {
			 _this.parent().hide();
			 var favourite_btn = _this.parent().parent().find(btn_favourite);
			 favourite_btn.prop('disabled', false);
			 favourite_btn.removeClass('disabled');
			 favourite_btn.parent().show();
			 Popup.show('#success-add-to-favourite', response.message);
		} else {
			 Popup.show('#error-add-to-favourite', response.message);
		 }
	});
}


// отображение ошибки
function setErrorMessage(error) 
{
    $('#error').html(error);
    $('#error').show();
}

function vote_petition(id)
{
    if ( $(this).hasClass('disabled') ) {
        return false;
    }
    $(this).prop('disabled',true);
    $(this).addClass('disabled');
    $(this).hide();
    
    id = $.trim(id);
    var params = {};
    var finger = $.trim($('#finger').val());
    var browser = $.trim($('#browser').val());
    params['id'] = id;
    params['in_list'] = 1;
    params['finger'] = finger;
    params['browser'] = browser;
	var vote_msg_popup_i = $('#vote-petition-msg .popup-title > i');
    $.post( "/petition/vote", params, function( data ) {
        var resp = parseInt(data);
        if (resp === 1) {
            var html = 'Дякуємо за підтримку! <br/> Ваш голос враховано!';
            var num = $('.petition_votes_txt span').html() * 1;
            $('.petition_votes_txt span').html(num + 1);
            $('.petition_btn').addClass('disabled');
			if (vote_msg_popup_i.hasClass('fa-times')) {
				vote_msg_popup_i.removeClass('fa-times');
			}
			vote_msg_popup_i.addClass('fa-check');
			vote_msg_popup_i.css('color', 'green');
            $('#vote-petition-msg .vote-pt-text').html(html);
            Popup.show('#vote-petition-msg');
        }
        else if (resp === 2) {
            var html = '<p>Голосування неможливе!<p>Ви вже голосували за цю петицію раніше!</p>';
            $('.petition_btn').addClass('disabled');
			if (vote_msg_popup_i.hasClass('fa-check')) {
				vote_msg_popup_i.removeClass('fa-check');
			}
			vote_msg_popup_i.addClass('fa-times');
			vote_msg_popup_i.css('color', 'red');
            $('#vote-petition-msg .vote-pt-text').html(html);
            Popup.show('#vote-petition-msg');
        } else {
            var html = '<p>Виникла помилка!<p>Перевірте, чи виконано вхід на сайт або спробуйте ще раз пізніше!</p>';
			if (vote_msg_popup_i.hasClass('fa-check')) {
				vote_msg_popup_i.removeClass('fa-check');
			}
			vote_msg_popup_i.addClass('fa-times');
			vote_msg_popup_i.css('color', 'red');
            $('#vote-petition-msg .vote-pt-text').html(html);
            Popup.show('#vote-petition-msg');
        }
    });
}

function copyToClipboard(elem) 
{
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}

function get_voters_page(page) 
{
    var id = $('#id').val();
    if (page == '') {
        page = 1;
    }
    var table = $('#pet-tab-3 > .users_table .table');
    var pagination = $('#pet-tab-3 .users-table-pag');
    $.get('/petition/'+id+'/votes/'+page+'/json',function(data) {
        //var row = '';
        //$.each(data.voters, function(indx, voter){
        //    row += '<div class="table_cell number">'+indx+'</div>';
        //    row += '<div class="table_cell name">'+voter.name+', '+voter.last_name+', '+voter.middle_name+'</div>';
        //    row += '<div class="table_cell date">{{ getLocaleDateStr('+voter.creation_date+') }}</div>';
        //});
        table.html(data.table_html);
        pagination.html(data.pag_html);
    });
    
    return false;
}

function get_statistics(type)
{
    var statistic_pt_count = $('#statistic_pt_count');
    var statistic_pt_count_more25k = $('#statistic_pt_count_more25k');
    var statistic_count_who_votes = $('#statistic_count_who_votes');
    var statistic_count_answer = $('#statistic_count_answer');
    
    $.get('/statistics/get/'+type,function(data) {
        var info = data['info'];
        if (info) {
            statistic_pt_count.text(info['petitions_count']['count'] ? info['petitions_count']['count'] : '0');
            statistic_pt_count_more25k.text(info['petitions_count_more25k']['count'] ? info['petitions_count_more25k']['count'] : '0');
            statistic_count_who_votes.text(info['person_count_who_votes']['count'] ? info['person_count_who_votes']['count'] : '0');
            statistic_count_answer.text(info['petitions_count_answer']['count'] ? info['petitions_count_answer']['count'] : '0');
        }
        //pt_statistics.html(data.html);
    });

    return false;
}

function scrollToElement( target ) {
    var topoffset = 0;
    var speed = 800;
    var destination = jQuery( target ).offset().top - topoffset;
    jQuery( 'html:not(:animated),body:not(:animated)' ).animate( 
        { scrollTop: destination}, speed, function() {
        window.location.hash = target;
    });
    return false;
}
