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


design.on('change', (e) => {
    if(e.target.value === 'js puns'){
        $('#color option[selected="selected"]').removeAttr('selected')
        color[0][0].setAttribute('selected', 'selected');
        for (let i = 0; i < color[0].length; i ++){
            i <= 2 ? color[0][i].style.display = '' : color[0][i].style.display = 'none';
        }
    } else if(e.target.value === 'heart js'){
        $('#color option[value="tomato"]').attr('selected', 'selected');
        for (let i = 0; i < color[0].length; i ++){
            i >= 3 ? color[0][i].style.display = '' : color[0][i].style.display = 'none';
        }
    }
    
    console.log(e.target.value)
})



