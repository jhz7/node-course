const { getCoordenadas } = require('./lugar/lugar');
const { getClima } = require('./clima/clima');

const argv = require('yargs').options({
  direccion: {
    alias: 'd',
    desc: 'Dirección de la ciudad a consultar el clima',
    demand: true
  }
}).argv;

const getInfo = async (direccion) => {
  try {
    const coordenadas = await getCoordenadas(direccion);
    const clima = await getClima(coordenadas.lat, coordenadas.lon);

    return `El clima de ${direccion} es ${clima} °C`;
  } catch (error) {
    throw new Error(`No se pudo obtener el clima para ${direccion}: ${error.message}`);
  }
}


getInfo(argv.direccion)
  .then(console.log)
  .catch(console.log);
