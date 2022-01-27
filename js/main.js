const audio = new Audio();
const audioLofi = document.querySelector('#audio');
const audioRock = document.querySelector('#audio2');
const alarmSound = new Audio('../music/Alarm.mp3');
// DOM buttons and clock
const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const workAndBreakButtons = Array.from(document.getElementsByClassName('timer-option'));
const clockFace = document.querySelector('#time');
const secondsElem = document.querySelector('#seconds');
const minutesElem = document.querySelector('#minutes');

let minutes = document.querySelector('#minutes');
let seconds = document.querySelector('#seconds');
let minReal = 0;
let secReal = 0;
let progressStart = 0;
let progressEnd = calcProgressEnd(minutes.innerHTML, seconds.innerHTML);
let isRunning = false;
let progressName;

function displayTime() {
	minReal = Math.floor((progressEnd - progressStart) / 60);
	secReal = Math.floor((progressEnd - progressStart) % 60);

	minutesElem.innerHTML = minReal.toString().length == 2 ? minReal : `0${minReal}`;
	secondsElem.innerHTML = secReal.toString().length == 2 ? secReal : `0${secReal}`;

	document.title = `${minReal}:${secReal}`;
}


function startTimer() {
	progressName = setInterval(() => {
		progressStart++;
		displayTime();
		if (progressStart >= progressEnd) {
			alarmSound.play();
			clearInterval(progressName);
			isRunning = false;
			displayTime();
			progressStart = 0;
		}
	}, 1000);
}

function playOrStop(e) {
	if (isRunning && e.target.innerHTML === 'Stop') {
		clearInterval(progressName);
		isRunning = false;
	} else if (!isRunning && e.target.innerHTML !== 'Stop') {
		minReal === startTimer();
		isRunning = true;
	}
}

startBtn.addEventListener('click', playOrStop);
stopBtn.addEventListener('click', playOrStop);
workAndBreakButtons.forEach((button) => {
	button.addEventListener('click', function () {
		clearInterval(progressName);
		switch (button.id) {
			case 'work-session':
				minutes.innerHTML = '25';
				seconds.innerHTML = '00';
				break;
			case 'short-break':
				minutes.innerHTML = '05';
				seconds.innerHTML = '00';
				break;
			case 'long-break':
				minutes.innerHTML = '15';
				seconds.innerHTML = '00';
				break;
		}
		isRunning = false;
		progressEnd = calcProgressEnd(minutes.innerHTML, seconds.innerHTML);
		progressStart = 0;
		displayTime();
	});
});

workAndBreakButtons.forEach((button) => {
	button.addEventListener('click', playOrStop);
});

function calcProgressEnd(min, sec) {
	return parseInt(min) * 60 + parseInt(sec);
}

audioLofi.addEventListener('click', function (e) {
	if (e.target.value === 'LO-FI') {
		e.target.value = 'STOP';
		audio.src = e.target.getAttribute('data-url');
		audio.play();
		audioRock.disabled = true;
	} else {
		e.target.value = 'LO-FI';
		audio.currentTime = 0;
		audio.pause();
		audioRock.disabled = false;
	}
});

audioRock.addEventListener('click', function (e) {
	if (e.target.value === 'ROCK') {
		e.target.value = 'STOP';
		audio.src = e.target.getAttribute('data-url');
		audio.play();
		audioLofi.disabled = true;
	} else {
		e.target.value = 'ROCK';
		audio.currentTime = 0;
		audio.pause();
		audioLofi.disabled = false;
	}
});