const seneca = require("seneca")
const config = require('./config/seneca.json')
const clients = seneca(config)

clients.client({ host: 'localhost', port: 3000, pin: 'role:movies' })

//// Obtener todas la peliculas
/*clients.act('role:movies, cmd:getAll', (err, result) => {
    console.log('result:getAll', result)
})*/

//// Buscar una pelicula por el titulo
const payload = { args: { title: 'Senaca NodeJs UPDATE' } }
clients.act('role:movies, cmd:getByTitle', payload, (err, result) => {
    console.log('result:getByTitle => ', result)
})

//// Agregar una nueva pelicula
/*const payloadAdd = { args: {
    title: 'Senaca NodeJs',
    image: 'image',
    quality: 'hd',
    url: 'URL',
    year: '2019'
}}

clients.act('role:movies, cmd:add', payloadAdd, (err,result) => {
    console.log('result:add => ', result)
})*/

//// Set de pelicula

/*const payloadSet = {
    filter:
        { title: 'Senaca NodeJs' },
    movie: {
        title: 'Senaca NodeJs SET',
        image: 'image',
        quality: 'hd',
        url: 'URL',
        year: '2020'
    }
}

clients.act('role:movies, cmd:update', payloadSet, (err, result) => {
    console.log('result:update => ', result)
})*/


//// Update de pelicula
/*const payloadUpdate = {
    filter:
        { title: 'Senaca NodeJs SET' },
    movie: {
        title: 'Senaca NodeJs UPDATE',
        image: 'image',
        quality: 'hd',
        url: 'URL',
        year: '2020'
    }
}

clients.act('role:movies, cmd:patch', payloadUpdate, (err, result) => {
    console.log('result:patch => ', result)
})*/

//// Delete de peliculas
/*const payloadDelete = { args: { title: 'Senaca NodeJs UPDATE' } }
clients.act('role:movies, cmd:delete', payloadDelete, (err, result) => {
    console.log('result:delete => ', result)
})*/

