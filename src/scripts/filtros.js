// filtros.js

import { stays } from './stays.js';
import { actualizarContador } from './main.js';
import { crearTarjetaEstancia } from './utils.js';

const inputLocation = document.getElementById('input-location');
const inputGuests = document.getElementById('input-guests');
const btnBuscar = document.querySelectorAll('.btn-buscar');
const contenedor = document.getElementById('contenedor-hoteles');
const adultCountSpan = document.getElementById('adult-count');
const childCountSpan = document.getElementById('child-count');


let adultos = 0;
let ninos = 0;

function actualizarInputGuests() {
  const total = adultos + ninos;
  inputGuests.value = total > 0 ? `${total} guest${total > 1 ? 's' : ''}` : '';
}

// Eventos para aumentar/disminuir adultos
const btnAumentarAdult = document.querySelector('.btn-aumentar-adult');
const btnDisminuirAdult = document.querySelector('.btn-disminuir-adult');

btnAumentarAdult.addEventListener('click', () => {
  adultos++;
  adultCountSpan.textContent = adultos;
  actualizarInputGuests();
});

btnDisminuirAdult.addEventListener('click', () => {
  if (adultos > 0) adultos--;
  adultCountSpan.textContent = adultos;
  actualizarInputGuests();
});

// Eventos para aumentar/disminuir niños
const btnAumentarChild = document.querySelector('.btn-aumentar-child');
const btnDisminuirChild = document.querySelector('.btn-disminuir-child');

btnAumentarChild.addEventListener('click', () => {
  ninos++;
  childCountSpan.textContent = ninos;
  actualizarInputGuests();
});

btnDisminuirChild.addEventListener('click', () => {
  if (ninos > 0) ninos--;
  childCountSpan.textContent = ninos;
  actualizarInputGuests();
});

function mostrarEstanciasFiltradas() {
  const ubicacion = inputLocation.value.toLowerCase();
  const cantidad = adultos + ninos;
  const filtradas = stays.filter(stay => {
    const matchCiudad = ubicacion ? stay.city.toLowerCase().includes(ubicacion) : true;
    const matchCapacidad = cantidad ? stay.maxGuests >= cantidad : true;
    return matchCiudad && matchCapacidad;
    
    
  });

  contenedor.innerHTML = '';
  filtradas.forEach(stay => contenedor.appendChild(crearTarjetaEstancia(stay)));
  actualizarContador(filtradas.length);
}

btnBuscar.forEach(boton => {
  boton.addEventListener("click", () => {
  mostrarEstanciasFiltradas();
  document.getElementById('modal-busqueda').classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  // 🔴 Limpiar campos
  inputLocation.value = '';
  inputGuests.value = '';
  adultos = 0;
  ninos = 0;
  adultCountSpan.textContent = '0';
  childCountSpan.textContent = '0';
});
});


const listaSugerencias = document.getElementById('lista-sugerencias');

// Obtener ciudades únicas
const ciudades = [...new Set(stays.map(stay => stay.city))]; //new Set(...): elimina duplicados (solo una vez cada ciudad).

inputLocation.addEventListener('input', () => {
  const query = inputLocation.value.toLowerCase();
  listaSugerencias.innerHTML = '';
  if (query) {
    const filtradas = ciudades.filter(ciudad =>
      ciudad.toLowerCase().includes(query)
    );

    if (filtradas.length > 0) {
      listaSugerencias.classList.remove('hidden');
      filtradas.forEach(ciudad => {
        const item = document.createElement('li');
        item.textContent = ciudad;
        item.className = 'px-4 py-2 cursor-pointer hover:bg-blue-100 ';
        item.addEventListener('click', () => {
          inputLocation.value = ciudad;
          listaSugerencias.classList.add('hidden');
        });
        listaSugerencias.appendChild(item);
      });
    } else {
      listaSugerencias.classList.add('hidden');
    }
  } else {
    listaSugerencias.classList.add('hidden');
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('#input-location') && !e.target.closest('#lista-sugerencias')) {
    listaSugerencias.classList.add('hidden');
  }
});