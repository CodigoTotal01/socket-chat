var socket = io();

var params = new URLSearchParams(window.location.search); //obtener informacion del  url para extraer el query  -> http://localhost:3000/chat.html?nombre=Christian
if(!params.has('nombre') || !params.has('sala')){
    window.location = "index.html";
    throw new Error('El nombre o sala es necesario en el url')
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};


socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function (resp){ //emit, retornar info desde el servidor con callbacks
        console.log("usuarios conectados", resp)
    }); 
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});


//Cuando un usuario entra o sale del chat 

socket.on('listaPersona', function(personas) {

    console.log('Personas Lista :', personas);

});


//Mensajes privados 
socket.on('mensajePrivado', function(mensaje){
    console.log("Privado ",mensaje)
})