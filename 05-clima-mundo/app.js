const { getLatitudLongitud: getCoordenadas } = require('./lugar/lugar');
const { getClima } = require('./clima/clima');

const argv = require('yargs').options({
  direccion: {
    alias: 'd',
    desc: 'Dirección de la ciudad a consultar el clima',
    demand: true
  }
}).argv;

const ejecucion = async () => {
  const infoCoordenadas = await getCoordenadas(argv.direccion);
  const clima = await getClima(infoCoordenadas.lat, infoCoordenadas.lon);

  return clima;
}


ejecucion()
  .then(rsp => console.log(rsp))
  .catch(err => console.log(err.message));
