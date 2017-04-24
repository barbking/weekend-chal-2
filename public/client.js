$(document).ready(onReady);

  var calcMethod ='';
  var click = 0;


function onReady(){
  console.log('in ready');
  $('.button').on('click',convertInput);
  $('.method').on('click',method);
  $('#equal').on('click',calcFunc);
  $('#clear').on('click',clear);
} //end of onReady func

//on number or method button click, aooend table on dom
function convertInput() {
  input = $(this).text();//get text value from botton or method clicked
  $('.input').append(input);//append text value to tableon dom
}

//on method(math operator) click, only allow one click, return method clicked
function method(){
  click ++;//button click counter
  var input = $(this).text();//get text value from button or method clicked
  $('#method').append(input);//add method symbol to dom
  $('span').toggleClass("input");//toggle class on span so second set of numbers in different span

  if (click === 2) {
    $('#total').text('ERROR: only one operation allowed!');//error if clicked more than once
      $('span').toggleClass("input");//toggle class on span so second set of numbers in different span
      click=0;
  } else if ($(this).data('name')==='add'){
    calcMethod = 'add';
  } else if ($(this).data('name')==='subtract'){
     calcMethod  = 'subtract';
  } else if ($(this).data('name')==='multiply'){
    calcMethod = 'multiply';
  } else {
    calcMethod = 'divide';
  }
return calcMethod;//return math opertor method to use in calcFunc
}

function calcFunc(){
  // convert into number1, method and number2 to send to calculator
  $('#total').text("computing");

  var number1 = $('.number1').text();
  var number2= $('.number2').text();
  // var calcMethod = '';
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
        $('#total').empty();
        $('#total').append('=   ' + res.totalSum);
      }
    });//end of ajax GET
  }//end of getResults func

  //reset dom values/classes if clear button clicked
  function clear (){
    $('.number1, .number2, #method, #total').empty();//clear button empty prev numbers
    $('.number1').addClass("input");//reset numbe1 class
    $('.number2').removeClass("input");//reset number2 class
    click=0;//reset method button counter
  }//end of clear func
