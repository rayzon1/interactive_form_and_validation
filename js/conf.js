const title = $('#title');
const design = $('#design');
const color = $('#color');

// This trigger will show an input box when the other option is selected.
title.on('change', (e) => {
   if(e.target.value === 'other'){
       title.css("display", "none");
       $('#other-title').css("display", "").focus();
   };
});

$('#other-title').css("display", "none");

// if js puns
    // hide last three
// else if js love
    // hide top three

// for(let i = 0; i < design[0].length; i ++){

// }

design.on('change', (e) => {
    if(e.target.value === 'js puns'){
        console.log('fuck')
    }
    //console.log(e.target.value);
})

for (let i = 0; i < color[0].length; i ++){
    i <= 3 ? console.log(color[0][i]) : console.log('fail');
}

console.log(color[0].length)