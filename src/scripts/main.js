/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */

import { stays } from './stays.js';
import { crearTarjetaEstancia } from './utils.js';

export function actualizarContador(cantidad) {
  const contador = document.getElementById('contador-estancias');
  contador.textContent = `${cantidad} estancia(s) encontrada(s)`;
}



//Filtrosmodal

  // Referencias
const modal = document.getElementById("modal-busqueda");
const cerrarBtn = document.getElementById("cerrar-modal");
const inputsBusqueda = document.querySelectorAll("input");

// Mostrar modal al hacer focus en los inputs
inputsBusqueda.forEach(input => {
  input.addEventListener("focus", () => {
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden"); // Evitar scroll
  });
});

// Cerrar modal
cerrarBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
});

//btn hecho para un boton close
/* const cerrarBtn2 = document.getElementById("cerrar-modal-2");

if (cerrarBtn2) {
  cerrarBtn2.addEventListener("click", () => {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  });
} */


export function mostrarEstanciasFiltradas(lista) {
  const contenedor = document.getElementById('contenedor-hoteles');
  contenedor.innerHTML = '';
  lista.forEach((stay) => {
    const tarjeta = crearTarjetaEstancia(stay);
    contenedor.appendChild(tarjeta);
  });

  actualizarContador(lista.length); // ⬅️ Aquí también
}

const btnToggleDark = document.getElementById("btn-toggle-dark");
const html = document.documentElement;
const iconoSol = document.getElementById("icono-sol");
const iconoLuna = document.getElementById("icono-luna");
btnToggleDark.addEventListener("click", () => {
  html.classList.toggle("dark");
  iconoSol.classList.toggle("hidden");
  iconoLuna.classList.toggle("hidden");
});


import { mostrarSkeletons } from './utils.js';

//Renderizar la carga del array con con los skeletons al cargar
document.addEventListener('DOMContentLoaded', () => {
  mostrarSkeletons(); // Mostrar placeholders al inicio

  setTimeout(() => {
    const contenedor = document.getElementById('contenedor-hoteles');
    contenedor.innerHTML = ''; // Limpiar los skeletons

    stays.forEach(stay => {
      const tarjeta = crearTarjetaEstancia(stay);
      contenedor.appendChild(tarjeta);
    });

    actualizarContador(stays.length);
  }, 1000); // Espera 1 segundo para simular carga
});