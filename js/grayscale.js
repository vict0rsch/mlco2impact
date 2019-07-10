(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 100
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);


  // Form Handling

  const getValues = () => {
    const gpu = $("#compute-gpu option:selected").text();
    const provider = $("#compute-provider option:selected").text();
    const region = $("#compute-region option:selected").text();
    const hours = parseInt($("#compute-hours").val(), 10);

    if (hours <= 0 || hours > 1e6) {
      fail("Wrong GPU-hours value: " + hours);
      return null
    }

    return {
      gpu, provider, region, hours
    }
  }

  const fail = (message) => {
    $("#result-card").hide();
    $(".spinner-border").hide()
    alert("Value error | " + message);
  }

  const checkForm = () => {
    const values = getValues();
    console.log({ values });

    return values;
  }

  const submitCompute = () => {
    $(".spinner-border").show()
    const values = checkForm();

    if (!values) return;

    // Computations

    setTimeout(() => {
      $(".spinner-border").hide()
      $("#result-card").fadeIn();
    }, 800
    )
  }

  $("#compute-form").submit(e => {
    // e.preventDefault();
    console.log("Submitting...")
    submitCompute();
    return false;
  })



})(jQuery); // End of use strict
