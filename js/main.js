/*--------------------------------------------------------------------
	Theme Name: Twelve
	Theme URI: http://template.twelve.itembridge.com/
	Author: InfoStyle
	Author URI: http://themeforest.net/user/InfoStyle
	Description: Twelve — fully responsive and super original one page template
	Version: 1.0.0
	License: ThemeForest Regular & Extended License
	License URI: http://themeforest.net/licenses/regular_extended
-----------------------------------------------------------------------*/

var $ = jQuery;

/*-----------------------------------------------------*/
/*------- Function check if there is an element -------*/
/*-----------------------------------------------------*/

jQuery.fn.exists = function() {
   return $(this).length;
}

/*------------------------------------------------------*/
/*------ Calculating The Browser Scrollbar Width -------*/
/*------------------------------------------------------*/

var parent, child, scrollWidth;

if (scrollWidth === undefined) {
  parent = $('<div style="width: 50px; height: 50px; overflow: auto"><div/></div>').appendTo('body');
  child = parent.children();
  scrollWidth = child.innerWidth() - child.height(99).innerWidth();
  parent.remove();
}

jQuery(document).ready(function(){

	/*------------------------------------*/
	/*------ For phones and tablets ------*/
	/*------------------------------------*/

	if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {

		/*------------------------------------*/
		/*--- Class for phones and tablets ---*/
		/*------------------------------------*/

        $('body').addClass('touch');

        /*------------------------------------*/
		/*------ Isotope Block at click ------*/
		/*------------------------------------*/

		$('.works-block, .team-block, .albums-block, .serv-block').on('click', function(){
			if ($(this).hasClass('hover')) {
				$(this).removeClass('hover');
			} else {
				$('.works-block, .team-block, .albums-block, .serv-block').removeClass('hover');
				$(this).addClass('hover');
			}
		});	

		/*-----------------------------------*/
		/*--------- Sub Menu toggle ---------*/
		/*-----------------------------------*/

		$('.sub').on('click', function(){
			$(this).toggleClass('hover');			
		});

		/*-----------------------------------*/
		/*---------- Menu at click ----------*/
		/*-----------------------------------*/

		$('li.search a').on('click', function(){

			if ($(this).parent('.search').hasClass('hover')) {
				$(this).parent('.search').removeClass('hover')
				$('.menu-overlay').css("display","none");
			}
			else {
				$(this).parent('.search').addClass('hover');
				$('.menu-overlay').css("display","block");
			}
			$(this).parent().siblings().removeClass('hover');
		});

		$('.menu>ul>li.menu-item-has-children').on('click', function(){
			if ($(this).hasClass('hover')) {
				$('.menu-overlay').css("display","block");
			}
			else {
				$('.menu-overlay').css("display","none");
			}
		});


		$('li.menu-item-has-children>a').on('click', function(){
			if( $(this).parent().hasClass('hover') ){
				$(this).parent().removeClass('hover');
			} else {
				$(this).parent().addClass('hover');
			}
			$(this).parent().siblings().removeClass('hover');				
		});

		$('.menu-overlay').on('click', function(){			
			if ( !($('body').width() + scrollWidth >= 767) ) {
				$('.navigation').removeClass('open');
			}
			$('li.menu-item-has-children , li.search').removeClass('hover');
			$('.menu-overlay').css("display","none");
		});

		/*-----------------------------------*/
		/*-------- Sub Menu at click --------*/
		/*-----------------------------------*/

		$('.menu-item-has-children>a').on('click', function(e){	
			e.preventDefault();	
		});
    }

    else {

    	/*-------------------------------------*/
		/*---------- Class for other ----------*/
		/*-------------------------------------*/

    	$('body').addClass('no-touch');  

    	/*-------------------------------------*/
		/*------ Sub Menu Isotope Filter ------*/
		/*-------------------------------------*/

    	$('.sub').hover(function(event) {
			event.preventDefault();
			$(this).addClass('hover');
		}, function(event) {
			event.preventDefault();
			$(this).removeClass('hover');
		});

		$('.sub ul li a').click(function(){
			$('.sub').removeClass('hover');
		});		

		/*--------------------------------------*/
		/*-- Adds Blur at hover menu elements --*/
		/*--------------------------------------*/

		$('.menu>ul>li.menu-item-has-children,li.search').hover(function(){
			$('.site-content,.site-blog-wrapper,.site-wrapper,.site-post-wrapper,.site-blog-nav,.social-fix').addClass('blur');
		},function() {
		   $('.site-content,.site-blog-wrapper,.site-wrapper,.site-post-wrapper,.site-blog-nav,.social-fix').removeClass('blur');
		});

		/*-------------------------------------*/
		/*----------- Search block  -----------*/
		/*-------------------------------------*/

		$("li.search").hover(function(e) {         
			if (e.type == "mouseenter") {
		        $(this).addClass('hover');
		    }
		    else if (!$(this).hasClass('opened')){ // mouseleave
		        $(this).removeClass('hover');
		    }
		});

		/*------------------------------------*/
		/*------------ Form block ------------*/
		/*------------------------------------*/

		$('#submit-form').click(function(){
		  $.post('form.php', $('#contactform').serialize(),  function(data) {
		    $('#success').html(data).animate({opacity: 1}, 500, function(){
		  if ($(data).is('.send-true')) {
		    $('#contactform').trigger( 'reset' );
		  }
		    });
		  });
		  return false;
		});

		/*-------------------------------------*/
		/*------------- More Menu -------------*/
		/*-------------------------------------*/

		$(window).resize(moreMenu);

    }

    /*------------------------------------*/
	/*------------ Safary Css ------------*/
	/*------------------------------------*/

	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){ 
		$('head').append('<link rel="stylesheet" href="css/safary.css">');
	}

   	/*------------------------------------*/
	/*---------- Isotope Filter ----------*/
	/*------------------------------------*/

   	$(".sub a.active").trigger("click");
	$(".sub a").click(function(e){
		e.preventDefault();

		var selector = $(this).attr("data-sort-value");
		$("#mass-block").isotope({ filter: selector });

		$(this).parents("ul").find("a").removeClass("active");
		$(this).addClass("active");
	});
	$('.sub ul li a').on('click', function(e){
		e.preventDefault();
		$('.sub-m span').text($(this).html());
	}); 

	/*------------------------------------*/
	/*------------ Login Page ------------*/
	/*------------------------------------*/

	$('.toforgotpass').click(function(e){
		e.preventDefault();
		$('#form-login').addClass('hiddens');
		$('#form-forgotpass').removeClass('hiddens');
	});
	$('.toregister').click(function(e){
		e.preventDefault();
		$('#form-login').addClass('hiddens');
		$('#form-register').removeClass('hiddens');
	});
	$('#form-register .tologin').click(function(e){
		e.preventDefault();
		$('#form-register').addClass('hiddens');
		$('#form-login').removeClass('hiddens');
	});
	$('#form-forgotpass .tologin').click(function(e){
		e.preventDefault();
		$('#form-forgotpass').addClass('hiddens');
		$('#form-login').removeClass('hiddens');
	});	

	/*-------------------------------------*/
	/*---------- Menu Open/Close ----------*/
	/*-------------------------------------*/

	$('a.ico').on('click', function(){
		if ($(this).hasClass('button-close')) {
			$('li.menu-item-has-children').removeClass('hover');
			$('.menu-overlay').css("display","none");
		}
	});

	/*------------------------------------*/
	
});

