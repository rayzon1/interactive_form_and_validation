const title = $('#title');
const design = $('#design')

// This trigger will show an input box when the other option is selected.
title.on('change', (e) => {
   if(e.target.value === 'other'){
       title.css("display", "none");
       $('#other-title').css("display", "").focus();
   };
});

$('#other-title').css("display", "none");
console.log(design[0]);