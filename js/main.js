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

  $(function() {

    $.getJSON('json/data.json', function (data) {
      var template = $('#patient_template').html ();
      var html = Mustache.to_html(template, data);
      $('#results').html(html);
      var $carrierCounter = 0;
      for (i = 0; i < data.patient.disease.length; i++) {
        var $carrier = data.patient.disease.carrier;
        if ($carrier == true) {
          $carrierCounter++;
        }
      }
      $('.disease-count').html($carrierCounter);

    });

  });

  var $element = $("#disease-list");
  var numberOfChildren = $element.children().length;
  console.log(numberOfChildren);

});
