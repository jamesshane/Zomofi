/**
 * Template Name: Imperial - v2.0.0
 * Template URL: https://bootstrapmade.com/imperial-free-onepage-bootstrap-theme/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

function lockBodyScroll(lock) {
  var tag = document.querySelector('.container'); // the child element of body that contains the long content
  if (!tag) return;
  //var elem = document.scrollingElement || document.body;
  var elem = document.body;
  if (lock) {
      var scrollTop = elem.scrollTop;
      tag.classList.add('no-scroll');
      tag.style.top = '-' + scrollTop + 'px';
  } else {
      var top = tag.offsetTop;
      tag.classList.remove('no-scroll');
      tag.style.top = '0px';
      elem.scrollTop = - top;
  }
}

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var is_Edge = navigator.userAgent.indexOf("Edge") > -1;
var is_chrome = !!window.chrome && !is_opera && !is_Edge;
var is_explorer= typeof document !== 'undefined' && !!document.documentMode && !is_Edge;
var is_firefox = typeof window.InstallTrigger !== 'undefined';
var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);


var bgimages = {
  music:['record.jpg'],needs_treatment:['ingo-schulz-lNQ7kD8A1SI-unsplash.jpg','patrick-lindenberg-1iVKwElWrPA-unsplash.jpg','ricardo-abreu-dZPp5ZVMcN0-unsplash.jpg'],sex:['butt.jpg','girlbed.jpg','scream.jpg','tatgirl.jpg','underwear.jpg','wetgirl.jpg'],unsorted:['mic.jpg','pinkhairgirl.jpg','rose.jpg','woman-1281209_1920.jpg'],urban:['graffiti.jpg','hero-bg.jpg','wall.jpg']
};
var theme="all";
if(theme==="all") {
  var keys=Object.keys(bgimages);
  theme=keys[Math.floor(Math.random() * keys.length)];
}
var random_bg=bgimages[theme][Math.floor(Math.random() * bgimages[theme].length)];

// debug----
document.getElementById("debug").onclick=clickDebug;
function clickDebug() {
  console.log("debug");
  changePhoto();
}
var photoIdx=0;
function changePhoto() {
  console.log("changePhoto");
  if(photoIdx===bgimages[theme].length)
    photoIdx=0;
  var drandom_bg=bgimages[theme][photoIdx];
  var dhtml = document.getElementsByTagName('html')[0];
  dhtml.style.cssText = "--image: url(../img/background/themes/"+theme+"/"+drandom_bg+")";
  photoIdx+=1;
}
// debug----

 var audioElem =null;
 var random_color=null;

function setEvents() {
  console.log("Safari: "+is_safari);
  console.log("OS: "+getMobileOperatingSystem());
  if(getMobileOperatingSystem()!=="unknown") {
    // $('body').css('background-image', 'url(assets/img/background/themes/'+theme+'/'+random_bg+')');
  } else {
    var html = document.getElementsByTagName('html')[0];
    html.style.cssText = "--image: url(../img/background/themes/"+theme+"/"+random_bg+")";
    $('.a1').hide();
  }
  document.getElementById("color-overlay").onclick=toggleSound;
  document.getElementById("plrControls").onclick=toggleSound;
  document.getElementById("bulb").onclick=toggleSound;
  //$('#hero').css({'background-image': 'url(../img/background/' + bgimages[Math.floor(Math.random() * bgimages.length)] + ')'});
  audioElem = document.getElementById("audioplyr");
  audioElem.onplaying = colorChange;
  audioElem.onpause = colorWhite;
}

function toggleSound() {
  if (audioElem.paused) {
    audioElem.play();
    document.getElementById("volume_up-overlay").onclick=volumeUp;
    document.getElementById("volume_down-overlay").onclick=volumeDown;
  } else {
    audioElem.pause();
    document.getElementById("volume_up-overlay").onclick=null;
    document.getElementById("volume_down-overlay").onclick=null;
  }
}

function getVolume() {
  var volDeg=Math.trunc(audioElem.volume*10)/2;
  // console.log(volDeg);
  volDeg-=1;
  // console.log(volDeg);
  volDeg*=90;
  // console.log(volDeg);
  return Number(volDeg);
}

function adjVolume() {
  $("#volume").removeClass();
  $("#volume").addClass("fas").addClass("fa-circle-notch").addClass("fa-rotate-"+getVolume());
  var vol=getVolume();

  if(vol >= 360) {
    $("#volume").css("color", random_color);
  }
  else if(vol < 0) {
    $("#volume").css("color", "grey");
    $("#volume").css("opacity", "0.3");
  }
  else {
    $("#volume").css("color", "white");
    $("#volume").css("opacity", "0.5");
  }

}

function volumeUp() {
  // console.log("up");
  try {
  audioElem.volume+=0.2;
  adjVolume();
  } catch(err) {}
}

function volumeDown() {
  // console.log("down");
  try {
  audioElem.volume-=0.2;
  adjVolume();
} catch(err) {}
}

function colorChange() {
  random_color = pickColor();
  $("#bulb").removeClass("far").addClass("fas").css("color", random_color);
  $("#pause").addClass("fa-rotate-90").css("color", random_color);
  var x = document.getElementById("color-overlay");
  x.style.backgroundColor = random_color;
  document.body.style.backgroundColor = random_color;
  $("#hero .hero-logo2 p").css("color", random_color);
  adjVolume();
}

function colorWhite() {
  $("#bulb").removeClass("fas").addClass("far").css("color", "white");
  $("#pause").removeClass("fa-rotate-90").css("color", "white");
  var x = document.getElementById("color-overlay");
  x.style.backgroundColor = "white";
  document.body.style.backgroundColor = "#666666";
  $("#hero .hero-logo2 p").css("color", "#666666");
  $("#volume").css("color", "darkgrey");
}

function pickColor() {
  // Array containing colors  001,010,011-100,101,110-111,000
  var colors = [
    "#0000ff",
    "#00ff00",
    "#00ffff",
    "#ff0000",
    "#ff00ff",
    "#ffff00",
  ];

  // selecting random color
  random_color = colors[Math.floor(Math.random() * colors.length)];

  return random_color;
}

!(function ($) {
  "use strict";

  // Preloader
  $(window).on("load", function () {
    setEvents();
    $("#preloader")
      .delay(500)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  });

  // Hero rotating texts
  $("#hero .rotating").Morphext({
    animation: "flipInX",
    separator: ",",
    speed: 3000,
  });

  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $(".nav-menu").superfish({
    animation: {
      opacity: "show",
    },
    speed: 400,
  });

  // Mobile Navigation
  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container").clone().prop({
      id: "mobile-nav",
    });
    $mobile_nav.find("> ul").attr({
      class: "",
      id: "",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>'
    );
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav")
      .find(".menu-has-children")
      .prepend('<i class="fa fa-chevron-down"></i>');
    $(document).on("click", ".menu-has-children i", function (e) {
      $(this).next().toggleClass("menu-item-active");
      $(this).nextAll("ul").eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });
    $(document).on("click", "#mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
      $("#mobile-body-overly").toggle();
    });
    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Stick the header at top on scroll
  $("#header").sticky({
    topSpacing: 0,
    zIndex: "50",
  });

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;
        if ($("#header").length) {
          top_space = $("#header").outerHeight();
        }
        $("html, body").animate(
          {
            scrollTop: target.offset().top - top_space,
          },
          1500,
          "easeInOutExpo"
        );
        if ($(this).parents(".nav-menu").length) {
          $(".nav-menu .menu-active").removeClass("menu-active");
          $(this).closest("li").addClass("menu-active");
        }
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $("#mobile-body-overly").fadeOut();
        }
        return false;
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, #mobile-nav");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 120;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight() - 90;

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("menu-active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("menu-active");
      }
      if (cur_pos < 200) {
        $(".nav-menu li:first").addClass("menu-active");
      }
    });
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  // Porfolio isotope and filter
  $(window).on("load", function () {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });

    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");

      portfolioIsotope.isotope({
        filter: $(this).data("filter"),
      });
    });
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function () {
    $(".venobox").venobox();
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  });
})(jQuery);
