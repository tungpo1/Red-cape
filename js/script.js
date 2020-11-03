(function() {
	var $;
	$ = this.jQuery || window.jQuery;
	win = $(window), body = $('body'), doc = $(document);

	$.fn.hc_accordion = function() {
		var acd = $(this);
		acd.find('ul>li').each(function(index, el) {
			var act = $(el).find('ul').is(':hidden') ? "" : 'active';
			if($(el).find('ul li').length > 0) $(el).prepend('<button type="button" class="acd-drop '+act+'"></button>');
		});
		acd.on('click','.acd-drop', function(e){
			e.preventDefault();
			var ul=$(this).nextAll("ul");
			if(ul.is(":hidden") === true){
				ul.parent('li').parent('ul').children('li').children('ul').slideUp(180);
				ul.parent('li').parent('ul').children('li').children('.acd-drop').removeClass("active");
				$(this).addClass("active");
				ul.slideDown(180);
			}
			else{
				$(this).removeClass("active");
				ul.slideUp(180);
			}
		});
	}

	$.fn.hc_countdown = function(options){
		var settings = $.extend({
			date: new Date().getTime() + 1000 * 60 * 60 * 24,
		}, options ), this_ = $(this);
		this_.append('<div class="item d"><span>00</span> Day</div>'
			+'<div class="item h"><span>00</span> Hours</div>'
			+'<div class="item m"><span>00</span> Minutes </div>'
			+'<div class="item s"><span>00</span> Seconds </div>');
		var countDownDate = new Date(settings.date).getTime();

		var count = setInterval(function() {
			var now = new Date().getTime();
			var distance = countDownDate - now;
			var days = hours = minutes = seconds = 0;
			if(distance >= 0){
				days = Math.floor(distance / (1000 * 60 * 60 * 24));
				hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				seconds = Math.floor((distance % (1000 * 60)) / 1000);
			}

			this_.find('.item.d span').text(days);
			this_.find('.item.h span').text(hours);
			this_.find('.item.m span').text(minutes);
			this_.find('.item.s span').text(seconds);
			if (distance < 0) {
				clearInterval(count);
			}
		}, 1000);
	}

	$.fn.hc_upload = function(options){
		var settings = $.extend({
			multiple: false,
			result: '.hc-upload-pane',
		}, options ), this_ = $(this);

		var input_name = this_.attr('name');
		this_.removeAttr('name');

		this_.change(function(event){
			if($(settings.result).length > 0){
				var files = event.target.files;
				if(settings.multiple){
					for(var i = 0, files_len = files.length ; i<files_len; i++){
						var path = URL.createObjectURL(files[i]);
						var name = files[i].name;
						var size = Math.round(files[i].size/1024/1024 * 100) / 100;
						var type = files[i].type.slice(files[i].type.indexOf('/')+1);

						var img = $('<img src="'+path+'">');
						var input = $('<input type="hidden" name="'+input_name+'[]"'
							+'" value="'+path
							+'" data-name="'+name
							+'" data-size="'+size
							+'" data-type="'+type
							+'" data-path="'+path
							+'">');
						var elm = $('<div class="hc-upload"><button type="button" class="hc-del smooth">&times;</button></div>').append(img).append(input);
						$(settings.result).append(elm);
					}
				}
				else{
					var path = URL.createObjectURL(files[0]);
					var img = $('<img src="'+path+'">');
					var elm = $('<div class="hc-upload"><button type="button" class="hc-del smooth">&times;</button></div>').append(img);
					$(settings.result).html(elm);
				}
			}
		});

		body.on('click', '.hc-upload .hc-del', function(e){
			e.preventDefault();
			this_.val('');
			$(this).closest('.hc-upload').remove();
		});
	}

}).call(this);


