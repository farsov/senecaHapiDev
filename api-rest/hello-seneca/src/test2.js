const seneca = require("seneca")
const config = {
    strict: {
        result: false
    },
    log: {
        level: 'error+'
    }
}
const server = seneca(config)

function handler() {
    this.add('cmd:sum', (msg, reply) => {
        return reply(null, { result: msg.left + msg.right })
    })
}

server.use(handler).listen({type: 'http', port: 3000, pin: 'cmd:*'})

seneca(config)
    .client({ port: 3000, pin: 'cmd:*'})
    .act('cmd:sum', {left: 1, right: 2}, (err, result) => {
        console.log('result', result)
    })
