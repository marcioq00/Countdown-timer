const btnStart = document.querySelector(".start");
const btnStop = document.querySelector(".stop");

let countdown = () => {
  let hours = Number(document.querySelector("#hours").value);
  let minutes = Number(document.querySelector("#minutes").value);
  let seconds = Number(document.querySelector("#seconds").value);

  let result = hours * 3600 + minutes * 60 + seconds;

  let x = setInterval(function () {
    hours = parseInt(result / 3600, 10);
    minutes = parseInt(result / 60 - hours * 60);
    seconds = parseInt(result % 60, 10);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.querySelector(".display-time-hours").innerHTML = hours + ":";
    document.querySelector(".display-time-minutes").innerHTML = minutes + ":";
    document.querySelector(".display-time").innerHTML = seconds;

    if (--result < 0) {
      clearInterval(x);
    }
    btnStop.addEventListener("click", function () {
      clearInterval(x);
    });
  }, 1000);
};

btnStart.addEventListener("click", countdown);
