const firebaseAdmin = require('firebase-admin')

const serviceAccount = require('./config/serviceAccountKey.json')

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://cursodevhack.firebaseio.com"
});

const seneca = require("seneca")
const config = require('./config/seneca.json')

const moviesMic = require('./microservices/movies')
const usersMIC = require('./microservices/users')

const server = seneca(config)
server.use(moviesMic)
    .listen({type: 'http', port: 3000, pin: 'role:movies'})

server.use(usersMIC)
    .listen({type: 'http', port: 4000, pin: 'role:users'})
