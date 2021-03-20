/*------------------------------------------------------------------    
    Heli Susanna .dev Portfolio website
    Version 1.0
-------------------------------------------------------------------*/

$(window).on('load', function() {

    /*------------------
		Preloder
    --------------------*/
    $(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

});

$(document).ready(function(){

    /*------------------
		Background Set
    --------------------*/
	$('.set-bg').each(function() {
		let bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
    });

	/*----------------------
		Fullheight
    ------------------------*/    
    let fullHeight = function() {
        $('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});
		$('.js-fullwidth').css('width', $(window).width());
		$(window).resize(function(){
			$('.js-fullwidth').css('width', $(window).width());
		});
	}; 
	fullHeight();
		
	/*------------------
		Modals
	--------------------*/
	$("#close-project-1").click(function(){
		$("#project-info-1").fadeOut();
	});
	$("#close-project-2").click(function(){
		$("#project-info-2").fadeOut();
	});
	$("#close-project-3").click(function(){
		$("#project-info-3").fadeOut();
	});
	$("#close-project-4").click(function(){
		$("#project-info-4").fadeOut();
	});
	$("#close-project-5").click(function(){
		$("#project-info-5").fadeOut();
	});
	$("#close-project-6").click(function(){
		$("#project-info-6").fadeOut();
	});
	$("#close-project-7").click(function(){
		$("#project-info-7").fadeOut();
	});
	$("#btn-site-1").click(function(){
		$("#project-info-1").fadeIn();
	});
	$("#btn-site-2").click(function(){
		$("#project-info-2").fadeIn();
	});
	$("#btn-site-3").click(function(){
		$("#project-info-3").fadeIn();
	});
	$("#btn-site-4").click(function(){
		$("#project-info-4").fadeIn();
	});
	$("#btn-site-5").click(function(){
		$("#project-info-5").fadeIn();
	});
	$("#btn-site-6").click(function(){
		$("#project-info-6").fadeIn();
	});
	$("#btn-site-7").click(function(){
		$("#project-info-7").fadeIn();
	});
	/*$(document).click(function(event) {
		if (!$(event.target).closest("#btn-site").length) {
			$("#project-info").fadeOut();
		}
	  });*/

	$("#close-menu").click(function(){
		$("#burgermenu").fadeOut();
	});
	$("#btn-menu").click(function(){
		$("#burgermenu").fadeIn();
	});
	$(document).click(function(event) {
		if (!$(event.target).closest("#btn-menu").length) {
			$("#burgermenu").fadeOut();
		}
	  });

	/*------------------
		Filter projects
	--------------------*/

	$(".btn-select").click(function(){
		let value = $(this).attr('data-filter');
			
		if(value == "all") {
			$('.filter').fadeIn('slow');
		}
		else {
			//$(".filter").not('.'+value).hide('3000');
			$(".filter").not('.'+value).fadeOut('slow');
			//$('.filter').filter('.'+value).show('3000');
			$('.filter').filter('.'+value).fadeIn('slow');
		}
	});

	$('.btn-select').click(function() {
		$('#project-filter .active').removeClass('active');
		$(this).addClass('active');
	});

	/*------------------
		Slide animation 
		& scrolling
	--------------------*/
	
	$(".navbar a, footer a[href='#myPage']").on('click', function(event) {
		
		if (this.hash !== "") {
		  event.preventDefault();
		  var hash = this.hash;
		  $('html, body').animate({
			scrollTop: $(hash).offset().top
		  }, 900, function(){
			window.location.hash = hash;
		  });
		}
	});

	$(window).scroll(function() {
		$(".slideanim").each(function(){
			let pos = $(this).offset().top;
			let winTop = $(window).scrollTop();

			if (pos < winTop + 600) {
				$(this).addClass("slide");
			}
		});
	});

}); //end documend ready function