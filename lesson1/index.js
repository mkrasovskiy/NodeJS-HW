const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type' : 'text/html; charset=UTF-8' 
        });
        res.end('<a href="http://127.0.0.1:3000/about">about</a>')
    } else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-Type' : 'text/html; charset=UTF-8'
        });
        res.end('<a href="http://127.0.0.1:3000">home</a>')
    } else {
        res.writeHead(404, {
            'Content-Type' : 'text/html; charset=UTF-8'
        });
        res.end('<h1>Страница не найдена</h1>')
    }
});

server.listen(3000);