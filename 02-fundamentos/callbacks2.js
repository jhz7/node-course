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

let getEmpleado = (id, callback) => {
  let empleadoBD = empleados.find(empleado => empleado.id === id);

  if(!empleadoBD)
    return callback(`No existe un empleado con ID ${id}`);

  return callback(null, empleadoBD);
};

let getSalario = (empleado, callback) => {
  let salarioBD = salarios.find(salario => salario.id === empleado.id);

  if(!salarioBD)
    return callback(`No se encontró un salario para el empleado ${empleado.nombre}`);

  return callback(null, {nombre: empleado.nombre, salario: salarioBD.salario});
};

getEmpleado(3, (error, empleado) => {
  if(error) {
    console.log(error);
    return;
  }

  getSalario(empleado, (error, salario) => {
    if(error) {
      console.log(error);
      return;
    }

    console.log(salario);
  });

});