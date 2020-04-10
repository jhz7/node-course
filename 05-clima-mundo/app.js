const { getLatitudLongitud: getCoordenadas } = require('./lugar/lugar');
const { getClima } = require('./clima/clima');

const argv = require('yargs').options({
  direccion: {
    alias: 'd',
    desc: 'Dirección de la ciudad a consultar el clima',
    demand: true
  }
}).argv;

const getInfo = async (direccion) => {
  const infoCoordenadas = await getCoordenadas(direccion);
  const clima = await getClima(infoCoordenadas.lat, infoCoordenadas.lon);

  return `El clima de ${direccion} es ${clima} °C`;
}


getInfo(argv.direccion)
  .then(rsp => console.log(rsp))
  .catch(err => console.log(`No se pudo obtener el clima para ${argv.direccion}: ${err.message}`));
