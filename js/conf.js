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

// Put this in main function. This hides the other-title input upon load.
$('#other-title').css("display", "none");

// This is the event listener for the design select element. Depending on selection
// color will change accordingly.
design.on('change', (e) => {
    if(e.target.value === 'js puns'){
        $('#color option[selected="selected"]').removeAttr('selected');
        $('#color option[value="cornflowerblue"]').attr('selected', 'selected');
        $('#color option').each(function(i){
            i <= 2 ? this.style.display = '' : this.style.display = 'none';
        })
    } else if(e.target.value === 'heart js'){
        $('#color option[value="tomato"]').attr('selected', 'selected');
        for (let i = 0; i < color[0].length; i ++){
            i >= 3 ? color[0][i].style.display = '' : color[0][i].style.display = 'none';
        }
    } else if(e.target.value === 'Select Theme') {
        for(let i = 0; i < color[0].length; i ++){
            color[0][i].style.display = '';
        }
    }
    
})



