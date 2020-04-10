const axios = require('axios');

const getCoordenadas = async (localizacion) => {

  const localizacionCodificada = encodeURI(localizacion);

  const instancia = axios.create({
    baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${localizacionCodificada}`,
    timeout: 1000,
    headers: {'x-rapidapi-key': '792acc407bmshac3b2fa45c5fa1ep10d426jsnfdb6561b3c37'}
  });

  const resp = await instancia.get();

  if(resp.data.Results.length === 0)
    throw new Error(`No se encontraron coordenadas para la localización ${localizacion}`);

  const resultado = resp.data.Results[0];

  const lugar = resultado.name;
  const pais = resultado.c;
  const lat = resultado.lat;
  const lon = resultado.lon;

  return {
    lat,
    lon
  }
}

module.exports = { getCoordenadas }
