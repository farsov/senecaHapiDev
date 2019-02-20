const firebaseAdmin = require('firebase-admin')

const serviceAccount = require('../../config/serviceAccountKey.json')

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://cursodevhack.firebaseio.com"
});

const seneca = require("seneca")
const usersMic = require('./actions')
const config = require('../../config/seneca.json')


const usersServer = seneca(config)
usersServer.use(usersMic)
    .listen({type: 'http', port: 3001, pin: 'role:users'})

