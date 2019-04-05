const title = $("#title");
const design = $("#design");
const color = $("#color");

// This trigger will show an input box when the other option is selected.
title.on("change", e => {
  if (e.target.value === "other") {
    title.css("display", "none");
    $("#other-title")
      .css("display", "")
      .focus();
  }
});

// Put this in main function. This hides the other-title input upon load.
$("#other-title").css("display", "none");

const removeAttribute = (element, attr) => {
    return $(element).removeAttr(attr);
};
const addAttribute = (element, type, attr) => {
    return $(element).attr(type, attr);
};

// This is the event listener for the design select element. Depending on selection
// color will change accordingly.
design.on("change", e => {
  if (e.target.value === "js puns") {
    // Removes any previous elements with select type before adding its primary value with the select type.
    removeAttribute('#color option[selected="selected"]', "selected");
    addAttribute('#color option[value="cornflowerblue"]', "selected", "selected");
    $("#color option").each(function(i) {
      i <= 2 ? (this.style.display = "") : (this.style.display = "none");
    });

  } else if (e.target.value === "heart js") {
    $('#color option[value="tomato"]').attr("selected", "selected");
    $("#color option").each(function(i) {
      i >= 3 ? (this.style.display = "") : (this.style.display = "none");
    });

  } else if (e.target.value === "Select Theme") {
    $('#color option[selected="selected"]').removeAttr("selected");
    $('#color option[value="cornflowerblue"]').attr("selected", "selected");
    
    // *Test this further for use with color event listener * 
    // $('#design option').first().attr("selected", "selected");

    for (let i = 0; i < color[0].length; i++) {
      color[0][i].style.display = "";
    }
  }
});
