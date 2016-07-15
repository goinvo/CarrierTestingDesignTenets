$( document ).ready(function() {
  var $window = $(window),
      $header = $('.header'),
      $contactButton = $('#contact-button'),
      $contactButtonContainer = $('#contact-button-container');

  $window.scroll(function(e) {

    if ($window.scrollTop() >= $contactButtonContainer.offset().top - 7) {
      $contactButton.addClass("fix-contact");
      $header.addClass('fix-contact');
    } else {
      $contactButton.removeClass("fix-contact");
      $header.removeClass('fix-contact');
    }

  });

});
