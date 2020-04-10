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

let getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    let empleadoBD = empleados.find(empleado => empleado.id === id);

    if(!empleadoBD)
      return reject(`No existe un empleado con ID ${id}`);

    return resolve(empleadoBD);
  });  
};

let getSalario = (empleado) => {
  
  return new Promise((resolve, reject) => {
    let salarioBD = salarios.find(salario => salario.id === empleado.id);

    if(!salarioBD)
      return reject(`No se encontró un salario para el empleado ${empleado.nombre}`);

    return resolve({
      nombre: empleado.nombre,
      salario: salarioBD.salario
    });
  });
};

getEmpleado(3).then(empleado =>  getSalario(empleado))
  .then(salario => console.log(`El salario de ${salario.nombre} es de $${salario.salario}`))
  .catch(error => console.log(error));