jQuery(function($) {
	var win = $(window), body = $('body'), doc = $(document);

	var FU = {
		get_Ytid: function(url){
			var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
			if(url) var arr = url.match(rx);
			if(arr) return arr[1];
		},
		get_currency: function(str){
			return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		},
		animate: function(elems){
			var animEndEv = 'webkitAnimationEnd animationend';
			elems.each(function () {
				var $this = $(this),
				$animationType = $this.data('animation');
				$this.addClass($animationType).one(animEndEv, function() {
					$this.removeClass($animationType);
				});
			});
		},
		mCheck: function(){
			if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
				|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
				return true;
			}
			else{
				return false;
			}
		}
	};

	var UI = {
		mMenu: function(){
			var main_nav = $('.main-nav');
			var m_nav = $('<div class="m-nav"><button class="m-nav-close">&times;</button><div class="nav-ct"></div></div>');
			body.append(m_nav);

			m_nav.find('.m-nav-close').click(function(e) {
				e.preventDefault();
				mnav_close();
			});

			m_nav.find('.nav-ct').append(main_nav.children().clone());

			var mnav_open = function(){
				m_nav.addClass('active');
				body.append('<div class="m-nav-over"></div>').css('overflow', 'hidden');
			}
			var mnav_close = function(){
				m_nav.removeClass('active');
				body.children('.m-nav-over').remove();
				body.css('overflow', '');
			}

			doc.on('click', '.m-nav-open', function(e) {
				e.preventDefault();
				if(win.width() <=991) mnav_open();
			}).on('click', '.m-nav-over', function(e) {
				e.preventDefault();
				mnav_close();
			});

			m_nav.hc_accordion();
			win.on('resize orientationchange', function(e) {
				if(win.width() > 991) body.css('overflow', '');
			})
		},

		header: function(){
			var elm = $('header'), h = elm.innerHeight(),
			mh = $('.header').innerHeight(),
			offset = $('.header').offset().top,
			mOffset = 0;

			var fixed = function(){
				elm.addClass('fixed');
				body.css('margin-top', h);
			}
			var unfixed = function(){
				elm.removeClass('fixed');
				body.css('margin-top', '');
			}
			var Mfixed = function(){
				elm.addClass('m-fixed');
				body.css('margin-top', h);
			}
			var unMfixed = function(){
				elm.removeClass('m-fixed');
				body.css('margin-top', '');
			}
			if(win.width()>991){
				win.scrollTop() >= offset ? fixed() : unfixed();
			}
			else{
				win.scrollTop() >= mOffset ? Mfixed() : unMfixed();
			}
			win.scroll(function(e) {
				if(win.width()>991){
					win.scrollTop() >= offset ? fixed() : unfixed();
				}
				else{
					win.scrollTop() >= mOffset ? Mfixed() : unMfixed();
				}
			});
			win.on('resize orientationchange', function(e) {
				setTimeout(function(){
					h = elm.innerHeight();
					if(win.width()>991){
						elm.removeClass('m-fixed');
						win.scrollTop() > offset ? fixed() : unfixed();

					}
					else{
						elm.removeClass('fixed');
						win.scrollTop() > mOffset ? Mfixed() : unMfixed();
					}
				},50)
			});
		},
		backTop: function(){
			var back_top = $('.back-to-top'), offset = 800;

			back_top.click(function(){
				$("html, body").animate({ scrollTop: 0 }, 800 );
				return false;
			});

			if(win.scrollTop() > offset){
				back_top.fadeIn(200);
			}

			win.scroll(function() {
				if(win.scrollTop() > offset ) back_top.fadeIn(200);
				else back_top.fadeOut(200);
			});
		},
		slider: function(){
			$('.cnv-slider').slick({
				nextArrow: '<img src="images/next.png" class="next" alt="Next">',
				prevArrow: '<img src="images/prev.png" class="prev" alt="Prev">',
				autoplay: true,
				speed: 800,
				autoplaySpeed: 3000,
				pauseOnHover: false,
				// nextArrow: '<i class="fa fa-angle-right smooth next"></i>',
				// prevArrow: '<i class="fa fa-angle-left smooth prev"></i>',
				// arrows: false,
				// dots: true,
			})
			FU.animate($(".cnv-slider .slick-current [data-animation ^= 'animated']"));
			$('.cnv-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
				if(currentSlide!=nextSlide){
					var aniElm = $(this).find('.slick-slide[data-slick-index="'+nextSlide+'"]').find("[data-animation ^= 'animated']");
					FU.animate(aniElm);
				}
			});


			$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
				$($(e.target).attr('href')).find('.slick-slider').slick('setPosition');
			})
		},
		input_number: function(){
			doc.on('keydown', '.numberic', function(event) {
				if (!(!event.shiftKey
					&& !(event.keyCode < 48 || event.keyCode > 57)
					|| !(event.keyCode < 96 || event.keyCode > 105)
					|| event.keyCode == 46
					|| event.keyCode == 8
					|| event.keyCode == 190
					|| event.keyCode == 9
					|| event.keyCode == 116
					|| (event.keyCode >= 35 && event.keyCode <= 39)
					)) {
					event.preventDefault();
				}
			});
			doc.on('click', '.i-number .up', function(e) {
				e.preventDefault();
				var input = $(this).parents('.i-number').children('input');
				var max = Number(input.attr('max')), val = Number(input.val());
				if(!isNaN(val)) {
					if(!isNaN(max) && input.attr('max').trim()!='') {
						if(val >= max){
							return false;
						}
					}
					input.val(val + 1);
					input.trigger('number.up');
				}
			});
			doc.on('click', '.i-number .down', function(e) {
				e.preventDefault();
				var input = $(this).parents('.i-number').children('input');
				var min = Number(input.attr('min')), val = Number(input.val());
				if(!isNaN(val)){
					if(!isNaN(min) && input.attr('max').trim()!=''){
						if(val <= min){
							return false;
						}
					}
					input.val(val - 1);
					input.trigger('number.down');
				}
			});
		},
		yt_play: function(){
			doc.on('click', '.yt-box .play', function(e) {
				var id = FU.get_Ytid($(this).closest('.yt-box').attr('data-url'));
				$(this).closest('.yt-box iframe').remove();
				$(this).closest('.yt-box').append('<iframe src="https://www.youtube.com/embed/'+id+'?rel=0&amp;autoplay=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>');
			});
		},
		psy: function(){
			var btn = '.psy-btn', sec = $('.psy-section'), pane = '.psy-pane';
			doc.on('click', btn, function(e) {
				e.preventDefault();
				$(this).closest(pane).find(btn).removeClass('active');
				$(this).addClass('active');
				$("html, body").animate({ scrollTop: $($(this).attr('href')).offset().top - 90 }, 600 );
			});

			var section_act = function(){
				$(pane).find(btn).removeClass('active');
				sec.each(function(index, el) {

					if((win.scrollTop() + (win.height()/2) >= $(el).offset().top) && (win.scrollTop() + (win.height()/2) < $(el).offset().top+ $(el).innerHeight() )){
						var id = $(el).attr('id');
						$(pane).find(btn+'[href="#'+id+'"]').addClass('active');
					}
				});
			}
			section_act();
			win.scroll(function(){
				section_act();
			});
		},
		toggle: function(){
			var ani = 100;
			$('[data-show]').each(function(index, el) {
				var ct = $($(el).attr('data-show'));
				$(el).click(function(e) {
					e.preventDefault();
					ct.fadeToggle(ani);
				});
			});
			win.click(function(e){
				$('[data-show]').each(function(index, el){
					var ct = $($(el).attr('data-show'));
					if(ct.has(e.target).length == 0 && !ct.is(e.target) && $(el).has(e.target).length == 0 && !$(el).is(e.target)){
						ct.fadeOut(ani);
					}
				});
			});
		},
		uiCounterup: function(){
			var item = $('.hc-counter'), flag = true;
			if(item.length > 0){
				run(item);
				win.scroll(function() {
					if(flag == true){
						run(item);
					}
				});

				function run(item){
					if(win.scrollTop() + 70 < item.offset().top && item.offset().top + item.innerHeight() < win.scrollTop() + win.height()){
						count(item);
						flag = false;
					}
				}

				function count(item){
					item.each(function(){
						var this_ = $(this);
						var num = Number(this_.text().replace(".", ""));
						var incre = num/80;
						function start(counter){
							if(counter <= num){
								setTimeout(function(){
									this_.text(FU.get_currency(Math.ceil(counter)));
									counter = counter + incre;
									start(counter);
								}, 20);
							}
							else{
								this_.text(FU.get_currency(num));
							}
						}
						start(0);
					});
				}
			}
		},

		drop: function(){
			$('.drop').each(function() {
				var this_ = $(this);
				var label = this_.children('.label');
				var ct = this_.children('ul');
				var item = ct.children('li').children('a');

				this_.click(function() {
					ct.slideToggle(150);
				});

				item.click(function(e) {
					e.preventDefault();
					label.html($(this).html());
				});

				win.click(function(e) {
					if(this_.has(e.target).length == 0 && !this_.is(e.target)){
						this_.children('ul').slideUp(150);
					}
				})
			});
		},

		init: function(){
			UI.mMenu();
			UI.header();
			UI.slider();
			// UI.drop();
			// UI.backTop();
			UI.toggle();
			// UI.input_number();
			// UI.yt_play();
			// UI.psy();
			// UI.uiCounterup();
		},
	}


	UI.init();

	var wow = new WOW({offset:50,mobile:false});
	wow.init();

	$('.m-tab a').click(function(e) {
		if($(window).width() < 992){
			$(this).closest('.m-tab').prev('.m-tab-btn').children('span').text($(this).text());
			$(this).closest('.m-tab').children('ul').slideUp(200);
		}
	});
	$('.m-tab-btn').click(function(e) {
		e.preventDefault();
		if($(window).width() < 992){
			$(this).next('.m-tab').children('ul').slideToggle(200);
		}
	});
	$(window).resize(function(e) {
		if($(window).width() >= 992){
			$('.m-tab > ul').css('display', '');
		}
	});

	$(window).click(function(e) {
		if($(this).width() <= 991){
			$('.m-tab-btn').each(function() {
				var this_ = $(this);
				var ct = this_.next('.m-tab');
				if(ct.has(e.target).length == 0 && !ct.is(e.target) && this_.has(e.target).length == 0 && !this_.is(e.target)){
					ct.children('ul').slideUp(200);
				}
			})
		}
	});





	  $('.slider').slick({
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: false,
		responsive: [{
			breakpoint: 1199,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		},{
			breakpoint: 767,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 400,
			settings: {
				arrows: false,
				slidesToShow: 2,
				slidesToScroll: 1
			}
		}]
	});

	$(".greeting_content_arrow").click(function() {
	    $('html, body').animate({
	        scrollTop: $(".slide-come").offset().top - $("header").innerHeight()
	    }, 700);
	});
})