/*-------------------------------------------------------*/
/*------ Function determines which menu items hide ------*/
/*-------------------------------------------------------*/

function moreMenuItem() {	
	var totalWidth = 0,
		menuWidth  = $('.site-header').width() - 58 - $('.menu > ul > li.search').width() - 80 - $('.site-header a.cal').width();


	$('.menu > ul > li:not(.more-menu):not(.search)').each( function () {
		totalWidth = totalWidth + $(this).width();
		if (menuWidth < totalWidth) {
			$(this).addClass('more-li');
			$('.menu > ul > li.more-menu').addClass('visible');
			$(this).appendTo('.more-menu > ul.sub-menu');
		}		
	});
}

/*--------------------------------------------------------*/
/*------------ Function that returns all "li" ------------*/
/*-------------  in overall container menu  --------------*/
/*--------------------------------------------------------*/

function clearMenuRes(){
	if($('.menu > ul > li.more-menu ul.sub-menu > li.more-li').exists()) {
	  $('.menu > ul > li.more-menu').removeClass('visible');
	}
	$('.menu > ul > li.more-menu ul.sub-menu > li.more-li').each( function () {
		$(this).removeClass('more-li').appendTo('.menu > ul');
	});
	$('.menu > ul > li.more-menu').appendTo('.menu > ul');
	$('.menu > ul > li.search').appendTo('.menu > ul');
}

/*--------------------------------------------------------*/
/*----------------- Resize Function Menu -----------------*/
/*--------------------------------------------------------*/

function moreMenu(){

	if ($('body').width() + scrollWidth <= 767) {
		clearMenuRes();
		$('.menu > ul > li.more-menu').removeClass('visible');
		$('.menu>ul>li.search').prependTo('.menu>ul');
	}
	else if( $('body').width() + scrollWidth >= 768 && $('body').width() + scrollWidth <= 991 ) {
		clearMenuRes();

		moreMenuItem();
	}
	else if( $('body').width() + scrollWidth >= 992 && $('body').width() + scrollWidth <= 1229 ) {
		clearMenuRes();
		moreMenuItem();
	}
	else if ($('body').width() + scrollWidth >= 1230) {
		clearMenuRes();
		moreMenuItem();
	}

}


/*---------------------------------------------------------*/
/*------------- Internet Explorer Placeholder -------------*/
/*---------------------------------------------------------*/

$(function() {
	if(document.all && !window.atob){
	    $('input, textarea').placeholder();
	}
});

/*---------------------------------------------------------*/
/*---------------- Function that determines ---------------*/
/*----------- the height and width of the block -----------*/
/*---------------------------------------------------------*/

