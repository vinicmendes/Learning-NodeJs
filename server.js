const http = require('http');

http
    .createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });

        if(req.url === '/products') {
            res.end(JSON.stringify({
                message: "Rota de produto"
            }));
        }

        if(req.url === '/users'){
            res.end(JSON.stringify({
                message: "Rota de usuário"
            }));
        }
        
        res.end(JSON.stringify({
            message: "Rota não encontrada"
        }));
        
    })
    .listen(4001, () => console.log("O servidor está rodando na porta 4001"));