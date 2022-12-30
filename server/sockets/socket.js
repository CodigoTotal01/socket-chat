const { io } = require('../server');
//cliente contiene id y es unico por cada usuario
const { Usuarios } = require('../classes/usuarios')
const { crearMensaje } = require('../utilidades/utilidades')

const usuarios = new Usuarios();

io.on('connection', (client) => {
    console.log('Usuario conectado');
    //listener -> intervceptar datos del cliente
    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre o sala es necesario'
            });
        }


        // conectar un usuario a una sala 
        client.join(data.sala); //solo se necesita darle un nombre y listo :D 



        //agregar una persona 
        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);

        //Notificar que se onecto un nuyevo cliente
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonaPorSala(data.sala))

        callback(usuarios.getPersonaPorSala(data.sala)); //? callback empleados para enviar informacion desde el servidor al cliente

    })

    client.on('disconnect', () => {
        console.log(client.id)
        let personaBorrada = usuarios.borrarPersona(client.id);
        //enviar a todos los usuarios menos al nuestro
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonaPorSala(personaBorrada.sala)); //obtener el nuevo listado de personas 

    })
    //indormacion del cliente
    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        //emitir a todo el mundo :D 
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)
    })


    //dofia id : "mdT1QNo37UKKBk9mAAAB"

    //data debe contener el id 
    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id); //perosna que envia el mensaje, metodo to en el broadcast
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
    })

});


//slas de chat -> se conecta al id del usuario, se conecta a un chat global 
