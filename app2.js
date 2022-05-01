const http = require('http')

const server = http.createServer((req, res) => {
    res.write("Hello world from node js");
});
server.listen(4000);