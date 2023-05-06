//importación de la biblioteca notiflix
import Notiflix from 'notiflix';

//Acceso al DOM
const form = document.querySelector('.form');
console.log(form);

//Creación de la promesa
const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

const activation = (event) => {
  event.preventDefault();

  let delay = parseInt(form.delay.value, 10);
  let step = parseInt(form.step.value, 10);
  let amount = parseInt(form.amount.value, 10);
  let temp = 0;

  for (let i = 1; i <= amount; i++) {
    if (i === 1) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
      temp = delay + step;
    } else {
        createPromise(i, temp)
          .then(({ position, delay }) => {
            Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
          });     
      temp += step;
    }
  }
};

form.addEventListener("submit", activation);