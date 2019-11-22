jQuery(document).ready(function( $ ) {

  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},100, 'easeInOutExpo');
    return false;
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 10) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 10) {
    $('#header').addClass('header-scrolled');
  }

  if (window.matchMedia("(max-width: 767px)").matches) {
    $('#intro').css({ height: $(window).height() });
  }
  new WOW().init();

  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }


  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 100, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center:true,
    responsive: { 0: { items: 1 }, 768: { items: 3 }, 992: { items: 4 }, 1200: {items: 5}
    }
  });

  // Select dropdowns
  if ($('select').length) {
  	$.each($('select'), function (i, val) {
  		var $el = $(val);
  		if (!$el.val()) {
  			$el.addClass('not_chosen');
  		}
  		$el.on('change', function () {
  			if (!$el.val())
  				$el.addClass('not_chosen');
  			else
  				$el.removeClass('not_chosen');
  		});
    });
  }

  $(function(){
    $('.showRightContent').click(function(){
      $('.rightContentChoice').hide();
      $('#rightContent'+$(this).attr('tabindex')).show();
    });
  });

  $(".showRightContent").click(function() {
    $('html, body').animate({
        scrollTop: $("#sq").offset().top - 250
    }, 100);
  });

  (function() {
  'use strict';

  $('#fileUpload').fileupload({
      dataType: 'json',
      type: 'POST',
      url: '',
      add: function (e, data) {
        $('#filename').text(data.files[0].name);
        $('#upload-status').text("Uploading...");
        setProgressBar(0);
        data.submit();
      },
      progressall: function (e, data) {
        setProgressBar(parseInt(data.loaded / data.total * 100, 10));
      },
      done: function (e, data) {
        $('#upload-status').text("Uploading Complete!");
      }
    });

    function setProgressBar(percentage) {
      $('#progress .bar').css(
        'width',
        percentage + '%'
      ).text(percentage + '%');
      $('#progress .bar').css(
        'height',
        '30px'
      );
    }

  }).call(this);

  function autoPlayYouTubeModal() {
    var trigger = $('.trigger');
    trigger.click(function(e) {
      e.preventDefault();
      var theModal = $(this).data("target");
      var videoSRC = $(this).attr("src");
      var videoSRCauto = videoSRC + "?autoplay=1";
      $(theModal + ' iframe').attr('src', videoSRCauto);
      $(theModal).on('hidden.bs.modal', function(e) {
        $(theModal + ' iframe').attr('src', '');
      });
    });
  };

  autoPlayYouTubeModal();

  $('.carousel').carousel();

  /* Google Map */
  // if HTML DOM Element that contains the map is found...
  if (document.getElementById('map-canvas')) {
    var myLatlng = new google.maps.LatLng(52.525595,13.393085);

    var mapOptions = {
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  }

  $('.datepicker').datepicker();

});
