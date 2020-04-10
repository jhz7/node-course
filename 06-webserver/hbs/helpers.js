const hbs = require('hbs');

hbs.registerHelper('getAnio', () => new Date().getFullYear());
hbs.registerHelper('capitalizar', (texto) => {
  return texto.split(' ')
    .map(palabra => {
      return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    })
    .join(' ');
});