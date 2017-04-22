//calculater function

function calculator (number1, number2, method){
  var calcResult = '';
  if (method === 'add'){
    calcResult = parseInt(number1) + parseInt(number2);
    console.log(calcResult);
    return calcResult;
  } else if (method==='subtract') {
    calcResult = parseInt(number1) - parseInt(number2);
    console.log(calcResult);
    return calcResult;
  } else if(method==='multiply'){
    calcResult = parseInt(number1) * parseInt(number2);
    console.log(calcResult);
    return calcResult;
  } else {
    calcResult = parseInt(number1) / parseInt(number2);
    console.log(calcResult);
    return calcResult;
  }
}

//export calculator function for server to use
module.exports = calculator;