function columsSize(){
	var $fm = 4,$fl = 4,$rod = $('#mass-block').width();

	if ($('body').width() + scrollWidth >= 1230){
		var $col = Math.floor($rod/8),$fl = $fl+2;
		$('.ib-4, .ib-5').height($col*2);
	}
	else if ($('body').width() + scrollWidth >= 992){
		var $col = Math.floor($rod/6),$fl = $fl+2;
		$('.ib-4, .ib-5').height($col*2);
	}
	else if ($('body').width() + scrollWidth >= 767){
		var $col = Math.floor($rod/4);
		$('.ib-4, .ib-5').height(300);
	}
	else if ($('body').width() + scrollWidth > 500){
		var $col = $rod/4;
		$('.ib-4, .ib-5').height(300);
	}
	else {
		var $col = Math.floor($rod/1*2)/4,$fm = $fm/2,$fl = $fl/2;
		$('.ib-4').height(400);
		$('.ib-5').height(450);
	}

	$('.ib-1, .ib-2-1').width($col);

	$('.ib-2, .ib-3').width($col*2);
	$('.ib-4').css("width", $col*$fm);
	$('.ib-5').width($col*$fl);

	$('.ib-1, .ib-2').height($col);
	$('.ib-2-1, .ib-3').height(Math.floor($col*2));

	$('#mass-block').isotope({
		masonry: {
			itemSelector : '.col-item',
			columnWidth: $col
		}
	});
}

columsSize();
$(window).resize(columsSize);

/*--------------------------------------------------------*/
/*------------ Isotope Hidden block add class ------------*/
/*--------------------------------------------------------*/

var itemReveal = Isotope.Item.prototype.reveal;
Isotope.Item.prototype.reveal = function() {
  itemReveal.apply( this, arguments );
  $( this.element ).removeClass('isotope-hidden');
};

var itemHide = Isotope.Item.prototype.hide;
Isotope.Item.prototype.hide = function() {
  itemHide.apply( this, arguments );
  $( this.element ).addClass('isotope-hidden');
};

/*-------------------------------------------------------*/
/*---------------- Magnific Popup plugin ----------------*/
/*-------------------------------------------------------*/

var magnificPopup = $.magnificPopup.instance;

// Close modal.
$(document).on('click','.ajax-modal button.close', function(e){
   	e.preventDefault();
	$('.ajax-modal').removeClass('open');
	$('.mfp-bg').removeClass('openedd');
	$('.mfp-bg').removeClass('openedd-gall');
   	$('.mfp-bg').addClass('closedd');
   	setTimeout(function() {
		magnificPopup.close();
	}, 350);
});

// Prev arrow
$(document).on('click','.ajax-modal:not(.calendar) button.left', function(e){
	e.preventDefault();
	setTimeout(function() { $('.ajax-modal .modal-head').addClass('righting'); }, 0);
	setTimeout(function() {	$('.ajax-modal .button-group').addClass('righting');}, 100);
	setTimeout(function() {	$('.ajax-modal .modal-wrap, .ajax-modal .container').addClass('righting');}, 150);

	setTimeout(function() {
		magnificPopup.prev();
	}, 500);
});

// Next arrow
$(document).on('click','.ajax-modal:not(.calendar) button.right', function(e){
    e.preventDefault();
    setTimeout(function() {	$('.ajax-modal .modal-head').addClass('lefting');}, 0);
	setTimeout(function() {	$('.ajax-modal .button-group').addClass('lefting');}, 100);
	setTimeout(function() {	$('.ajax-modal .modal-wrap, .ajax-modal .container').addClass('lefting');}, 150);

    setTimeout(function() {
		magnificPopup.next();
	}, 500);
});

/*-------------------------------------------------------*/
/*----------------- Magnific Popup Ajax -----------------*/
/*-------------------------------------------------------*/

