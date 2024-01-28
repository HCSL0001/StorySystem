/*
01
const http = require('http')
const port = process.env.port || 3000

const server = http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type':'text/plan'})
    res.end('Hello world')
})

server.listen(port,() => console.log('server started on port ${port}; ' + 'press Ctrl-C to terminate'))
*/

/*
02
const http = require('http')
const port = process.env.port || 3000

const server = http.createServer((req,res) => {
    //对URL做规范化处理：移除查询串、末尾可选的斜杠，并转成小写
    const path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase()
    switch(path){
        case '':
            res.writeHead(200,{'Content-Type':'text/plan'})
            res.end('Homepage')
            break
        case '/about':
            res.writeHead(200,{'Content-Type':'text/plan'})
            res.end('About')
            break
        default:
            res.writeHead(404,{'Content-Type':'text/plan'})
            res.end('Not Found')
            break
    }
})

server.listen(port,() => console.log('server started on port ${port}; ' + 'press Ctrl-C to terminate'))
*/

const http = require('http')
const fs = require('fs')
const port = process.env.port || 3000

function serveStaticFile(res,path,contentType,responseCode = 200){
    fs.readFile(__dirname + path,(err,data) => {
        if(err){
            res.writeHead(500,{'Content-Type':'text/plan'})
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode,{'Content-Type':contentType})
        res.end(data)
    })
}

const server = http.createServer((req,res) => {
    //对URL做规范化处理：移除查询串、末尾可选的斜杠，并转成小写
    const path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase()
    switch(path){
        case '':
            serveStaticFile(res,'/public/home.html','text/html')
            break
        case '/login':
            serveStaticFile(res,'/public/login.html','text/html')
            break
        case '/about':
            serveStaticFile(res,'/public/about.html','text/html')
            break
        case '/img/logo.png':
            serveStaticFile(res,'/public/img/logo.png','image/png')
            break
        default:
            serveStaticFile(res,'/public/404.html','text/html',404)
            break
    }
})

server.listen(port,() => console.log('server started on port ${port}; ' + 'press Ctrl-C to terminate ...'))