const btn1 = document.querySelector(".start");
const btn = document.querySelector("button");



let countdown = () => {
let hours = Number(document.querySelector("#hours").value);
let minutes = Number(document.querySelector("#minutes").value);
let seconds = Number(document.querySelector("#seconds").value);

let result = hours*3600 + minutes*60 + seconds;
  
 let x = setInterval(function () {
 hours = parseInt(result / 3600, 10);
 minutes = parseInt((result/60)-hours*60);
 seconds = parseInt(result % 60, 10);
   // console.log("H: " + hours);
   //console.log(minutes);
   //console.log(seconds);
   hours = hours < 10 ? "0" + hours : hours;
 minutes = minutes < 10 ? "0" + minutes : minutes;
   seconds = seconds < 10 ? "0" + seconds : seconds;
   // if(seconds < 0) {
   //   seconds += 60;
   //  // minutes--;
   // }
   //console.log('h');
     document.querySelector(".display-time-hours").innerHTML = hours + ":";
    document.querySelector(".display-time-minutes").innerHTML = minutes + ":";
    document.querySelector(".display-time").innerHTML = seconds;
    //console.log("Cały wynik: " + result--); 
     if (--result < 0) {
            clearInterval(x);
        }
   
   
   //console.log(seconds--);

   // if(result % 60 == 0) {
   //  document.querySelector(".display-time-minutes").innerHTML = "<p>" + minutes-- + " min</p>";
   // } else {
   //    document.querySelector(".display-time-minutes").innerHTML = "<p>" + minutes + " min</p>";
   //    document.querySelector(".display-time").innerHTML = "<p>" + seconds--  + " sec</p>";
   // }
  
  //  if(minutess < 0) {
  //    console.log("To koniec");
  //    clearInterval(x);
  //  }
  //  else {
  //    if(minutess % 60 == 0){
  //    document.querySelector(".display-time-minutes").innerHTML = "<p>" + minutes-- + " min</p>";
  //    console.log("tez");
  //  }
  //    console.log(minutess--);
  // }
  //  if(seconds < 0){
  //    //clearInterval(x);
  //  } else {
  //  document.querySelector(".display-time").innerHTML = "<p>" + seconds--  + " sec</p>";
  //   }
    
     

  }, 1000);

}
btn1.addEventListener('click', countdown);

