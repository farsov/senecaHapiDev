const seneca = require("seneca")
const config = require('./config/seneca.json')
const clients = seneca(config)

clients.client({ host: 'localhost', port: 4000, pin: 'role:users' })

//// Obtener todas la peliculas
clients.act('role:users, cmd:getAll', (err, result) => {
    console.log('result:getAll', result)
})

//// Buscar una pelicula por el titulo
const payload = { args: { name: 'julanito UPDATE' } }
clients.act('role:users, cmd:getByName', payload, (err, result) => {
    console.log('result:getByName => ', result)
})

//// Agregar una nueva pelicula
/*const payloadAdd = { args: {
    name: 'julanito',
    age: '30',

}}

clients.act('role:users, cmd:addUser', payloadAdd, (err,result) => {
    console.log('result:addUser => ', result)
})*/

//// Set de pelicula
/*const payloadSet = {
    filter: { 
        name: 'julanito' 
    },
    user: {
        name: 'julanito SET',
        age: '30',
    }
}

clients.act('role:users, cmd:update', payloadSet, (err, result) => {
    console.log('result:update => ', result)
})*/

//// Update de pelicula
/*const payloadUpdate = {
    filter: { 
        name: 'julanito SET' 
    },
    user: {
        name: 'julanito UPDATE',
        age: '30',
    }
}

clients.act('role:users, cmd:patch', payloadUpdate, (err, result) => {
    console.log('result:patch => ', result)
})*/


//// Delete de peliculas
/*const payloadDelete = { args: { name: 'julanito UPDATE' } }
clients.act('role:users, cmd:delete', payloadDelete, (err, result) => {
    console.log('result:delete => ', result)
})*/