jQuery(document).ready(function(){

	// Works Modal
	$('.works-block').on('click', function(){
		$('.lb-block').magnificPopup({
			delegate: '.works-block:not(.isotope-hidden) .ajax-mod',
			type: 'ajax',
			closeOnBgClick: true,
			callbacks: {
				ajaxContentAdded: function() {
					setTimeout(function() {
						$('.ajax-modal').addClass('open');
				  	}, 200);
				},
				open: function(){
					setTimeout(function() {
						$('.mfp-bg').addClass('openedd');
				  	}, 1);
				}
			},
			tLoading: '',
			showCloseBtn: false
		});
	})


	// Albums Modal
	$('.albums-block').on('click', function(){
		$('.gallery-ajax').magnificPopup({
			delegate: '.albums-block:not(.isotope-hidden) .ajax-mod',
			type: 'ajax',
			closeOnBgClick: true,
			callbacks: {
				ajaxContentAdded: function() {
					setTimeout(function() {
						$('.ajax-modal').addClass('open');
				  	}, 200);
				},
				open: function(){
					setTimeout(function() {
						$('.mfp-bg').addClass('openedd-gall');
				  	}, 1);
					
				}
			},
			tLoading: '',
			showCloseBtn: false
		});
	});

	// Calendar Modal
	$('.cal-ajax').magnificPopup({
		type: 'ajax',
		tLoading: '',
		closeOnBgClick: false,
		callbacks: {
			ajaxContentAdded: function() {
				setTimeout(function() {
					$('.ajax-modal').addClass('open');
					$('#calendar').calendar({
						prev        : $('.ajax-modal .prev'),
						next        : $('.ajax-modal .next'),
						year_wrapper: $('#year'),
						date_wrapper: $('#date'),
						selet_type  : $('#select-type'),
						year_month  : $('#year_month'),
						year_number : $('#year_number')
					});
			  	}, 200);
			},
			open: function(){
				
				setTimeout(function() {
					$('.mfp-bg').addClass('openedd');
			  	}, 1);
			}
		},
		showCloseBtn: false
	});

	// VIDEO Modal
	$('.popup-youtube, .popup-vimeo').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		callbacks: {
			open: function(){
				setTimeout(function() {
					$('.mfp-bg').addClass('openedd-video');
			  	}, 1);
			}
		},
		tLoading: '',
		fixedContentPos: false
	});

});

/*------------------------------------------------------*/
/*--------------- Bootstrap tab collapse ---------------*/
/*------------------------------------------------------*/

if($(".nav-tabs").exists()) {
	$('.nav-tabs').tabCollapse();
}

/*------------------------------------------------------*/
/*--------------------- Pie Charts ---------------------*/
/*------------------------------------------------------*/

function pieCharts() {
	var data = [
	    ['One', 25],['Two', 15], ['Three', 16], 
	    ['Four', 17],['Five', 12], ['Six', 15]
	];
	var plot1 = jQuery.jqplot ('chart1', [data], { 
		seriesDefaults: {
			shadow: false,
			renderer:$.jqplot.DonutRenderer,
		    rendererOptions: {
				startAngle: -90,
				diameter: 140,
				dataLabelPositionFactor: 0.6,
				innerDiameter: 28,
				showDataLabels: true
			}
		},
		grid:{
			background:'transparent',
			borderColor:'transparent',
			shadow:false,
			drawBorder:false,
			shadowColor:'transparent'
		},
		seriesColors: [
			"#3f4bb8",
			"#e13c4c",
			"#ff8137",
			"#ffbb42",
			"#20bdd0",
			"#2b70bf",
			"#f25463",
			"#f1a114",
			"#f5707d",
			"#ffd07d",
			"#4c7737"],
		legend: { 
			show:true, 
			location: 'e'
		}
	});
	$(window).resize(function() {
		plot1.replot( { resetAxes: true } );
	});
}
if($("#chart1").exists()) {
	pieCharts()
}
function pieCharts2() {
	var data = [
	    ['', 33],['', 33], ['', 34]
	];
	var plot2 = jQuery.jqplot ('chart2', [data], { 
		seriesDefaults: {
			shadow: false,
			renderer:$.jqplot.DonutRenderer,
		    rendererOptions: {
				startAngle: -125,
				diameter: 140,
				dataLabelPositionFactor: 0.6,
				innerDiameter: 28,
				showDataLabels: true
			}
		},
		grid:{
			background:'transparent',
			borderColor:'transparent',
			shadow:false,
			drawBorder:false,
			shadowColor:'transparent'
		},
		seriesColors: [
			"#ffbb42",
			"#f1a114",
			"#ffd07d"
		]
	});
	$(window).resize(function() {
		plot2.replot( { resetAxes: true } );
	});
}
if($("#chart2").exists()) {
	pieCharts2()
}
function pieCharts3() {
	var data = [
	    ['', 33],['', 33], ['', 34]
	];
	var plot3 = jQuery.jqplot ('chart3', [data], { 
		seriesDefaults: {
			shadow: false,
			renderer:$.jqplot.DonutRenderer,
		    rendererOptions: {
				startAngle: -125,
				diameter: 140,
				dataLabelPositionFactor: 0.6,
				innerDiameter: 28,
				showDataLabels: true
			}
		},
		grid:{
			background:'transparent',
			borderColor:'transparent',
			shadow:false,
			drawBorder:false,
			shadowColor:'transparent'
		},
		seriesColors: [
			"#e13c4c",
			"#f25463",
			"#f5707d "
		]
	});
	$(window).resize(function() {
		plot3.replot( { resetAxes: true } );
	});
}
if($("#chart3").exists()) {
	pieCharts3()
}
function pieCharts4() {
	var data = [
	    ['', 33],['', 33], ['', 34]
	];
	var plot4 = jQuery.jqplot ('chart4', [data], { 
		seriesDefaults: {
			shadow: false,
			renderer:$.jqplot.DonutRenderer,
		    rendererOptions: {
				startAngle: -125,
				diameter: 140,
				dataLabelPositionFactor: 0.6,
				innerDiameter: 28,
				showDataLabels: true
			}
		},
		grid:{
			background:'transparent',
			borderColor:'transparent',
			shadow:false,
			drawBorder:false,
			shadowColor:'transparent'
		},
		seriesColors: [
			"#3f4bb8",
			"#2b70bf",
			"#20bdd0"
		]
	});
	$(window).resize(function() {
		plot4.replot( { resetAxes: true } );
	});
}
if($("#chart4").exists()) {
	pieCharts4()
}

