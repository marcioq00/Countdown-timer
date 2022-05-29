const btn1 = document.querySelector(".start");
const btn = document.querySelector("button");


const hours = document.querySelector("#hours").value;
let countdown = () => {
let minutes = Number(document.querySelector("#minutes").value);
let seconds = document.querySelector("#seconds").value;
  let minutess = minutes * 60;
  console.log(minutess);
//console.log(seconds);
 let x = setInterval(function () {
     
   
   // if(minutess == 0) {
   //   console.log("To koniec");
   //   clearInterval(x);
   // }
   // else {
   //   document.querySelector(".display.time").innerHTML = minutess--;
   // }
   if(seconds < 0){
     clearInterval(x);
   } else {
   document.querySelector(".display-time").innerHTML = seconds--;
    }
    
     
btn.addEventListener('click',function(){
  clearInterval(x);
});
  }, 1000);
}

btn1.addEventListener('click', countdown);

