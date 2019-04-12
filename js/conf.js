/* ======================================================

Author: Gerardo Keys
Description: This project is the third project for teamtreehouse. This project
will validate input fields using jQuery before the user is able to submit the
form. There will be included tooltips next to the input fields in order to clarify
what's missing to the user. The tooltips will change dynamically if the input is blank 
or missing required elements. When the required fields are complete the form will 
submit (reload).

======================================================= */

// Various variables holding selected elements. This is an attempt
// to have cleaner code.
const title = $("#title");
const design = $("#design");
const color = $("#color");
const activities = $(".activities");
var total = 0;

// This trigger will show an input box when the other option is selected.
title.on("change", e => {
  if (e.target.value === "other") {
    $("#other-title")
      .css("display", "")
      .focus();
  } else {
      $("#other-title").css("display", "none");
  }
});

// Short function to remove attribute specified.
const removeAttribute = (element, attr) => {
  return $(element).removeAttr(attr);
};

// Short function to add attribute specified.
const addAttribute = (element, type, attr) => {
  return $(element).prop(type, attr);
};

// Tests if the elements focus property is false, if so it returns true.
const falseTest = element => {
  return $(element).is(":focus") == false;
};

// Puts a red border around input field with a placeholder specified by argument.
const errorBox = (element, property) => {
  $(element)
    .css("border-color", "red")
    .prop("placeholder", property);
};

// Tests name value field against regex.
const testName = name => {
  const regex = /^$/;
  return regex.test(name);
};

// Tests email value field against regex.
const testEmail = email => {
  const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return regex.test(email);
};

// Will run through checkbox fields and push element if it is checked.
// If checked array is less than 1, will return true.
const testCheckbox = () => {
  let checked = [];
  $('.activities input[type="checkbox"]').each(function() {
    if ($(this).is(":checked")) {
      checked.push($(this));
    }
  });
  return checked.length < 1 ? true : false;
};

// Tests the credit card value field against the regex.
const testCreditCard = value => {
  const regex = /^([0-9]{13,16})$/;
  return regex.test(value);
};

// Tests the zip code value field against the regex.
const testZipCode = value => {
  const regex = /^[0-9]{5}$/;
  return regex.test(value);
};

// Tests the cvv value field against the regex.
const testCvv = value => {
  const regex = /^[0-9]{3}$/;
  return regex.test(value);
};

// This is the event listener for the design select element. Depending on selection
// color will change accordingly. The color option will remain hidden until a selection
// is made.
design.on("change", e => {
  if ($(e.target).val() === "js puns") {
    $(".color").css("display", "");
    removeAttribute('#color option[selected="selected"]', "selected");
    addAttribute(
      '#color option[value="cornflowerblue"]',
      "selected",
      "selected"
    );
    $("#color option").each(function(i) {
      i <= 2 ? (this.style.display = "") : (this.style.display = "none");
    });
  } else if ($(e.target).val() === "heart js") {
    $(".color").css("display", "");
    addAttribute('#color option[value="tomato"]', "selected", "selected");
    $("#color option").each(function(i) {
      i >= 3 ? (this.style.display = "") : (this.style.display = "none");
    });
  } else if ($(e.target).val() === "select") {
    $(".color").css("display", "none");
    removeAttribute('#color option[selected="selected"]', "selected");
    addAttribute(
      '#color option[value="cornflowerblue"]',
      "selected",
      "selected"
    );
  }
});

// This function will create a listener for the checkbox fields to disable any
// times conflicting with a selected field. Depending on the indexes given, the
// checkboxes will display accordingly. This is an attempt to minimize code.
const createListener = function(index_1, index_2) {
  $(".activities input")
    .eq(index_1)
    .change(function() {
      if ($(this).prop("checked") == true) {
        $(".activities input")
          .eq(index_2)
          .prop("disabled", "disabled");
        $(".activities label")
          .eq(index_2)
          .css("text-decoration", "line-through");
      } else {
        $(".activities input")
          .eq(index_2)
          .removeAttr("disabled");
        $(".activities label")
          .eq(index_2)
          .css("text-decoration", "");
      }
    });
};

