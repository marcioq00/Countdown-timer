const start = document.querySelector(".start");
start.addEventListener("click", function () {
  const btnPause = document.querySelector(".pause");
  const btnResume = document.querySelector(".resume");
  const btnStop = document.querySelector(".stop");
  const userHours = Number(document.querySelector(".hours").value);
  const userMinutes = Number(document.querySelector(".minutes").value);
  const userSeconds = Number(document.querySelector(".seconds").value);
  let result = userHours * 60 + userMinutes + userSeconds / 60;
  let current_time = Date.parse(new Date());
  let deadline = new Date(current_time + result * 60 * 1000);

  function time_remaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    return { total: t, hours: hours, minutes: minutes, seconds: seconds };
  }

  let timeinterval;
  function run_clock(id, endtime) {
    function update_clock() {
      const t = time_remaining(endtime);
      t.hours = t.hours < 10 ? "0" + t.hours : t.hours;
      t.minutes = t.minutes < 10 ? "0" + t.minutes : t.minutes;
      t.seconds = t.seconds < 10 ? "0" + t.seconds : t.seconds;
      document.querySelector(".display-time-hours").innerHTML = t.hours + ":";
      document.querySelector(".display-time-minutes").innerHTML = t.minutes + ":";
      document.querySelector(".display-time").innerHTML = t.seconds;
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
    update_clock();
    timeinterval = setInterval(update_clock, 1000);
  }
  run_clock("timer", deadline);
 

  function stopInterval() {
    clearInterval(timeinterval);
    document.querySelector(".display-time-hours").innerHTML = "00 ";
    document.querySelector(".display-time-minutes").innerHTML = ": 00";
    document.querySelector(".display-time").innerHTML = ": 00";
  }

  let paused = false;
  let time_left;

  function pauseClock() {
    if (!paused) {
      paused = true;
      clearInterval(timeinterval);
      time_left = time_remaining(deadline).total;
    }
  }

  function resumeClock() {
    if (paused) {
      paused = false;
      // update the deadline to preserve the amount of time remaining
      deadline = new Date(Date.parse(new Date()) + time_left);
      // start the clock
      run_clock("timer", deadline);
    }
  }
  btnStop.addEventListener("click", stopInterval);
  btnPause.addEventListener("click", pauseClock);
  btnResume.addEventListener("click", resumeClock);
});



// const btnStart = document.querySelector(".start");
// const btnStop = document.querySelector(".stop");

// let countdown = () => {
//   let hours = Number(document.querySelector("#hours").value);
//   let minutes = Number(document.querySelector("#minutes").value);
//   let seconds = Number(document.querySelector("#seconds").value);

//   let result = hours * 3600 + minutes * 60 + seconds;

//   let x = setInterval(function () {
//     hours = parseInt(result / 3600, 10);
//     minutes = parseInt(result / 60 - hours * 60);
//     seconds = parseInt(result % 60, 10);
//     hours = hours < 10 ? "0" + hours : hours;
//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;

//     document.querySelector(".display-time-hours").innerHTML = hours + ":";
//     document.querySelector(".display-time-minutes").innerHTML = minutes + ":";
//     document.querySelector(".display-time").innerHTML = seconds;

//     if (--result < 0) {
//       clearInterval(x);
//     }
//     btnStop.addEventListener("click", function () {
//       clearInterval(x);
//     });
//   }, 1000);
// };

// btnStart.addEventListener("click", countdown);