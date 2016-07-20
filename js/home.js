$( document ).ready(function() {

  $(function() {

    var $window = $(window),
        $homeHeader = $('.home-header'),
        $scrollingContent = $('.scrolling-content');

    $window.scroll(function(e) {

      if ($window.scrollTop() >= $scrollingContent.offset().top - 60) {
        console.log("scrolled!");
        $homeHeader.addClass('fix-header');
      } else {
        $homeHeader.removeClass('fix-header');
      }

    });

  });

});
