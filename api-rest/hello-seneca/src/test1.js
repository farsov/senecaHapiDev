const seneca = require("seneca")
const server = seneca({
    strict: {
        result: false
    },
    log: {
        level: 'error+'
    }
})

server.add('role:math,cmd:sum', (msg, reply) => {
    reply(null, {result: msg.left + msg.right} )
})

server.act({role: 'math', cmd: 'sum', left:1, right:2}, (err, result) => {
    if(err) console.error(err)
    else console.log('result', result)
})