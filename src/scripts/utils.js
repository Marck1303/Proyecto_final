/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */

export function crearTarjetaEstancia(stay) {
    const { photo, title, city, type, beds, superHost, rating, maxGuests } = stay;
    const tarjeta = document.createElement('div');
    tarjeta.className = 'rounded-xl overflow-hidden shadow-md hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-800 dark:text-white';
  
    tarjeta.innerHTML = `
      <img src="${photo}" alt="${title}" class="w-full h-52 object-cover" />
      <div class="p-4">
        <div class="flex items-center justify-between text-sm text-gray-500 mb-1">
          <div class="flex gap-2 items-center">
            ${superHost ? '<span class="px-2 py-1 border rounded-full text-xs font-bold text-gray-700 border-gray-700 dark:border-white dark:text-red-800" >SUPERHOST</span>' : ''}
            <span class="dark:text-green-600">${type}${beds !== null ? ` · ${beds} beds` : ''}</span>
          </div>
          <div class="flex items-center font-medium">
            <svg class="w-4 h-4 mr-1 fill-current text-red-500 dark:text-yellow-300" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z"/>
            </svg>
            ${rating}
          </div>
        </div>
        <h3 class="text-base font-semibold text-gray-800 dark:text-white">${title}</h3>
        <div class="flex justify-between">
          <h3 class="text-gray-400">${city}</h3>
          <h3 class="text-gray-400">Max Guests: ${maxGuests}</h3>
        </div>
      </div>
    `;
    return tarjeta;
  }