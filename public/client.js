$(document).ready(onReady);

  var calcMethod ='';


function onReady(){
  console.log('in ready');
  $('.button').on('click',convertInput);
  $('.method').on('click',method);
  // $('#add').on('click',stringToNum);
  // $('#subtract').on('click',stringToNum);
  // $('#multiply').on('click',stringToNum);
  // $('#divide').on('click',stringToNum);
  $('#equal').on('click',calcFunc);
  $('#clear').on('click',clear);
  //


} //end of onReady func



//on number or method button click, create string of numbers/method in html #input
function convertInput() {
  input = $(this).text();//get text value from botton or method clicked
  $('.input').append(input);//append text value to #input on dom
  // number2 = $('.input').text();
  // // var numString = $('#input').text();//grab final numbers/method in #input
  // return number2;//return string to send to stringToNum func
}

function method(){
  var input = $(this).text();//get text value from botton or method clicked
  $('#method').append(input);//add method symbol to dom
  $('span').toggleClass("input");//toggle class on span so second set of numbers are different


  if ($(this).data('name')==='add'){
      calcMethod = 'add';
    } else if ($(this).data('name')==='subtract'){
       calcMethod  = 'subtract';
    } else if ($(this).data('name')==='multiply'){
      calcMethod = 'multiply';
    } else {
      calcMethod = 'divide';
    }

  return calcMethod;

}

function calcFunc(){
  // convert into number1, method and number2 to send to calculator

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
        $('#total').append(' = ' + res.totalSum);
      }
    });//end of ajax GET
  }//end of getResults func

  function clear (){
    $('.number1, .number2, #method, #total').empty();

  }
