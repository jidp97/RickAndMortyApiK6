import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10, // número de usuarios virtuales que simularán
  duration: '30s', // duración de la prueba
};

// Función principal de prueba
export default function () {
  let response = http.get('https://rickandmortyapi.com/api/character'); // URL de la API a probar
  check(response, {
    'status is 200': (r) => r.status === 200, // Verifica que la respuesta sea 200 OK
    'has results': (r) => JSON.parse(r.body).results.length > 0, // Verifica que haya resultados en la respuesta
  });
  sleep(1); // Espera 1 segundo antes de la siguiente solicitud
}
