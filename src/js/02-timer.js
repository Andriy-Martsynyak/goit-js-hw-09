import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  date: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  secs: document.querySelector('[data-seconds]'),
};

let timeId = null;
let deltaTime = null;
const DELAY_INTERVAL = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    getDeltaDate(selectedDates[0]);
    console.log(selectedDates[0]);
  },
};

flatpickr(refs.date, options);
changeBtnState();

function getDeltaDate(selectedDate) {
  const currentDate = options.defaultDate;
  console.log(currentDate);

  if (selectedDate <= currentDate) {
    Notify.failure('Please choose a date in the future');
    return;
  }
  deltaTime = selectedDate - currentDate;
  refs.btn.disabled = false;
}

function changeBtnState() {
  if (deltaTime === null || deltaTime <= 0) {
    refs.btn.disabled = true;
    return;
  }
}

refs.btn.addEventListener('click', onBtnClick);

function onBtnClick() {
  timeId = setInterval(() => timerUpdate(), DELAY_INTERVAL);
}

function timerUpdate() {
  if (deltaTime === null) return;
  deltaTime -= DELAY_INTERVAL;
  if (deltaTime <= 0) {
    clearInterval(timeId);
    return;
  }
  formatTimer(convertMs(deltaTime));
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function formatTimer(time) {
  const { days, hours, minutes, seconds } = time;
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.mins.textContent = addLeadingZero(minutes);
  refs.secs.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
