/* -- Full Screen Viewport Container
   ---------------------------- */

$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets
    init();
});

$(document).ready(function() {
  fullScreenContainer();
  owlCarousel();
  magnificPopup();
});



/* --- initialize functions on window load here -------------- */

function init() {
  tooltips();
  toggleContactForm();
}



/* --- Full Screen Container ------------- */

function fullScreenContainer() {

  // Set Initial Screen Dimensions

  var screenWidth = $(window).width() + "px";
  var screenHeight = $(window).height() + "px";

  $("#intro, #intro .item, #introduction").css({
    width: screenWidth,
    height: screenHeight
  });

  // Every time the window is resized...

  $(window).resize( function () {

    // Fetch Screen Dimensions

    var screenWidth = $(window).width() + "px";
    var screenHeight = $(window).height() + "px";

    // Set Slides to new Screen Dimensions

    $("#intro, #intro .item, #introduction, #introduction .item").css({
      width: screenWidth,
      height: screenHeight
    });

  });

}



/* --- owlCarousel ------------- */

function owlCarousel() {
    $("#owl-example").owlCarousel({
      lazyLoad : true,
      items: 3,
      theme: "owl-theme-main"
    });

    $("#intro").owlCarousel({
      lazyLoad: true,
      lazyEffect: "fade",
      singleItem: true,
      navigation: true,
      navigationText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
      slideSpeed : 450,
      pagination: false,
      transitionStyle: "fade",
      theme: "owl-theme-featured"

    });
}



/* --- Tooltips ------------------- */

function tooltips() {
  $('.tooltips').tooltip();
}




/* --- Show/Hide Contact Form ------------------- */

function toggleContactForm() {
  $('.contact-button').click(function() {
    $(this).toggleClass('active');
    $('.contact-form').slideToggle(300);
  });
}




/* --- scrollReveal ------------------- */

window.scrollReveal = new scrollReveal();



/* --- magnific popup ------------------- */

function magnificPopup() {

  // Gallery
  $('.popup-gallery').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-fade',
    disableOn: 700,
    removalDelay: 160,
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    },
    callbacks: {
      close: function() {
        $('.portfolio-item figure figcaption').removeClass('active');
        $('.portfolio-item figure .info').removeClass('active');
      }
    }
  });

  $('.portfolio-item figcaption a.preview').click(function(){
    $(this).parent().addClass('active');
    $(this).parent().siblings('.info').addClass('active');
  });

  // Zoom Gallery

  $('.zoom-modal').magnificPopup({
    type: 'image',
    mainClass: 'mfp-with-zoom', // this class is for CSS animation below

    zoom: {
      enabled: true, // By default it's false, so don't forget to enable it

      duration: 300, // duration of the effect, in milliseconds
      easing: 'ease-in-out', // CSS transition easing function

      // The "opener" function should return the element from which popup will be zoomed in
      // and to which popup will be scaled down
      // By defailt it looks for an image tag:
      opener: function(openerElement) {
        // openerElement is the element on which popup was initialized, in this case its <a> tag
        // you don't need to add "opener" option if this code matches your needs, it's defailt one.
        return openerElement.is('i') ? openerElement : openerElement.find('i');
      }
    }

  });

  $('.popup-modal').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,

		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});
}



/* --- Isotope ------------------- */

function isotope() {

 var $container = $('#portfolio');

 // init
 $container.imagesLoaded( function(){
   $container.isotope({
     // options
     itemSelector: '.portfolio-item',
     layoutMode: 'fitRows'
   });
 });

 // filter items on button click
 $('#filters').on( 'click', 'button', function( event ) {
   var filterValue = $(this).attr('data-filter-value');
   $container.isotope({ filter: filterValue });
   $('#filters button').removeClass('active');
   $(this).addClass('active');
 });

}


/* --- Modal overlay (used for signup form) ------------------- */

function signupOverlay() {
  var container = document.querySelector( 'div.container' ),
    triggerBttn = document.getElementsByClassName( 'signup' ),
    overlay = document.querySelector( 'div#signup' ),
    closeBttn = overlay.querySelector( 'button.overlay-close' );
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    support = { transitions : Modernizr.csstransitions };

  function toggleOverlay() {
    if( classie.has( overlay, 'open' ) ) {
      classie.remove( overlay, 'open' );
      classie.remove( container, 'overlay-open' );
      classie.add( overlay, 'close-me' );
      var onEndTransitionFn = function( ev ) {
        if( support.transitions ) {
          if( ev.propertyName !== 'visibility' ) return;
          this.removeEventListener( transEndEventName, onEndTransitionFn );
        }
        classie.remove( overlay, 'close-me' );
      };
      if( support.transitions ) {
        overlay.addEventListener( transEndEventName, onEndTransitionFn );
      }
      else {
        onEndTransitionFn();
      }
    }
    else if( !classie.has( overlay, 'close-me' ) ) {
      classie.add( overlay, 'open' );
      classie.add( container, 'overlay-open' );
    }
  }

  for (i = 0; i < triggerBttn.length; i++) {
      triggerBttn[i].addEventListener( 'click', toggleOverlay );
  }
  closeBttn.addEventListener( 'click', toggleOverlay );

  $('.signup').click(function(e) {
      e.preventDefault();
  });
}

