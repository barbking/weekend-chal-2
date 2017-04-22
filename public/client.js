$(document).ready(onReady);

function onReady(){
  console.log('in ready');
  $('#add').on('click',calcFunc);
  $('#subtract').on('click',calcFunc);
  $('#multiply').on('click',calcFunc);
  $('#divide').on('click',calcFunc);
} //end of onReady func

//get input values and button click values
function calcFunc(){
  console.log('in calcFunc');
  var number1 = $('#number1').val();
  var number2= $('#number2').val();
  var calcMethod = '';
  console.log('number1=',number1, 'number2=',number2, 'calcMethod=','calcMethod');

  if ($(this).data('name')==='add'){
      calcMethod = 'add';
    } else if ($(this).data('name')==='subtract'){
       calcMethod  = 'subtract';
    } else if ($(this).data('name')==='multiply'){
      calcMethod = 'multiply';
    } else {
      calcMethod = 'divide';
    }
  console.log('calcMethod after loop:',calcMethod);

  var sendInputData = {
    x: number1,
    y: number2,
    type: calcMethod
  };
  console.log(sendInputData);
  //send to server as object
  $.ajax({
    url: '/dataToCalc',
    method: 'POST',
    data: sendInputData,
    success: function(response){
      console.log('success');
      getResults();
    }
  });//end of ajax
  // getResults();
}//end of calcFunc func

  function getResults(){
    //get calcResult
    console.log('in getResults func');
    $.ajax({
      url: '/results',
      method: 'GET',
      success: function(res){
        console.log('sucess');
        console.log( 'back from serv with:', res.totalSum);
        $('.results').empty();
        $('.results').append('TOTAL = '+res.totalSum);
      }
    });//end of ajax GET
  }//end of getResults func
