const title = $("#title");
const design = $("#design");
const color = $("#color");
const activities = $(".activities");
var total = 0;


// This trigger will show an input box when the other option is selected.
title.on("change", e => {
  if (e.target.value === "other") {
    title.css("display", "none");
    $("#other-title")
      .css("display", "")
      .focus();
  }
});


const removeAttribute = (element, attr) => {
  return $(element).removeAttr(attr);
};

const addAttribute = (element, type, attr) => {
  return $(element).prop(type, attr);
};

const falseTest = (element) => {
    return $(element).is(":focus") == false;
}

const errorBox = (element, property) => {
    $(element).css("border-color", "red");
    $(element).prop("placeholder", property);
}

const testName = (name) => {
    const regex = /^$/;
    return regex.test(name);
}

const testEmail = (email) => {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
}

const testCheckbox = () => {
    let checked = [];
    let unchecked = [];
    $('.activities input[type="checkbox"]').each(function(){
        $(this).is(":checked") ? checked.push($(this)) : unchecked.push($(this));
    });
     return checked.length < 1 ? true : false;
}

const testCreditCard = (value) => {
    const regex = /^([0-9]{13}|[0-9]{16})$/;
    return regex.test(value);
}

const testZipCode = (value) => {
   const regex = /^[0-9]{5}$/;
   return regex.test(value);
}

const testCvv = (value) => {
   const regex = /^[0-9]{3}$/;
   return regex.test(value);
}

// This is the event listener for the design select element. Depending on selection
// color will change accordingly.
design.on("change", e => {
  if (e.target.value === "js puns") {
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
  } else if (e.target.value === "heart js") {
    $(".color").css("display", "");
    addAttribute('#color option[value="tomato"]', "selected", "selected");
    $("#color option").each(function(i) {
      i >= 3 ? (this.style.display = "") : (this.style.display = "none");
    });
  } else if (e.target.value === "Select Theme") {
    $(".color").css("display", "none");
    removeAttribute('#color option[selected="selected"]', "selected");
    addAttribute(
      '#color option[value="cornflowerblue"]',
      "selected",
      "selected"
    );

    $("#color option").each(function(i) {
      this.style.display = "";
    });
  }
});

const createListener = function(index_1, index_2, index_3) {
  $(".activities input")
    .eq(index_1)
    .change(function() {
      if ($(this).prop("checked") == true) {
        $(".activities input")
          .eq(index_2)
          .prop("disabled", "disabled");
        $(".activities input")
          .eq(index_3)
          .prop("disabled", "disabled");
        $(".activities label")
          .eq(index_2)
          .css("text-decoration", "line-through");
        $(".activities label")
          .eq(index_3)
          .css("text-decoration", "line-through");
      } else {
        $(".activities input")
          .eq(index_2)
          .removeAttr("disabled");
        $(".activities input")
          .eq(index_3)
          .removeAttr("disabled");
        $(".activities label")
          .eq(index_2)
          .css("text-decoration", "");
        $(".activities label")
          .eq(index_3)
          .css("text-decoration", "");
      }
    });
};


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


// Event-listener for the payment information selections.
$("#payment").on("change", function(e) {
    if($(this).val() == "paypal"){
        $(".creditcardtooltip").css("display", "none");
        $(".ziptooltip").css("display", "none");
        $(".cvvtooltip").css("display", "none");
        $("#credit-card").css("display", "none");
        $("#bitcoin").css("display", "none");
        $("#paypal").css("display", "");
    } else if($(this).val() == "bitcoin"){
        $(".creditcardtooltip").css("display", "none");
        $(".ziptooltip").css("display", "none");
        $(".cvvtooltip").css("display", "none");
        $("#credit-card").css("display", "none");
        $("#paypal").css("display", "none");
        $("#bitcoin").css("display", "");
    } else {
        $("#paypal").css("display", "none");
        $("#bitcoin").css("display", "none");
        $("#credit-card").css("display", "");
    };
});