/* --- Modal overlay (used for login form) ------------------- */

function loginOverlay() {
  var container = document.querySelector( 'div.container' ),
    triggerBttn = document.querySelector( '.login' ),
    overlay = document.querySelector( 'div#login' ),
    closeBttn = overlay.querySelector( 'button.overlay-close' );
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    support = { transitions : Modernizr.csstransitions };

  function toggleOverlay() {
    if( classie.has( overlay, 'open' ) ) {
      classie.remove( overlay, 'open' );
      classie.remove( container, 'overlay-open' );
      classie.add( overlay, 'close-me' );
      var onEndTransitionFn = function( ev ) {
        if( support.transitions ) {
          if( ev.propertyName !== 'visibility' ) return;
          this.removeEventListener( transEndEventName, onEndTransitionFn );
        }
        classie.remove( overlay, 'close-me' );
      };
      if( support.transitions ) {
        overlay.addEventListener( transEndEventName, onEndTransitionFn );
      }
      else {
        onEndTransitionFn();
      }
    }
    else if( !classie.has( overlay, 'close-me' ) ) {
      classie.add( overlay, 'open' );
      classie.add( container, 'overlay-open' );
    }
  }

  triggerBttn.addEventListener( 'click', toggleOverlay );
  closeBttn.addEventListener( 'click', toggleOverlay );

  $('.login').click(function(e) {
      e.preventDefault();
  });
}


//Placeholder fixed for Internet Explorer
$(function() {
	var input = document.createElement("input");
	if(('placeholder' in input)==false) {
		$('[placeholder]').focus(function() {
			var i = $(this);
			if(i.val() == i.attr('placeholder')) {
				i.val('').removeClass('placeholder');
				if(i.hasClass('password')) {
					i.removeClass('password');
					this.type='password';
				}
			}
		}).blur(function() {
			var i = $(this);
			if(i.val() == '' || i.val() == i.attr('placeholder')) {
				if(this.type=='password') {
					i.addClass('password');
					this.type='text';
				}
				i.addClass('placeholder').val(i.attr('placeholder'));
			}
		}).blur().parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var i = $(this);
				if(i.val() == i.attr('placeholder'))
					i.val('');
			})
		});
	}
	});



/*
  Jquery Validation using jqBootstrapValidation
   example is taken from jqBootstrapValidation docs
  */
$(function() {

 $("input,textarea").jqBootstrapValidation(
    {
     preventSubmit: true,
     submitError: function($form, event, errors) {
      // something to have when submit produces an error ?
      // Not decided if I need it yet
     },
     submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
       // get values from FORM
       var first_name = $("input#first_name").val();
       var last_name = $("input#last_name").val();
       var email = $("input#email").val();
       var message = $("textarea#message").val();

       console.log("Name: "+ first_name + " last_name: " + last_name + " email: "+ email + " message: " + message);

    //     var firstName = name; // For Success/Failure Message
    //        // Check for white space in name for Success/Fail message
    //     if (firstName.indexOf(' ') >= 0) {
	   // firstName = name.split(' ').slice(0, -1).join(' ');
    //      }
	 $.ajax({
       url: "http://api.psicologainfantil.mx",
       type: "POST",
       data: {first_name: first_name, last_name: last_name, email: email, message: message},
       cache: false,
       success: function() {
        // Success message
           $('#success').html("<div class='alert alert-success'>");
           $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append( "</button>");
           $('#success > .alert-success').append("<strong>Tu mensaje ha sido enviado.</strong>");
           $('#success > .alert-success').append('</div>');
           //clear all fields
           $('#contactForm').trigger("reset");
        },
        error: function() {
 		    // Fail message
           $('#success').html("<div class='alert alert-danger'>");
           $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append( "</button>");
           var msg = "<strong>Disculpa " + first_name +
                                                " parece que nuestro servidor no está respondiendo ...</strong><br>" +
                                                " Podrías contactarnos por facebook. Lamentamos el inconveniente!";
           console.log("msg: " + msg);
           $('#success > .alert-danger').append(msg);
 	         $('#success > .alert-danger').append('</div>');
            //clear all fields
           $('#contactForm').trigger("reset");
 	      },
      })
    },
    filter: function() {
      return $(this).is(":visible");
   },
 });

      $("a[data-toggle=\"tab\"]").click(function(e) {
                    e.preventDefault();
                    $(this).tab("show");
        });
  });


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
  target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  $('.navbar-toggle:visible').click();
});

