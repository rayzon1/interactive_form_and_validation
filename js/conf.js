const title = $("#title");
const design = $("#design");
const color = $("#color");
const activities = $('.activities');

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
    return $(element).prop(type, attr);
};

// This is the event listener for the design select element. Depending on selection
// color will change accordingly.
design.on('change', e => {
  if (e.target.value === 'js puns') {
    // Removes any previous elements with select type before adding its primary value with the select type.
    removeAttribute('#color option[selected="selected"]', "selected");
    addAttribute('#color option[value="cornflowerblue"]', "selected", "selected");
    $("#color option").each(function(i) {
      i <= 2 ? (this.style.display = "") : (this.style.display = "none");
    });

  } else if (e.target.value === "heart js") {
    addAttribute('#color option[value="tomato"]', 'selected', 'selected');
    $("#color option").each(function(i) {
      i >= 3 ? (this.style.display = "") : (this.style.display = "none");
    });

  } else if (e.target.value === "Select Theme") {
    removeAttribute('#color option[selected="selected"]', 'selected');
    addAttribute('#color option[value="cornflowerblue"]', 'selected', 'selected');

    // *Test this further for use with color event listener * 
    // $('#design option').first().attr("selected", "selected");

    $("#color option").each(function(i) {
        this.style.display = ""
    });
  }
});


const createListener = function (index_1, index_2, index_3){
    $('.activities input').eq(index_1).change(function () { 
        if($(this).prop('checked')==true){
            $('.activities input').eq(index_2).prop("disabled", "disabled");
            $('.activities input').eq(index_3).prop("disabled", "disabled");
            $('.activities label').eq(index_2).css("text-decoration", "line-through");
            $('.activities label').eq(index_3).css("text-decoration", "line-through");
        } else {
            $('.activities input').eq(index_2).removeAttr('disabled');
            $('.activities input').eq(index_3).removeAttr('disabled');
            $('.activities label').eq(index_2).css("text-decoration", "");
            $('.activities label').eq(index_3).css("text-decoration", "");
        }
    });
}

createListener(1,3,5);
createListener(3,1,5);
createListener(5,1,3);
createListener(2,4,6);
createListener(4,2,6);
createListener(6,2,4);


