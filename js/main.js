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
      var patient = data.patient[0];
      var patientDiseases = patient.diseases;

      function filterDiseases(diseases, isCarrier) {
        var filteredDiseases = [];
        for (i = 0; i < diseases.length; i++) {
          if (diseases[i].carrier === isCarrier) {
            filteredDiseases.push(diseases[i]);
          }
        }
        return filteredDiseases;
      }

      if (patient.isCarrier) {
        patient.diseases = filterDiseases(patientDiseases, true);
      } else {
        patient.diseases = filterDiseases(patientDiseases, false);
      }

      var template = $('#carrier-template').html();
      var html = Mustache.to_html(template, data);
      $('#results').html(html);
      $('.disease-count').html(patient.diseases.length);

    });

  });

  var $element = $("#disease-list");
  var numberOfChildren = $element.children().length;
  console.log(numberOfChildren);

});