/*-------------------------------------------------------*/
/*------------------ Moris Line Charts ------------------*/
/*-------------------------------------------------------*/

function morisLineCharts() {
	Morris.Line({
	  
	element: 'saleschart',

	data: [
	    {month: "2012-01", "rents": 1000, "sales": 2000},
	    {month: "2012-02", "rents": 1800, "sales": 2500},
	    {month: "2012-03", "rents": 3700, "sales": 2200},
	    {month: "2012-04", "rents": 4700, "sales": 2200},
	    {month: "2012-05", "rents": 4400, "sales": 3000},
	    {month: "2012-06", "rents": 4700, "sales": 3300},
	   	{month: "2012-07", "rents": 5000, "sales": 3300},
	    {month: "2012-08", "rents": 5000, "sales": 3700},
	    {month: "2012-09", "rents": 5200, "sales": 4300},
	    {month: "2012-10", "rents": 5000, "sales": 4300}
	],
		xkey: 'month',
		ykeys: ['rents', 'sales'],
		labels: ['rents', 'sales'],
		lineColors: ['#e45160','#ffbb42'],
		hideHover: 'auto',
		resize: true
	});
}
if($("#saleschart").exists()) {
	morisLineCharts()
}
function morisBarCharts() {
	Morris.Bar({
    	element: 'hero-bar',
    	data: [
	        {month: 'Jan.', sales: 2000, rents:2400},
	        {month: 'Feb.', sales: 3000, rents:3100},
	        {month: 'Mar.', sales: 3600, rents:3000},
	        {month: 'Apr.', sales: 4300, rents:4100},
	        {month: 'May.', sales: 3300, rents:3500},
	        {month: 'Jun.', sales: 3000, rents:3800},
	        {month: 'Jul.', sales: 3400, rents:2900},
	        {month: 'Aug.', sales: 2900, rents:3500},
	        {month: 'Sep.', sales: 4000, rents:3500},
	        {month: 'Oct.', sales: 3900, rents:3400}
    	],
	    xkey: 'month',
	    ykeys: ['sales', 'rents'],
	    labels: ['sales', 'rents'],
	    barColors: ['#e45160','#ffbb42'],
		hideHover: 'auto',
		resize: true
    });
}
if($("#hero-bar").exists()) {
	morisBarCharts()
}

function imonialSlider() {
	$(".imonial").royalSlider({
		autoHeight: true,
	    arrowsNav: false,
	    imageAlignCenter:false,
	    loop: false,
	    loopRewind: true,
	    numImagesToPreload: 6,
	    keyboardNavEnabled: true,
	    usePreloader: false
	})
}
if($('.imonial').exists()){
	imonialSlider()
}

/*-------------------------------------------------------*/
/*------------------ Ease Circle Skill ------------------*/
/*-------------------------------------------------------*/

if($('#firs').exists()){
	$("#firs").easyCircleSkill({
		percent:   	85,
		linesize:  	1,
		skillName: 	'Design'
	})
}
if($('#twos').exists()){
	$("#twos").easyCircleSkill({
		percent: 90,
		skillName: 	'Photoshop',
		colorline: '#ffbb42'
	})
}
if($('#thees').exists()){
	$("#thees").easyCircleSkill({
		percent:   	90,
		linesize:  	1,
		skillName: 	'HTML 5',
		colorline: '#e13c4c'
	})
}
if($('#fores').exists()){
	$("#fores").easyCircleSkill({
		percent: 80,
		skillName: 	'CSS 3',
		colorline: '#3f4bb8'
	})
}

/*-------------------------------------------------------*/
/*-------- Single post slider block image height --------*/
/*-------------------------------------------------------*/

function postSliderAvtoHeightBlock() {
	if( $('body').width() + scrollWidth >= 767 ) {
		$('.post-slider .image').each(function(){
			$(this).css("height", $(this).parent().height() );
		});
	} else {
		$('.post-slider .image').css("height",$(this).width() );
		$('.post-slider').royalSlider('updateSliderSize', true);
	}
}

/*------------------------------------------------------*/
/*----------------- Single post slider -----------------*/
/*------------------------------------------------------*/

function postSlider() {
	$(".post-slider").royalSlider({
		autoHeight: true,
	    loop: true,
	    arrowsNavAutoHide: false,
	    imageAlignCenter:false,
	    sliderDrag: false,
	    sliderTouch: false,
	    loopRewind: true,
	    navigateByClick: false,
	    transitionType: 'fade'
	}).removeClass('load');
}

if($('.post-slider').exists()){
	$(window).load(postSlider());

	postSliderAvtoHeightBlock();
	$(window).resize(postSliderAvtoHeightBlock);
}

