const timer = document.getElementById("timer");
const startButton = document.getElementById("startTimerButton");
const stopButton = document.getElementById("stopTimerButton");
const resetButton = document.getElementById("resetTimerButton");
const timerPomodoro = document.getElementById("btnTypePomodoro");
const timerShortBreak = document.getElementById("btnTypeShortBreak");

let breakMinutes = 4;
let breakSeconds = 60;
let pomdoroMinutes = 24;
let pomodoroSeconds = 60;

let pomodoro;
let shortBreak;

let current = "Pomodoro";

let breakCounts = 0;

function appendZero(number) {
    return number <= 9 ? number = `0${number}` : number;
}

function switchBtnCurrentTimer(currentTimer) {
    switch (currentTimer) {
        case "Pomodoro":
            timerPomodoro.classList.add("current");
            timerShortBreak.classList.remove("current");
            break;
        case "Break":
            timerShortBreak.classList.add("current");
            timerPomodoro.classList.remove("current");
            break;
    }
}

function switchCurrentTimer() {
    if (breakCounts % 2 === 0) {
        current = "Pomodoro";
    } else {
        current = "Break"
    }
}

function updateDisplay(current) {
    if (current === "Pomodoro") {
        timer.innerText = "25:00";
    } else {
        timer.innerText = "05:00";
    }
}

function startPomodoroCount() {
    current = "Pomodoro";
    switchBtnCurrentTimer(current);

    function timerInitialization() {

        pomodoroSeconds--;

        timer.innerText = `${appendZero(pomdoroMinutes)}:${appendZero(pomodoroSeconds)}`

        if (pomodoroSeconds === 0 && pomdoroMinutes > 0) {
            pomdoroMinutes--;
            pomodoroSeconds = 60;
        }

        if (pomodoroSeconds === 0 && pomdoroMinutes === 0) {
            breakCounts++;
            pomdoroMinutes = 24;
            pomodoroSeconds = 60;

            switchCurrentTimer();
            switchBtnCurrentTimer(current);
            clearInterval(pomodoro);

            updateDisplay(current);
        }

        console.log("Minutes: " + pomdoroMinutes, "Seconds: " + pomodoroSeconds);
    }

    pomodoro = setInterval(timerInitialization, 1000);
}

function startBreakCount() {
    function breakInitialization() {
        breakSeconds--;

        timer.innerText = `${appendZero(breakMinutes)}:${appendZero(breakSeconds)}`

        if (breakSeconds === 0 && breakMinutes > 0) {
            breakMinutes--;
            breakSeconds = 60;
        }

        if (breakSeconds === 0 && breakMinutes === 0) {
            breakCounts++;
            breakMinutes = 4;
            breakSeconds = 60;

            switchCurrentTimer();
            switchBtnCurrentTimer(current);
            clearInterval(shortBreak);

            updateDisplay(current);
        }

        console.log("Minutes: " + breakMinutes, "Seconds: " + breakSeconds);
    }

    shortBreak = setInterval(breakInitialization, 1000);
}

function stopCounters() {
    if (current === "Pomodoro") {
        clearInterval(pomodoro);
    } else {
        clearInterval(shortBreak);
    }
}

function resetCounters() {
    if (current === "Pomodoro") {
        pomdoroMinutes = 24;
        pomodoroSeconds = 60;
        clearInterval(pomodoro);
        updateDisplay(current);
    } else {
        breakMinutes = 4;
        breakSeconds = 60;
        clearInterval(shortBreak);
        updateDisplay(current);
    }
}

startButton.addEventListener("click", () => {
    if (current === "Pomodoro") {
        startPomodoroCount();
    } else {
        startBreakCount();
    }
})

stopButton.addEventListener("click", stopCounters);

resetButton.addEventListener("click", resetCounters);