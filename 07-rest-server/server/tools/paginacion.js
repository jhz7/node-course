const getPaginacion = (pagina, cantidad) => {
  const fin = Number(cantidad);
  const pag = Number(pagina);

  if(isNaN(fin) || isNaN(pag))
    throw new Error('La paginación debe ser numérica.');

  if(pag <= 0 || pag === 1)
    return {
      inicio: 0,
      fin
    };

  return {
    inicio: (pag * fin) - fin,
    fin
  }
};

module.exports = getPaginacion;
