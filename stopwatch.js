let timer;
let running = false;
let startTime = 0;
let lapTime = 0;

function startStopTimer() {
    if (running) {
        stopTimer();
    } else {
        startTimer();
    }
}

function lapResetTimer() {
    if (running) {
        lapTimer();
    } else {
        resetTimer();
    }
}

function startTimer() {
    startTime = Date.now() - (lapTime ? lapTime : 0);
    timer = setInterval(updateDisplay, 10);
    running = true;
    document.getElementById('startStop').textContent = 'Stop';
    document.getElementById('lapReset').textContent = 'Lap';
}

function stopTimer() {
    clearInterval(timer);
    running = false;
    document.getElementById('startStop').textContent = 'Start';
    document.getElementById('lapReset').textContent = 'Reset';
}

function lapTimer() {
    if (running) {
        lapTime = Date.now() - startTime;
        let lapDisplay = document.createElement('div');
        lapDisplay.classList.add('lap-display'); // Add a class for lap displays
        lapDisplay.textContent = formatTime(lapTime);
        document.body.appendChild(lapDisplay);
    }
}

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



function formatTime(time) {
    let date = new Date(time);
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = (date.getUTCMilliseconds() / 10).toFixed(0).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

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
