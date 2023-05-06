// Obtener elemntos del DOM -- Botones
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

// Inicializar Intervalo
let intervalId = null;


// Función para crear color random
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

// Función para cambiar color del fondo
function changeBodyBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

startButton.addEventListener('click', ()=>{
    startButton.disabled = true;
    intervalId = setInterval(changeBodyBackgroundColor, 1000);
});

stopButton.addEventListener('click', ()=>{
    startButton.disabled = false;
    intervalId = clearInterval(intervalId);
});


