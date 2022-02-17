const restify = require('restify');
const router = require('./src/router/index')
require('dotenv').config();

let server = restify.createServer();
server = router(server)

server.listen(8080, function () {
    console.log('Server running.')
})