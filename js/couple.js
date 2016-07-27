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
            console.log(disease.name);
            couple.diseasePositive = disease.name;
          }
        });

        diseases.sort(function(a, b) {
            return b.riskStatus - a.riskStatus;
        });

        return diseases;
      }

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
      // $('.disease-count').html(data.patient[0].diseases.length);

    });

  });

});
