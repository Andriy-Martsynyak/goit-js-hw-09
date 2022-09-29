const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.body;

let intervalId = null;
let clickCounter = 0;
let MAX_CLICK_ATTEMPS = 1;

function changeColorOnBody() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  body.style.backgroundColor = randomColor;
}

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  startBtn.disabled = true;
  intervalId = setInterval(() => {
    changeColorOnBody();
  }, 1000);
}

stopBtn.addEventListener('click', onStopBtnClick);

function onStopBtnClick() {
  startBtn.disabled = false;
  clearInterval(intervalId);
}
