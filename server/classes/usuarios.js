class Usuarios {

    constructor() {
        this.personas = []

    }

    //agregar persona al chat y obtenemos su informacion
    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona)
        return this.personas;
    }

    //buscar una persona apartir del id
    getPersona(id) {
        let persona = this.personas.filter(persona => {
            //condicion
            return persona.id === id; // retorna nuevo arreglo
        })[0]; // primer dato

        return persona; //persona or undefined
    }

    //Obtener todos los clientes de todas las salas
    getPersonas() {
        return this.personas;
    }

    //obtener SOLO los clientes de una sala en especifico
    getPersonaPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => {
            return persona.sala === sala;
        })
        return personasEnSala;

    }

    //cuando se abandona el chat sacarlo del arreglo

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id !== id) // no modifica el arreglo original
        return personaBorrada;
    }


}

module.exports = { Usuarios };
