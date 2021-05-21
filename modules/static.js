const path = require('path');
const fs = require('fs');

module.exports = function(request, response){
    var url = request.url;
    response.writeHead(200, {'Content-Type': 'text/html'});
    if(path.dirname(url) === '/content' || url === '/content'){
        response.writeHead(403, {'Content-Type': 'text/html'});
        response.end();
    }else if(url === '/'){
        fs.readFile('views/index.html', 'utf-8', function(errors, contents){
            response.write(contents);
            response.end();
        });
    }else if(path.dirname(url) === '/images'){
        fs.readFile('.'+url, function(errors, contents){
            if(contents){
                response.writeHead(200, {'Content-Type': 'image/gif'});
                response.write(contents);
                response.end();
            }else{
                response.writeHead(404, {'Content-Type': 'image/gif'});
                response.end();
            }
        });
    }else if(path.extname(url) === '.css'){
        fs.readFile('.'+url, function(errors, contents){
            response.writeHead(200, {'Content-Type': 'text/css'});
            if(contents){
                response.write(contents);
                response.end();
            }else{
                response.writeHead(404, {'Content-Type': 'text/css'});
                response.end();
            }
        });
    }else{
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write('File Not Found!!!');
        response.end();
    }
}