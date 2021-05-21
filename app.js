const http = require('http');
const fs = require('fs');
const path = require('path');
const static_contents = require('./modules/static.js');

server = http.createServer(function (request, response){
    static_contents(request, response);
})
server.listen(8000);
console.log('Running in localhost port 8000');