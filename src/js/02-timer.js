// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const dateTime = document.querySelector('input#datetime-picker');
const dataDay = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const buttonStart = document.querySelector('[data-start]');

buttonStart.disabled = true;
buttonStart.addEventListener('click', startTimer);
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.success('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('The date is selected');
      buttonStart.disabled = false;
    }
  },
};

flatpickr(dateTime, options);

const currentTime = new Date();

function startTimer() {
  let futureTime = new Date(dateTime.value);
  let targetTime = futureTime - currentTime;

  const selectedDate = setInterval(() => {
    const convertedData = convertMs(targetTime);
    dataDay.textContent = addLeadingZero(convertedData.days);
    dataHours.textContent = addLeadingZero(convertedData.hours);
    dataMinutes.textContent = addLeadingZero(convertedData.minutes);
    dataSeconds.textContent = addLeadingZero(convertedData.seconds);
    targetTime -= 1000;

    if (targetTime <= 0) {
      clearInterval(selectedDate);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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