/*----------------------------------------------------*/
/*----------------- Video Background -----------------*/
/*----------------------------------------------------*/

if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {} else {
	if($('.youtube-play').exists()){
		$(function(){
	      $(".youtube-play").mb_YTPlayer();
	    });
	}
}

/*-----------------------------------------------------*/
/*----------- Mobile Rotation Load Function -----------*/
/*-----------------------------------------------------*/

if(navigator.userAgent.match(/iPad|iPhone|Android/i)) {
	$(window).on('orientationchange', function() {
		columsSize();
		moreMenu();
		setTimeout(function() {
    		moreMenu();	
		}, 200);
	});
}

window.onload = orientationchange;
window.onorientationchange = orientationchange;
function orientationchange() {
	if(window.orientation == 90 || window.orientation == -90) {
    	columsSize();// Isotope block resize
    	postSliderAvtoHeightBlock();// Single Slider resize
    	setTimeout(function() {
    		postSliderAvtoHeightBlock();// Single Slider resize
			moreMenu();
		}, 150);
	}
}

/*------------------------------------------------------*/
/*------------ ChessBoard element function -------------*/
/*------------------------------------------------------*/

function squares() {
	$("#squares").width( Math.floor( $("#squares").parent().width() / $('.square').width() ) * $('.square').width() )
}
if($("#squares").exists()) {	
	jQuery(document).ready(function(){
		squares();
		setTimeout(function(){squares();},200);
	});
	$(window).resize(function(){
		squares();
		setTimeout(function(){squares();},200);
		setTimeout(function(){squares();},500);
	});
}

$('#squares').magnificPopup({
	delegate: '.square.square-img',
	removalDelay: 300,
	mainClass: 'mfp-fade',
	type: 'image',
	callbacks: {
		open: function(){
			setTimeout(function() {
				$('.mfp-bg').addClass('openedd-gall');
		  	}, 1);
		}
	},
	tLoading: ''
});

/*------------------------------------------------------*/

jQuery(document).ready(function(){

	/*------------------------------------*/
	/*------ Add Data Attr for hash ------*/
	/*------------------------------------*/

	$('a.ajax-mod').each(function(){
		$(this).attr('data-hash', $(this).parent().find('.name').html().replace(/\s/g, '_'))
	});

	/*------------------------------------*/
	/*----- Add hash to modal window -----*/
	/*------------------------------------*/

	$('.ajax-mod').on('click', function(){
		window.location.hash = $(this).attr('data-hash');
	});

	/*------------------------------------*/
	/*-- Carousel button vertical align --*/
	/*------------------------------------*/

	function buttonAlign(){
		$('.post-carousel a.prevs,.post-carousel a.nexts').css("top",  Math.floor($('.recent-post img').height()/2))
		setTimeout(function() {
			$('.post-carousel a.prevs,.post-carousel a.nexts').css("top",  Math.floor($('.recent-post img').height()/2))
		}, 1000)
	}
	$(window).resize(buttonAlign);
	 
	/*--------------------------------------*/
	/*-------- Recent post carousel --------*/
	/*--------------------------------------*/

	if($(".recent-post-carousel").exists()) {
		function postCarousel() {
			$(".recent-post-carousel").carouFredSel({
			    responsive: true,
			    height : 'auto',
			    width: '100%',
			    prev: '.post-carousel .prevs',
			    next: '.post-carousel .nexts',
			    scroll: {
			        items: 1,
			        speed: 500,
			        timeoutDuration:300000
			    },    
			    items: {
				    width: 280,
				    visible: {
				        min: 1,
				        max: 4
				    }
			    },
			    onCreate: function(){ 
			    	$(this).addClass('init');
			    	$(this).parent().add($(this)).css('height', $(this).children().first().height() + 'px');
			    	setTimeout(function() {
			    		$(this).parent().add($(this)).css('height', $(this).children().first().height() + 'px');
			    	}, 500);
			    	buttonAlign()
			    }
			});
		}
		var resizeTimer;

		
		postCarousel();
		setTimeout(postCarousel, 200);

		$(window).resize(function() {
		    clearTimeout(resizeTimer);
		    resizeTimer = setTimeout(postCarousel, 0);
		}).resize();
		
	}

	/*--------------------------------------*/
	/*----------- Image carousel -----------*/
	/*--------------------------------------*/
	
	if($(".image-carousel").exists()) {
		setTimeout(function(){
			$('.image-carousel').carouFredSel({
				responsive: true,
			    width: 'auto',
			    prev: '.carousel .prevs',
			    next: '.carousel .nexts',
			    scroll: {
			        items: 1,
			        speed: 500,
			        timeoutDuration:300000
			    },    
			    items: {
				    width: 280,
				    height: 'auto',
				    visible: {
				        min: 1,
				        max: 4
				    }
			    }
			});
		},0)
	}

	
});

/*------------------------------------------------------*/
/*------------ Load modal page through hash ------------*/
/*------------------------------------------------------*/

