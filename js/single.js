function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$( document ).ready(function() {

  var patientID = Number(getParameterByName('patient'));

  $(function() {

    if (patientID === NaN || patientID === undefined) {
      console.log('oops, no patient ID set');
      return;
    }

    $.getJSON('../json/data.json', function (data) {
      var patient = data.patient[patientID];
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
      var html = Mustache.to_html(template, patient);
      $('#results').html(html);
      $('.disease-count').html(patient.diseases.length);
      //
      // var $window = $(window),
      //     $header = $('.header'),
      //     $backButton = $('.back-button'),
      //     $contactButton = $('#contact-button'),
      //     $contactButtonContainer = $('#contact-button-container');
      //
      // $window.scroll(function(e) {
      //
      //   if ($window.scrollTop() >= $contactButtonContainer.offset().top - 7) {
      //     $contactButton.addClass("fix-contact");
      //     $header.addClass('fix-contact');
      //     $backButton.addClass('fix-contact');
      //   } else {
      //     $contactButton.removeClass("fix-contact");
      //     $header.removeClass('fix-contact');
      //     $backButton.removeClass('fix-contact');
      //   }
      //
      // });
      //
      // // media query event handler
      // if (matchMedia) {
      //   var mq = window.matchMedia("(min-width: 560px)");
      //   mq.addListener(WidthChange);
      //   WidthChange(mq);
      // }
      //
      // // media query change
      // function WidthChange(mq) {
      //   if (mq.matches) {
      //     $contactButton.removeClass("fix-contact");
      //     $header.removeClass('fix-contact');
      //     $backButton.removeClass('fix-contact');
      //   } else {
      //     $contactButton.addClass("fix-contact");
      //     $header.addClass('fix-contact');
      //     $backButton.addClass('fix-contact');
      //   }
      //
      // }

    });

  });

});
