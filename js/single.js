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

      $.each(patient.diseases, function(i, disease) {
        if (patient.isCarrier) {
          patient.carrierPositive = disease.name;
        }
      });



      var template = $('#carrier-template').html();
      var html = Mustache.to_html(template, patient);
      $('#results').html(html);
      $('.disease-count').html(patient.diseases.length);

      // carrier result dropdown after vertical scroll
      var windowWidth = $(window).width();
      var top = 0;
			$(document).scroll(function() {
				var y = $(this).scrollTop();
				if (y > 20) {
          $("#results-fixedheader-notcarrier").slideDown();
          $("#results-fixedheader-carrier").slideDown();
          if (windowWidth < 761 && top == 0) {
            // $(".research-toggle").animate({'margin-top': "68px"}, 400);
            // $(".research-toggle").css('background-color', "white");
            // $(".research-toggle").css('color', "#4D4D4D");
            // $(".research-toggle").css('box-shadow', "0px 0px 3px #ddd");
            top = 1;
          }
				} else {
					$("#results-fixedheader-notcarrier").slideUp();
          $("#results-fixedheader-carrier").slideUp();
          if (windowWidth < 761 && top == 1) {
            // $(".research-toggle").animate({"margin-top": "-3px"}, 400);
            // $(".research-toggle").css('background-color', "#45C0C1");
            // $(".research-toggle").css('color', "white");
            // $(".research-toggle").css('box-shadow', "0px 0px 0px");
            top = 0;
          }
				}
			})

			// vertical align disease status tag depending on size of window
			var windowWidth = $(window).width();
			if (windowWidth < 561) {
				var cardItems = $(".card-item");
				for (var i = 0; i < cardItems.length; i++) {
					var cardItemsHeight = $(".card-item").height();
					if (cardItems.eq(i).height() < 50) {
						$(".tag-noncarrier").eq(i).css("margin-top", "0px");
					}
				}
			}

    });

  });

  $researchToggle = $('.research-toggle'),

  $researchToggle.click(function() {
    $( ".research").toggleClass('research-on');
    $( ".research-toggle").toggleClass('research-on');
  });

});
