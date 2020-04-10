let empleados = [
  {
    id: 1,
    nombre: 'Jhon'
  },
  {
    id: 2,
    nombre: 'Yirlenia'
  },
  {
    id: 3,
    nombre: 'Juan'
  }
];

let salarios = [
  {
    id: 1,
    salario: 1000
  },
  {
    id: 2,
    salario: 2000
  }
];

let getEmpleado = async (id) => {
  
    let empleadoBD = empleados.find(empleado => empleado.id === id);

    if(!empleadoBD)
      throw new Error(`No existe un empleado con ID ${id}`);

    return empleadoBD;
  
};

let getSalario = async (empleado) => {
  
    let salarioBD = salarios.find(salario => salario.id === empleado.id);

    if(!salarioBD)
      throw new Error(`No se encontró un salario para el empleado ${empleado.nombre}`);

    return {
      nombre: empleado.nombre,
      salario: salarioBD.salario
    };
};

let ejecucion = async (id) => {
  let empleado = await getEmpleado(id);
  let salario = await getSalario(empleado);

  return `El salario de ${empleado.nombre} es de $${salario.salario}`;
}

ejecucion(1)
  .then(rsp => console.log(rsp))
  .catch(error => console.log(error.message));