const plugin = {
    name: 'usersHandler',
    version: '1.0.0',
    register: (server, options) => {
        server.route([
            {
                method: 'POST',
                path: '/auth',
                options: {
                    auth: false
                },
                handler: auth
            },
            {
                method: 'GET',
                path: '/user',
                handler: getAll
            },
            {
                method: 'GET',
                path: '/user/{name}',
                handler: getByName
            }
        ])
    }
}

async function auth(req, h) {
    const payload = { args: req.payload }
    const user =  await h.act({role:'users', cmd:'auth'}, payload)
    const token = req.server.methods.jwtSign(user)
    return {...user, token}
}

async function getAll(req, h) {
    return await h.act({role: 'users', cmd: 'getAll'})
}

async function getByName(req, h) {
    const payload = { args: req.params }
    return await h.act({role: 'users', cmd: 'getByName'}, payload)
}

module.exports = plugin