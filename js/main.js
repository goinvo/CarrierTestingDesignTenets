$( document ).ready(function() {

  var wrap = $("#wrap");

  wrap.on("scroll", function(e) {

    if (this.scrollTop > 50) {
      console.log("scrolled!");
      wrap.addClass("fix-contact");
    } else {
      wrap.removeClass("fix-contact");
    }

  });

  $('.contact').click(function(){
    console.log("clicked!");
  });

});
