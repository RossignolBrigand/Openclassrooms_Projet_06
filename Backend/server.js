const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Entry point !')
})

server.listen(process.env.PORT || 4000);