jQuery(document).ready(function(){

	if (location.hash.length > 0 ) { 
		setTimeout(function(){
			$('a[data-hash=' + window.location.hash.split('#').join('') + ']').trigger("click");
		},0)
	}
	
});



/*------------------------------------------------------*/
/*---------------- Ajax Pages Functions ----------------*/
/*------------------------------------------------------*/

function modalSlider(a,b,c){
	$(a).royalSlider({
		loop: true,
		controlNavigation: b,
		autoScaleSlider: true, 
		autoScaleSliderWidth: 760,     
		autoScaleSliderHeight: c
	});

	// Royal Slider Resize for Rotate Android Device FIX
	if(navigator.userAgent.match(/Android/i)) {	$(window).on('orientationchange', function() { 
		setTimeout(function() { 
			// Resize Slider
			$(a).royalSlider('updateSliderSize', true); 			
		}, 1500); });		
	}
}

/*------------------------------------------------------*/
/*------------------- Social Buttons -------------------*/
/*------------------------------------------------------*/

function socialLink(a){

	var urlsoc = location.href.replace("index.html","");

	// TWITTER SHARE
	new GetShare({
		root: $(a + '.gt-tw'),
		network: "twitter",
		button: {text: ""},
		share: {
			url: urlsoc,
			message: 'Link to '+urlsoc+' '
		}
	});
	// LINKEDIN SHARE
	new GetShare({
    	root: $(a + '.gt-in'),
		network: "linkedin",
		button: {text: ""},
		share: {
			url: urlsoc,
			message: 'Link to '+urlsoc+' '
		}
	});
	// VK SHARE
	new GetShare({
    	root: $(a + '.gt-vk'),
		network: "vk",
		button: {text: ""},
		share: {
			url: urlsoc
		}
	});
	// STUMBLEUPON SHARE
	new GetShare({
    	root: $(a + '.gt-st'),
		network: "stumbleupon",
		button: {text: ""},
		share: {
			url: urlsoc,
			message: 'Link to '+urlsoc+''
		}
	});
	// FACEBOOK SHARE
	new GetShare({
		root: $(a + '.gt-fb'),
		network: "facebook",
		button: {text: ""},
		share: {
			url: urlsoc,
			message: 'Link to '+urlsoc+' '
		}
	 });
	// GOOGLE+ SHARE
	new GetShare({
		root: $(a + '.gt-gp'),
		network: "googleplus",
		button: {text: ""},
		share: {
			url: urlsoc,
			message: 'Link to '+urlsoc+' '
		}
	 });
	// PINTEREST SHARE
	new GetShare({
		root: $(a + '.gt-pt'),
		network: "pinterest",
		button: {text: ""},
		share: {
			url: urlsoc,
			message: 'Link to '+urlsoc+' '
		}
	 });
}

/*-------------------------------------------------------*/
/*-------------- Count the number of share --------------*/
/*-------------------------------------------------------*/

function shareCount() {
	var numb = $('.getshare-counter'),
		allCount = 0;
	numb.each(function () {
		allCount = allCount + Number($(this).html());
	});
	$('#all').html(allCount)
}
setTimeout(function() {
	shareCount();
	setTimeout(function() {
		shareCount();
	}, 2000);
}, 1000);

/*-------------------------------------------------------*/
/*----------------- Function Clear Hash -----------------*/
/*-------------------------------------------------------*/

function ajaxClearHash(){
	window.location.hash = $('.ajax-modal .modal-head h1').html().replace(/\s/g, '_');
	$('.ajax-modal button.close').on('click', function(){
		window.location.hash = '';
	});
}

/*-------------------------------------------------------*/
/*---------- Function definition retina device ----------*/
/*-------------------------------------------------------*/

function retina(a){

	if( 'devicePixelRatio' in window && window.devicePixelRatio == 2 ){

		var imgToReplace = $(a+' img.replace-2x').get();	
	    for (var i=0,l=imgToReplace.length; i<l; i++) {
    		var src = imgToReplace[i].src;
	      	src = src.replace(/\.(png|jpg|gif)+$/i, '@2x.$1');
	      	imgToReplace[i].src = src;
	      	$(imgToReplace[i]).load(function(){
				$(this).addClass('loaded');
			});	      	
	    };	    

	    var imgToReplaceM = $(a+' a.replace-2x').get();
	    for (var i=0,l=imgToReplaceM.length; i<l; i++) {
	      	var src = imgToReplaceM[i].href;
	      	src = src.replace(/\.(png|jpg|gif)+$/i, '@2x.$1');
	      	imgToReplaceM[i].href = src;
	      	$(imgToReplaceM[i]).addClass('loaded');
	    };

	    $('img').each(function(){
			var item = $(this);
	 		var retinaSrc = $(this).attr('data-retina-src');

	 		if(retinaSrc !== undefined) {
				item.attr('src', retinaSrc );
			}
	 	});
	 
	}
}

