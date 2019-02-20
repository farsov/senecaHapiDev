const config = require('./config/config.json')
const HapiJWT = require('hapi-jsonwebtoken');
const HapiJWTConfig = require('./config/jsonwebtoken');
const Hapi = require('hapi')
const server = Hapi.Server({
    host: 'localhost',
    port: 8080
})

server.route({
    method: 'GET',
    path: '/hello',
    handler: (Request, h) => {
        return 'Hello Hapi'
    }
})

async function start() {
    try {
        await server.register({ plugin: require('./plugins/seneca'), options: config.seneca })


        await server.register(HapiJWT.plugin);
        server.auth.strategy('jwt', 'hapi-jsonwebtoken', HapiJWTConfig);
        server.auth.default('jwt');

        await server.register(require('./handlers/moviesHandler'))
        await server.register(require('./handlers/usersHandler'))
        await server.start()
        console.log(`Servidor activo en ${server.info.uri}`)
    } catch (error) {
        console.error(`Error iniciando servidor`, error)
    }
}

start()
