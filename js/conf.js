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

// This is the event listener for the design select element. Depending on selection
// color will change accordingly.
design.on("change", e => {
  if (e.target.value === "js puns") {
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
    addAttribute('#color option[value="tomato"]', "selected", "selected");
    $("#color option").each(function(i) {
      i >= 3 ? (this.style.display = "") : (this.style.display = "none");
    });
  } else if (e.target.value === "Select Theme") {
    removeAttribute('#color option[selected="selected"]', "selected");
    addAttribute(
      '#color option[value="cornflowerblue"]',
      "selected",
      "selected"
    );

    // *Test this further for use with color event listener *
    // $('#design option').first().attr("selected", "selected");

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
        $("#credit-card").css("display", "none");
        $("#bitcoin").css("display", "none");
        $("#paypal").css("display", "");
    } else if($(this).val() == "bitcoin"){
        $("#credit-card").css("display", "none");
        $("#paypal").css("display", "none");
        $("#bitcoin").css("display", "");
    } else {
        $("#paypal").css("display", "none");
        $("#bitcoin").css("display", "none");
        $("#credit-card").css("display", "");
    };
});

// Submit listener will check for incomplete fields.
$("form").on("submit", function(event){
   event.preventDefault();

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
        if($("#name").is(":focus") == false){
            $("#mail").focus();
        }
        $("#mail").on("keydown", function(){
            $(this).css("border-color", "");
            $(this).prop("placeholder", "");
        })                
   }

   if(testCheckbox()){
    // Add tooltip
       if($("#name").is(":focus") == false && $("#mail").is(":focus") == false){
            $('input[name="all"]').focus();
       }
       $('.activities input[type="checkbox"]').on("click", function(){
            $(".activities legend").css("border", "none")
            // Remove tooltip
       })
   }
   
   if($("#design option:selected").val()=="Select Theme"){
       console.log('success');
   }

})

const main = () =>{
    $("#other-title").css("display", "none");
    $(".hidden").css("display", "none");
    $("#total").css("width", "25%");
    $("#paypal").css("display", "none");
    $("#bitcoin").css("display", "none");
    $(".color").css("display", "none")
    createListener(1, 3, 5);
    createListener(3, 1, 5);
    createListener(5, 1, 3);
    createListener(2, 4, 6);
    createListener(4, 2, 6);
    createListener(6, 2, 4);



};

main();
