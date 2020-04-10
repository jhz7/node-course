console.log('Inicio del programa');

setTimeout(function(){
  console.log('Primer time out');
}, 3000);

setTimeout(function(){
  console.log('Segundo time out');
}, 0);

setTimeout(function(){
  console.log('Tercer time out');
}, 0);

console.log('Fin del programa');