$("#mail").on("keyup", function(){
    if(testEmail($("#mail").val())){
        $(this).css("border-color", "");
        $(this).prop("placeholder", "");
    } else {
        errorBox("#mail", "Invalid email");
    }
});

// Submit listener will check for incomplete fields.
$("form").on("submit", function(event){
   event.preventDefault();

   if(testName($("#name").val())){
        errorBox("#name", "Please enter a name");
        $("#name").focus();
        $("#name").on("keydown", function(){
            $(this).css("border-color", "");
            $(this).prop("placeholder", "");
        });
   }

   if (testEmail($("#mail").val()) == false){
        errorBox("#mail", "Please enter an email");
        if(falseTest("#name")){
            $("#mail").focus();
        }
        $("#mail").on("keyup", function(){
            $(this).css("border-color", "");
            $(this).prop("placeholder", "");
        })                
   }
   
   
   if($("#design option:selected").val()=="Select Theme"){
       $("#design").css("border", "2px solid red");
       $(".designtooltip").css("display", "");
       if($("#name").is(":focus") == false && $("#mail").is(":focus") == false){
            $('#design').focus();
        }
        $("#design").on("click", function(){
            $(this).css("border", "none");
            $(".designtooltip").css("display", "none");
        })
   };
   
   if(testCheckbox()){
        $(".activitytooltip").css("display", "");
       if(falseTest("#name") && falseTest("#mail") && falseTest("#design")){
            $('input[name="all"]').focus();
       }
       $(".activities input[type='checkbox']").on("click", function(){
            $(".activitytooltip").css("display", "none");
       })
   }

   // Function testCreditCard will verify if cc number is between 13-16 digits.
   // Tooltip and error box will disappear once required amount of digits are entered.
   if(testCreditCard($("#cc-num").val()) == false){
        errorBox("#cc-num", "Please enter a valid credit card");
        $(".creditcardtooltip").css("display", "");
        $("#cc-num").on("keyup", function(){
            if(testCreditCard($("#cc-num").val())){
                $(".creditcardtooltip").css("display", "none");
                $(this).css("border-color", "");
                $(this).prop("placeholder", "");
            } else {
                $(".creditcardtooltip").css("display", "");
                errorBox("#cc-num", "Please enter a valid credit card");
            }
            
        }) 
   }

   // Same as testCreditCard except this will test for 5-digit zipcode.
   if(testZipCode($("#zip").val()) == false){
       errorBox("#zip", "Invalid zip");
       $(".ziptooltip").css("display", "");
       $("#zip").on("keyup", function () {
            if(testZipCode($("#zip").val())){
                $(".ziptooltip").css("display", "none");
                $(this).css("border-color", "");
                $(this).prop("placeholder", "");
            } else {
                $(".ziptooltip").css("display", "");
                errorBox("#zip", "Invalid zip");
            }
        })
   }

   if(testCvv($("#cvv").val()) == false){
    errorBox("#cvv", "Invalid cvv");
    $(".cvvtooltip").css("display", "");
    $("#cvv").on("keyup", function () {
            if(testCvv($("#cvv").val())){
                $(".cvvtooltip").css("display", "none");
                $(this).css("border-color", "");
                $(this).prop("placeholder", "");
            } else {
                $(".cvvtooltip").css("display", "");
                errorBox("#cvv", "Invalid cvv");
             }
        })
    }

    if($("#payment option:selected").val() == "paypal" || $("#payment option:selected").val() == "bitcoin"){
        $(".creditcardtooltip").css("display", "none");
        $(".ziptooltip").css("display", "none");
        $(".cvvtooltip").css("display", "none");
    } 
   
})

const main = () =>{
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
    createListener(1, 3, 5);
    createListener(3, 1, 5);
    createListener(5, 1, 3);
    createListener(2, 4, 6);
    createListener(4, 2, 6);
    createListener(6, 2, 4);
};

main();
