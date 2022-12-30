const crearMensaje = (nombre, mensaje) => {
    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()//m,omdneo enviado
    }
}

module.exports =  {
    crearMensaje
}