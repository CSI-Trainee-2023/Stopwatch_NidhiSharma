let timerInterval;
let isRunning = false;
let lapCounter = 1;

const timerElement = document.querySelector('.timer');
const toggleButton = document.querySelector('.toggle');
const lapButton = document.querySelector('.lap');
const resetButton = document.querySelector('.reset');
const lapList = document.querySelector('.lapList');

function toggle() {
    if (isRunning) {
        clearInterval(timerInterval);
        startStopButton.textContent = 'Start';
        startStopButton.classList.remove('stop');
    } else {
        timerInterval = setInterval(updateTimer, 10);
        toggleButton.textContent = 'Stop';
        toggleButton.classList.add('stop');
    }
    isRunning = !isRunning;
}

function updateTimer() {
    const currentTime = timerElement.textContent.split(/[:.]+/).map(Number);
    const totalMilliseconds = (currentTime[0] * 60 + currentTime[1]) * 1000 + currentTime[2] + 10;
    const minutes = Math.floor(totalMilliseconds / (60 * 1000));
    const seconds = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);
    const milliseconds = totalMilliseconds % 1000;
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function lap() {
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${lapCounter++}: ${timerElement.textContent}`;
    lapList.appendChild(lapTime);
}

function reset() {
    clearInterval(timerInterval);
    timerElement.textContent = '00:00.000';
    toggleButton.textContent = 'Start';
    toggleButton.classList.remove('stop');
    isRunning = false;
    lapCounter = 1;
    lapList.innerHTML = '';
}

toggleButton.addEventListener('click', toggle);
lapButton.addEventListener('click', lap);
resetButton.addEventListener('click', reset);


// x is for start/stop
// c is for reset
// l is for lap

function handleKeyPress(event) {
    if (event.ctrlKey) {
        if (event.key === 'x') {
            toggle();
        } else if (event.key === 'c') {
            reset();
        } else if (event.key === 'l') {
            lap();
        }
    }
}

document.addEventListener('keydown', handleKeyPress);