// This change listener will extract the number values from the checkbox fields
// then add them to a running total which will be displayed below the checkboxes.
$(".activities input").on("change", function(e) {
  $(".hidden").css("display", "");
  const regex = /\d{3}/;
  let num = regex.exec(
    $(e.target)
      .parent()
      .text()
  );
  if ($(this).prop("checked")) {
    total += parseInt(num[0]);
    $("#total").prop("placeholder", "$" + total.toString());
  } else {
    total -= parseInt(num[0]);
    $("#total").prop("placeholder", "$" + total.toString());
  }
  if (total === 0) {
    $(".hidden").css("display", "none");
  }
});

// Listener for the name field will change error dynamically until characters are
// inputted in the field.
$("#name").on(" keydown keyup click", function() {
  if (testName($("#name").val())) {
    errorBox("#name", "Invalid name");
  } else {
    $(this)
      .css("border-color", "")
      .prop("placeholder", "");
  }
});

// Listener for email field which will change error dynamically until a value
// formatted as an email (includes "." and "@").
$("#mail").on("keydown keyup click", function() {
  if (testEmail($("#mail").val())) {
    $(this)
      .css("border-color", "")
      .prop("placeholder", "");
  } else {
    errorBox("#mail", "Invalid email");
  }
});

// This change listener will display or hide elements based on the selected option
// within the payment section.
$("#payment").on("change", function() {
  // Function here was made to specify the display property of either paypal or
  // bitcoin fields. I made this in an effort to minimize repeated code.
  const payOrBit = (paypal, bitcoin) => {
    $(".creditcardtooltip").css("display", "none");
    $(".ziptooltip").css("display", "none");
    $(".cvvtooltip").css("display", "none");
    $("#credit-card").css("display", "none");
    $("#bitcoin").css("display", bitcoin);
    $("#paypal").css("display", paypal);
  };

  if ($(this).val() == "paypal") {
    payOrBit("", "none");
  } else if ($(this).val() == "bitcoin") {
    payOrBit("none", "");
  } else {
    $("#paypal").css("display", "none");
    $("#bitcoin").css("display", "none");
    $("#credit-card").css("display", "");
  }
});

// Listener for credit card field, will dynamically display error and tooltip as
// the user types in the field if number is not either 13 or 16 digits long.
$("#cc-num").on("keyup click", function() {
  if (testCreditCard($("#cc-num").val())) {
    $(".creditcardtooltip").css("display", "none");
    $(this)
      .css("border-color", "")
      .prop("placeholder", "");
  } else {
    $(".creditcardtooltip")
      .text("Credit Card must be 13 through 16 digits")
      .css("display", "");
    errorBox("#cc-num", "Please enter a valid credit card");
  }
  if (testName($("#cc-num").val())) {
    $(".creditcardtooltip")
      .text("Credit card cannot be blank")
      .css("display", "");
  }
});

// Listener for zip-code field. This will display an error dynamically based on user
// input. Error will show if there are more or less than 5-digits.
$("#zip").on("keyup click", function() {
  if (testZipCode($("#zip").val())) {
    $(".ziptooltip").css("display", "none");
    $(this)
      .css("border-color", "")
      .prop("placeholder", "");
  } else {
    $(".ziptooltip")
      .text("Zip code must be 5 digits")
      .css("display", "");
    errorBox("#zip", "Invalid zip");
  }
  if (testName($("#zip").val())) {
    $(".ziptooltip")
      .text("Zip code cannot be blank")
      .css("display", "");
  }
});

// The cvv listener will test the value of the cvv field and will display an error
// if it is not 3 digits.
$("#cvv").on("keyup click", function() {
  if (testCvv($("#cvv").val())) {
    $(".cvvtooltip").css("display", "none");
    $(this)
      .css("border-color", "")
      .prop("placeholder", "");
  } else {
    $(".cvvtooltip")
      .text("CVV must be 3 digits")
      .css("display", "");
    errorBox("#cvv", "Invalid cvv");
  }
  if (testName($("#cvv").val())) {
    $(".cvvtooltip")
      .text("CVV cannot be blank")
      .css("display", "");
  }
});

