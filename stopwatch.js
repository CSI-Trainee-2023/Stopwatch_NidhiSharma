let timer;
let running = false;
let startTime = 0;
let lapTime = 0;

// Load data from local storage
if (localStorage.getItem('timerState')) {
    const savedData = JSON.parse(localStorage.getItem('timerState'));
    running = savedData.running;
    startTime = savedData.startTime;
    lapTime = savedData.lapTime;
}

function saveTimerState() {
    const timerState = {
        running,
        startTime,
        lapTime
    };
    localStorage.setItem('timerState', JSON.stringify(timerState));
}

// making one button of start resume and stop
function startStopTimer() {
    if(running) {
        stopTimer();
        document.getElementById('startStop').textContent = 'Resume';
    }else{
        startTimer();
        document.getElementById('startStop').textContent = 'Stop';
    }
    // Save data to local storage
    saveTimerState();

}
// making one button of lap and reset

function lapResetTimer() {
    if (running) {
        lapTimer();
    } else {
        resetTimer();
    }
    // Save data to local storage
    saveTimerState();

}

// start timer working
function startTimer() {
    startTime = Date.now() - (lapTime ? lapTime : 0);
    timer = setInterval(updateDisplay, 10);
    running = true;
    document.getElementById('startStop').textContent = 'Stop';
    document.getElementById('lapReset').textContent = 'Lap';
}
// stiop timer working
function stopTimer() {
    clearInterval(timer);
    running = false;
    document.getElementById('startStop').textContent = 'Start';
    document.getElementById('lapReset').textContent = 'Reset';
}
//lap button working
function lapTimer() {
    if (running) {
        lapTime = Date.now() - startTime;
        let lapDisplay = document.createElement('div');
        lapDisplay.classList.add('lap-display'); // Add a class for lap displays
        lapDisplay.textContent = formatTime(lapTime);
        document.body.appendChild(lapDisplay);
    }
}
// reset button working
function resetTimer() {
    stopTimer();
    startTime = 0;
    lapTime = 0;
    document.querySelector('.stopwatch').textContent = '00:00:00.00'; // Update display
    let lapDisplays = document.querySelectorAll('.lap-display');
    lapDisplays.forEach(display => display.remove());
}




function updateDisplay() {
    let currentTime = Date.now() - startTime;
    let formattedTime = formatTime(currentTime);
    document.querySelector('.stopwatch').textContent = formattedTime;
}

//format time that is HH:MM:SS.milli

function formatTime(time) {
    let date = new Date(time);
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = (date.getUTCMilliseconds() / 10).toFixed(0).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// adding event listener

document.getElementById('startStop').addEventListener('click', startStopTimer);
document.getElementById('lapReset').addEventListener('click', lapResetTimer);


// x is for start/stop
// c is for lap/reset

function handleKeyPress(event) {
    if (event.ctrlKey) {
        if (event.key === 'x') {
            startStopTimer();
        } else if (event.key === 'c') {
            lapResetTimer();
        } 
    }
}

document.addEventListener('keydown', handleKeyPress);