function vimeoApi() {
	$('.vimeo-block').each(function(){
		var videoId = $(this).find('a.hide-link-play').attr('data-vimeo-id');
		var item = $(this);

		if(videoId !== undefined) {
			$.getJSON('http://vimeo.com/api/v2/video/'+videoId+'.json', function(data) {
				item.find('.video-pre img').css('display', 'none');
				item.find('.image').css('background', 'url('+data[0].thumbnail_medium+') 50% 100% / cover').addClass('load');
				item.find('.video-desc').html((Math.floor(data[0].duration / 60) + ':' + data[0].duration % 60)).addClass('load');
				item.find('a.hide-link-play').attr('href','https://vimeo.com/'+data[0].id);
			});
		}
	});
}

function youtubeApi() {
	$('.youtube-block').each(function(){
		var videoId = $(this).find('a.hide-link-play').attr('data-youtube-id');
		var item = $(this);

		if(videoId !== undefined) {
			$.getJSON('http://gdata.youtube.com/feeds/api/videos/'+videoId+'?v=2&alt=jsonc', function(data) {
				item.find('.video-pre img').css('display', 'none');
				item.find('.image').css('background' , 'url(http://img.youtube.com/vi/'+data.data.id+'/mqdefault.jpg) 50% 100% / cover').addClass('load');
				item.find('.video-desc').html((Math.floor(data.data.duration / 60) + ':' + data.data.duration % 60)).addClass('load');
				item.find('a.hide-link-play').attr('href','https://www.youtube.com/watch?v='+data.data.id);
			});
		}
	});
}

function pinterestApi() {
	$('.pint-block').each(function(){
		var pintId = $(this).find('a.hide-link').attr('data-pinterest-id');
		var item = $(this);

		if(pintId !== undefined) {
			$.ajax({
			    url: 'http://api.pinterest.com/v3/pidgets/pins/info/?pin_ids='+pintId,
			    jsonp: "callback",
			    dataType: "jsonp",
			    success: function(data) {
			        item.find('.pint-img img').css('display', 'none');
					item.find('.image').css('background' , 'url('+data.data[0]['images']['237x']['url']+') 50% 100% / cover').addClass('load');				
					item.find('a.hide-link').attr('href','http://www.pinterest.com/pin/'+data.data[0]['id']);
			    }
			});
		}
	});
}

function twitterApi() {
	$('.twitt-block').each(function(){
		var twittId = $(this).find('a.hide-link').attr('data-twitt-id');
		var item = $(this);

		if(twittId !== undefined) {			
			$.getJSON('twitteroauth/tw.php?tweet_id='+twittId, function(data) {
				item.find('.twitt').html(data.text);
				item.find('.twitt-desc').html('@'+data.user.screen_name+' <span title="'+data.created_at+'"></span>');
				item.find('a.hide-link').attr('href', 'https://twitter.com/'+data.user.screen_name+'/status/'+data.id_str);
			});
		}
	});
}
function flickrApi() {
	$('.flickr-block').each(function(){
		var flickrId = $(this).find('a.hide-link').attr('data-flickr-id');
		var item = $(this);	

		if(flickrId !== undefined) {	
			$.ajax({
				type: "GET",
			    url: 'twitteroauth/flickr.php?flickr_id='+flickrId,
			    success: function(data) {
			    	var data = JSON.parse(data);
			        item.find('.flickr-img img').css('display', 'none');
					item.find('.image').css('background' , 'url('+data['sizes']['size']['7']['source']+') 50% 100% / cover').addClass('load');				
					item.find('a.hide-link').attr('href',data['sizes']['size']['0']['url'].split('/sizes/sq').join(''));
			    }
			});
		}
	});
}

function facebookApi() {
	$('.facebook-block').each(function(){
		var facebookId = $(this).find('a.hide-link').attr('data-facebook-id');
		var item = $(this);	

		if(facebookId !== undefined) {	
			$.ajax({
				type: "GET",
			    url: 'twitteroauth/facebook.php?facebook_id='+facebookId,
			    success: function(data) {
			    	var data = JSON.parse(data);
			    	item.find('.fb-post').html(data['message']);
			    	item.find('.fb-post-desc').html('@'+data['from']['name']+' <span title=""></span>');
			    	item.find('a.hide-link').attr('href','https://www.facebook.com/'+data['id']);
			    }
			});
		}
	});
}

retina('');      // Retina Display



jQuery(document).ready(function(){
	
	setTimeout(function(){
		moreMenu();
	},0)
	
	$('.menu a.ico').on('click', function(){
		$('.navigation').toggleClass('open');
		$(this).addClass('button-close');
		$('li.menu-item-has-children,li.search').removeClass('hover');
	});
	
	// Social video API
	vimeoApi();
	youtubeApi();
	twitterApi();
	pinterestApi();
	flickrApi();
	facebookApi();

	if (document.body.style.msTouchAction !== undefined) {
		setTimeout(function(){moreMenu()},200);
		setTimeout(function(){moreMenu()},400);
	}
});


$(window).load(function(){
	setTimeout(function(){
		socialLink('');  // Social Link
	},0)	
})