// This is the listener for the register button (submit) element. Upon submission
// all input fields will be tested against their regex. Each block will test the
// values and produce an error field or remove an error field.
$("form").on("submit", function(event) {
  event.preventDefault();

  $("#mail").on("keyup", function() {
    if (testEmail($("#mail").val())) {
      $(this)
        .css("border-color", "")
        .prop("placeholder", "");
    } else {
      errorBox("#mail", "Invalid email");
    }
  });

  if (testName($("#name").val())) {
    errorBox("#name", "Please enter a name");
    $("#name")
      .focus()
      .on("keydown", function() {
        $(this)
          .css("border-color", "")
          .prop("placeholder", "");
      });
  }

  if (testEmail($("#mail").val()) == false) {
    errorBox("#mail", "Please enter an email");
    if (falseTest("#name")) {
      $("#mail").focus();
    }
    $("#mail").on("keydown", function() {
      $(this)
        .css("border-color", "")
        .prop("placeholder", "");
    });
  }

  // This will test whether the design select field has "Select Theme" selected
  // or not. If it does then an error will show.
  if ($("#design option:selected").val() == "select") {
    $(".color").css("display", "none");
    $("#design").css("border", "2px solid red");
    $(".designtooltip").css("display", "");
    if ($("#name").is(":focus") == false && $("#mail").is(":focus") == false) {
      $("#design").focus();
    }
    $("#design").on("click", function() {
      $(this).css("border", "none");
      $(".designtooltip").css("display", "none");
    });
  }

  if (testCheckbox()) {
    $(".activitytooltip").css("display", "");
    if (falseTest("#name") && falseTest("#mail") && falseTest("#design")) {
      $('input[name="all"]').focus();
    }
    $(".activities input[type='checkbox']").on("click", function() {
      $(".activitytooltip").css("display", "none");
    });
  }

  if (testCreditCard($("#cc-num").val()) == false) {
    if (testName($("#cc-num").val())) {
      $(".creditcardtooltip").text("Credit card cannot be blank");
      $(".creditcardtooltip").css("display", "");
      errorBox("#cc-num", "Please enter a valid credit card");
    } else {
      errorBox("#cc-num", "Please enter a valid credit card");
      $(".creditcardtooltip").css("display", "");
    }
  }

  if (testZipCode($("#zip").val()) == false) {
    if (testName($("#zip").val())) {
      $(".ziptooltip").text("Zip code cannot be blank");
      $(".ziptooltip").css("display", "");
      errorBox("#zip", "Invalid zip");
    } else {
      errorBox("#zip", "Invalid zip");
      $(".ziptooltip").css("display", "");
    }
  }

  if (testCvv($("#cvv").val()) == false) {
    if (testName($("#cvv").val())) {
      $(".cvvtooltip").text("CVV cannot be blank");
      $(".cvvtooltip").css("display", "");
      errorBox("#cvv", "Invalid cvv");
    } else {
      errorBox("#cvv", "Invalid cvv");
      $(".cvvtooltip").css("display", "");
    }
  }

  if(testName($("#other-title").val())){
    errorBox("#other-title", "Please enter a job role");
    $("#other-title")
      .focus()
      .on("keydown", function() {
        $(this)
          .css("border-color", "")
          .prop("placeholder", "");
      });
  }

  if (
    $("#payment option:selected").val() == "paypal" ||
    $("#payment option:selected").val() == "bitcoin"
  ) {
    $(".creditcardtooltip").css("display", "none");
    $(".ziptooltip").css("display", "none");
    $(".cvvtooltip").css("display", "none");
  }

  // This block will reload the page once all required fields are met. This
  // only simulates the submission.
  if (
    testName($("#name").val()) == false &&
    testEmail($("#mail").val()) == true &&
    $(".creditcardtooltip").is(":hidden") &&
    $(".ziptooltip").is(":hidden") &&
    $(".cvvtooltip").is(":hidden") &&
    $(".designtooltip").is(":hidden") &&
    $(".activitytooltip").is(":hidden") &&
    ($("#other-title").is(":hidden") || testName($("#other-title").val()) == false)
  ) {
    location.reload();
  }
});

// Main function will be the first function run. This will hide the tooltips as well
// as the various elements that need to be hidden upon load.
const main = () => {
  $("#other-title").css("display", "none");
  $(".hidden").css("display", "none");
  $("#total").css("width", "25%");
  $("#paypal").css("display", "none");
  $("#bitcoin").css("display", "none");
  $(".color").css("display", "none");
  $(".designtooltip").css("display", "none");
  $(".activitytooltip").css("display", "none");
  $(".creditcardtooltip").css("display", "none");
  $(".ziptooltip").css("display", "none");
  $(".cvvtooltip").css("display", "none");
  createListener(1, 3);
  createListener(3, 1);
  createListener(2, 4);
  createListener(4, 2);
};

main();
