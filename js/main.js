$( document ).ready(function() {
  var dropdownButtons = $('.button-drop');
  var layout   = document.getElementById('layout'),
      menu     = document.getElementById('menu'),
      menuLink = document.getElementById('menuLink');
      menuscreen = document.getElementById('menu-screen');
      menulinetop = document.getElementById('menu-open-top');
      menulinebottom = document.getElementById('menu-open-bottom');
      menutext = document.getElementById('menu-text');
      dropdown = document.getElementById('dropdown');
      dropdownWith = document.getElementById('dropdown-with');
      dropdownWhere = document.getElementById('dropdown-where');
      dropdownReason = document.getElementById('dropdown-reason');
      dropdownWhen = document.getElementById('dropdown-when');
      buttonSchedule = document.getElementById('buttonschedule');
      panelContainer = document.getElementById('panel-container');
      contentContainer = document.getElementById('content-container');
      headerBar = document.getElementById('header-bar');
      scheduleClose = document.getElementById('schedule-close');
      mobileNavBar = document.getElementById('nav-container-mobile');
      buttonRequest = document.getElementById('button-request');
      screenDark = document.getElementById('screen-dark');
      modalRequest = document.getElementById('modal-request');
      requestClose = document.getElementById('request-close');
      screenDarkExample = document.getElementById('screen-dark-example');
      modalExample = document.getElementById('modal-example');
      exampleClose = document.getElementById('example-close');
      buttonModal = document.getElementById('button-modal');

  dropdownButtons.click(function() {
    $(this).siblings('.dropdown-content-container').toggleClass('open');

    // $(this).css("border-radius", "7px 7px 0 0");
  });

  // $(".button").on("click", function() {
  //   $(this).toggleClass("back-red");
  // });
  // $(".button").on("click", function() {
  //     $(this).css("background", "#175D6F");
  // })

  $('.table-button, .button-drop, .button-action').click(function() {
    $(this).toggleClass('active');
  });


  function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    menuLink.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
        toggleClass(menuscreen, active);
        toggleClass(menulinetop, active);
        toggleClass(menulinebottom, active);
        toggleClass(menutext, active);
    };



    buttonSchedule.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(panelContainer, active);
        toggleClass(contentContainer, active);
        toggleClass(headerBar, active);
        toggleClass(mobileNavBar, active);
        // toggleClass(buttonSchedule, active);
    };

    scheduleClose.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(panelContainer, active);
        toggleClass(contentContainer, active);
        toggleClass(headerBar, active);
        toggleClass(mobileNavBar, active);
        // toggleClass(buttonSchedule, active);
    };

    buttonRequest.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(modalRequest, active);
        toggleClass(screenDark, active);
        // toggleClass(buttonSchedule, active);
    };

    requestClose.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(modalRequest, active);
        toggleClass(screenDark, active);
    };

    screenDark.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(modalRequest, active);
        toggleClass(screenDark, active);

    };

    buttonModal.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(modalExample, active);
        toggleClass(screenDarkExample, active);
    };

    screenDarkExample.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(modalExample, active);
        toggleClass(screenDarkExample, active);
    };

    exampleClose.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(modalExample, active);
        toggleClass(screenDarkExample, active);
    };


});
