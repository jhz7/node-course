
class Usuarios {

  constructor() {
    this.personas = [];
  }

  agregarPersona( id, nombre, sala ) {

    let personaAlmacenada = this.getPersona(id);
    if(personaAlmacenada) this.borrarPersona(id);

    let presona = { id, nombre, sala };
    this.personas.push( presona );

    return this.personas;
  }

  getPersona( id ) { return this.personas.filter( persona => persona.id === id )[0]; }

  getPersonasPorSala( sala ) { return this.personas.filter( persona => persona.sala === sala ); }

  borrarPersona( id ) {

    let personaABorrar = this.getPersona( id );
    this.personas = this.personas.filter( persona => persona.id != id );

    return personaABorrar;
  }
}

module.exports = {
  Usuarios
}