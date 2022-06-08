const start = document.querySelector(".start");
start.addEventListener("click", function () {
  const FULL_DASH_ARRAY = 283;
  const WARNING_THRESHOLD = 10;
  const ALERT_THRESHOLD = 5;

  const COLOR_CODES = {
    info: {
      color: "green",
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD,
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD,
    },
  };

  const btnPause = document.querySelector(".pause");
  const btnResume = document.querySelector(".resume");
  const btnStop = document.querySelector(".stop");
  const userHours = Number(document.querySelector(".hours").value);
  const userMinutes = Number(document.querySelector(".minutes").value);
  const userSeconds = Number(document.querySelector(".seconds").value);
  const result = userHours * 60 + userMinutes + userSeconds / 60;
  let current_time = Date.parse(new Date());

  let deadline = new Date(current_time + result * 60 * 1000);
  let parseDeadline = Date.parse(deadline);
  let parseNewDate = Date.parse(new Date());
  let TIME_LIMIT = (parseDeadline - parseNewDate) / 1000 + 1;

  let timePassed = 0;
  let timeLeft = TIME_LIMIT;
  let remainingPathColor = COLOR_CODES.info.color;

  function time_remaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    return { total: t, hours: hours, minutes: minutes, seconds: seconds };
  }

  document.querySelector(".base-timer").innerHTML = `
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g class="base-timer__circle">
            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path
              id="base-timer-path-remaining"
              stroke-dasharray="283"
              class="base-timer__path-remaining ${remainingPathColor}"
              d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" class="base-timer__label"></span>
      `;
  let timeinterval;

  function stopInterval() {
    clearInterval(timeinterval);
    document.getElementById("base-timer-label").innerHTML = "00:" + "00:00";
    document.getElementById("base-timer-path-remaining").style.color = "gray";
  }
  function run_clock(id, endtime) {
    function updateClock() {
      const t = time_remaining(endtime);
      t.hours = t.hours < 10 ? "0" + t.hours : t.hours;
      t.minutes = t.minutes < 10 ? "0" + t.minutes : t.minutes;
      t.seconds = t.seconds < 10 ? "0" + t.seconds : t.seconds;

      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      // console.log(timeLeft);
      document.getElementById("base-timer-label").innerHTML =
        t.hours + ":" + t.minutes + ":" + t.seconds;
      setCircleDasharray();
      setRemainingPathColor(timeLeft);
      // console.log("Total: " + t.total);
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
    updateClock();
    timeinterval = setInterval(updateClock, 1000);
  }
  run_clock("timer", deadline);

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
      run_clock("timer", deadline);
    }
  }

  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info, basic } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }

  btnStop.addEventListener("click", stopInterval);
  btnPause.addEventListener("click", pauseClock);
  btnResume.addEventListener("click", resumeClock);
});
