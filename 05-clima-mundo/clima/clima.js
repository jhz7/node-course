const axios = require('axios');

const getClima = async (latitud, longitud) => {

  const resp = await axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=dba13e0803547bac46752a795c707999&units=metric`);

  if(!resp.data)
    throw new Error(`No se encontraron resultados para la latitud ${latitud} y longitud ${longitud}`);

  return resp.data.main.temp
}

module.exports = { getClima }
