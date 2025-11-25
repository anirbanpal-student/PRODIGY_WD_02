let startTime;
let elapsedTime = 0;
let timerInterval; 
let isRunning = false;
let lapCounter = 0;
const displayElement = document.getElementById('dis');
const controlDiv = document.getElementById('control');
const startStopBtn = document.querySelector('#control button:nth-child(1)'); 
let lapBtn;
let resetBtn; 
let lapList;

function formatTime(ms) {
    let milliseconds = String(Math.floor(ms / 10)).slice(-2).padStart(2, '0');
    let totalSeconds = Math.floor(ms / 1000);
    let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    let seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function printTime() {
    try {
        if (isRunning) {
            elapsedTime = Date.now() - startTime;
        }
        displayElement.textContent = formatTime(elapsedTime);
    } catch (e) {
        console.error("Error updating time display:", e);
    }
}

function start() {
    try {
        if (isRunning) return; 
        isRunning = true;
        startTime = Date.now() - elapsedTime; 
        timerInterval = setInterval(printTime, 10); 
        
        startStopBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        startStopBtn.classList.remove('start-btn');
        startStopBtn.classList.add('stop-btn'); 
        
        lapBtn.innerHTML = 'Lap';
        lapBtn.style.display = 'inline-block'; 
        
        resetBtn.style.display = 'none'; 

        if (elapsedTime === 0) {
             lapBtn.innerHTML = 'Lap';
            lapBtn.classList.remove('reset-btn');
            lapBtn.classList.add('lap-btn');
        } 

        lapBtn.style.display = 'inline-block'; 
        startStopBtn.style.display = 'inline-block';
        resetBtn.style.display = 'inline-block';        
    } catch (e) {
        console.error("Error starting the stopwatch:", e);
    }
}

function pause() {
    try {
        if (!isRunning) return;
        isRunning = false;
        clearInterval(timerInterval);

        startStopBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        startStopBtn.classList.remove('stop-btn');
        startStopBtn.classList.add('start-btn');
        lapBtn.style.display = 'none'; 
        resetBtn.style.display = 'inline-block'; 
    } catch (e) {
        console.error("Error pausing the stopwatch:", e);
    }
}

function reset() {
    try {
        if (isRunning) {
            pause();
        } 
        elapsedTime = 0;
        lapCounter = 0;
        printTime(); 
        lapList.innerHTML = ''; 
        startStopBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        lapBtn.style.display = 'none'; 
        resetBtn.style.display = 'none';
    } catch (e) {
        console.error("Error resetting the stopwatch:", e);
    }
}

function recordLap() {
    try {
        if (!isRunning) return; 
        lapCounter++;
        const lapTime = formatTime(elapsedTime);
        
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
            <div class="lap-detail">Lap ${String(lapCounter).padStart(2, '0')} --> ${lapTime}</div>`;
        lapList.prepend(lapItem);
        
    } catch (e) {
        console.error("Error recording lap time:", e);
    }
}

function handleStartStop() {
    if (isRunning) {
        pause();
    } else {
        start();
    }
}
function handleLap() {
    if (isRunning) {
        recordLap(); 
    }
}
function handleReset() {
    if (elapsedTime > 0) {
        reset(); 
    }
}

function initStopwatch() {
    try {
        lapBtn = document.createElement('button');
        lapBtn.innerHTML = 'Lap';
        lapBtn.classList.add('secondary-btn', 'lap-btn');
        lapBtn.style.display = 'none';
        controlDiv.prepend(lapBtn); 

        resetBtn = document.createElement('button');
        resetBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
        resetBtn.classList.add('secondary-btn', 'reset-btn');
        resetBtn.style.display = 'none'; 
        controlDiv.append(resetBtn);

        lapList = document.createElement('ul');
        lapList.id = 'lap-list';
        lapList.className = 'lap-list';
        const watchElement = document.getElementById('watch'); 
        if (watchElement) {
             watchElement.after(lapList);
        } else {
             document.body.append(lapList); 
        }

        startStopBtn.classList.add('start-btn');
        startStopBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; 

        startStopBtn.addEventListener('click', handleStartStop);
        lapBtn.addEventListener('click', handleLap); 
        resetBtn.addEventListener('click', handleReset);
        printTime(); 
        
    } catch (e) {
        console.error("Initialization failed:", e);
    }
}
document.addEventListener('DOMContentLoaded', initStopwatch);