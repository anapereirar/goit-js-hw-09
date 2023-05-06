// Descrito en la documentación
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
// Importación adicional de estilos
import "flatpickr/dist/flatpickr.min.css";

//Acceso al DOM
const startBtn = document.querySelector('button[data-start]');

const timer = [
    document.querySelector('[data-days]'),
    document.querySelector('[data-hours]'),
    document.querySelector('[data-minutes]'),
    document.querySelector('[data-seconds]'),
];
console.log("Aquí está el timer", timer);

//inactivar el botón de Start
startBtn.disabled = true;
//Variable para el conteo de los milisegundos0
let milSeg = 0;
//Instancia de la fecha actual
let date = new Date();
console.log("objeto fecha", date);

//Uso de la función Flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: date,
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] > date) {
            startBtn.disabled = false;
            milSeg = selectedDates[0] - date;
            return milSeg;
        } else {
            Notiflix.Notify.failure('Please choose a date in the future');
        };
    },
};
//Se pasa el selector del HTML y el objeto options a la función faltpickr
flatpickr("input#datetime-picker", options);

//Función donde ms es la diferencia entre la fecha de finalización y la fecha actual en milisegundos.
function convertMs(ms) {
  // Número de milisegundos por unidad de tiempo
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Dias restantes
  const days = Math.floor(ms / day);
  // Horas restantes
  const hours = Math.floor((ms % day) / hour);
  // minutos restantes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // segundos restantes
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

//Formateo de la fecha si posee un 0
function addLeadingZero(value) {
    let validation = value < 10 ? value.toString().padStart(2,'0') : value;
    return validation;
};

//Función para generar la cuenta regresiva 
const startClick = () => {
    let timerRepeat = setInterval(() => {
        if (milSeg > 0) {
            const { days, hours, minutes, seconds } = convertMs(milSeg);
            const timeValues = [days, hours, minutes, seconds];
      
            for (let i = 0; i < timeValues.length; i++) {
                timer[i].textContent = addLeadingZero(timeValues[i]);
            }
            console.log(convertMs(milSeg));
            milSeg -= 1000;
        } else {
            clearInterval(timerRepeat);
        };
    }, 1000);
};


startBtn.addEventListener('click', startClick)