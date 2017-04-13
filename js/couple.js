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

  var coupleID = Number(getParameterByName('couple'));

  $(function() {

    if (coupleID === NaN || coupleID === undefined) {
      console.log('oops, no couple ID set');
      return;
    }

    $.getJSON('../json/data-couple.json', function (data) {
      var couple = data[coupleID];

      function riskStatus(couple) {
        var risks = {
          both: false,
          patient1: false,
          patient2: false
        };

        $.each(couple.diseases, function(i, disease) {
          if (disease.patient1IsCarrier && disease.patient2IsCarrier) {
            risks.both = true;
          } else if (disease.patient1IsCarrier) {
            risks.patient1 = true;
          } else if (disease.patient2IsCarrier) {
            risks.patient2 = true;
          }
        });

        $.each(couple.diseases, function(i, disease) {
          if (disease.patient1IsCarrier) {
            couple.patient1CarrierPositive = disease.name;
          }
        });
        $.each(couple.diseases, function(i, disease) {
          if (disease.patient2IsCarrier) {
            couple.patient2CarrierPositive = disease.name;
          }
        });

        console.log(risks);

        return risks;
      }

      function sortDiseases(diseases) {
        $.each(diseases, function(i, disease) {
          if (disease.patient1IsCarrier && disease.patient2IsCarrier) {
            disease.riskStatus = 2;
          } else if (disease.patient1IsCarrier || disease.patient2IsCarrier) {
            disease.riskStatus = 1;
          } else {
            disease.riskStatus = 0;
          }
        });

        var i = diseases.length;
        while (i--) {
          if (diseases[i].riskStatus === 0) {
            diseases.splice(i, 1);
          }
        }

        $.each(diseases, function(i, disease) {
          if (diseases[i].riskStatus === 2) {
            couple.diseasePositive = disease.name;
          }
        });

        diseases.sort(function(a, b) {
            return b.riskStatus - a.riskStatus;
        });

        return diseases;
      }

			/// carrier result dropdown after vertical scroll
      var windowWidth = $(window).width();
      var top = 0;
			$(document).scroll(function() {
				var y = $(this).scrollTop();
				if (y > 20) {
          $(".results-fixedheader-couple").slideDown();
          if (windowWidth < 761 && top == 0) {
            // $(".research-toggle").animate({'margin-top': "68px"}, 400);
            // $(".research-toggle").css('background-color', "white");
            // $(".research-toggle").css('color', "#4D4D4D");
            // $(".research-toggle").css('box-shadow', "0px 0px 3px #ddd");
            // $(".fixedheader-couple-text").css('font-size', "12px");
            // $(".button-action-plan").css('width', '103px');
            // $(".button-action-plan").css('height', '18px');
            $(".fixedheader-couple-button").css('padding-top', '0px');
            top = 1;
          }
				} else {
					$(".results-fixedheader-couple").slideUp();
          if (windowWidth < 761 && top == 1) {
            // $(".research-toggle").animate({"margin-top": "-3px"}, 400);
            // $(".research-toggle").css('background-color', "#45C0C1");
            // $(".research-toggle").css('color', "white");
            // $(".research-toggle").css('box-shadow', "0px 0px 0px");
            top = 0;
          }
				}
			})

      var risks = riskStatus(couple);

      if (risks.both) {
        couple.riskStatus4 = true;
        couple.isOverallCarrier = true;
        couple.atRisk = true;
        couple.diseases = sortDiseases(couple.diseases);
      } else if (risks.patient1 && risks.patient2) {
        couple.riskStatus3 = true;
        couple.isOverallCarrier = true;
        couple.diseases = sortDiseases(couple.diseases);
      } else if (risks.patient1 || risks.patient2) {
        couple.riskStatus2 = true;
        couple.isOverallCarrier = true;
        couple.diseases = sortDiseases(couple.diseases);
      } else {
        couple.riskStatus1 = true;
      }

      var template = $('#carrier-template').html();
      var html = Mustache.to_html(template, couple);
      $('#results').html(html);

      // if both are carriers for the same disease, the cell changes it's CSS to reflect that difference
      var tbodies = $("tbody tr");
      if (tbodies.length < 4) {
        for (i = 0; i < $("tbody tr").length; i++) {
          var currentTbody = tbodies.eq(i);
          for (i = 0; i < currentTbody.length; i++) {
            var resultOne = currentTbody.find("td p").eq(0).attr("class");
            var resultTwo = currentTbody.find("td p").eq(3).attr("class");
            if (resultOne == resultTwo) {
              currentTbody.css("background-color", "#FEFAF8");
              currentTbody.find("td p").eq(0).css("color", "#EEAC89");
              currentTbody.find("td p").eq(3).css("color", "#EEAC89");
              currentTbody.find("td p img").eq(0).attr("src", "/img/carrier-4.png");
              currentTbody.find("td p img").eq(1).attr("src", "/img/carrier-4.png");
            }
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
