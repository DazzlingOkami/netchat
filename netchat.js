const net = require('net');

let clientArr = [];
const server = net.createServer();

server.on('connection', (person) => {
    person.id = clientArr.length;
    clientArr.push(person);
    person.setEncoding('utf8');

    person.on('data', (chunk) => {
        console.log(chunk);
        clientArr.forEach((val) => {
            val.write(chunk);
        })
    })

    person.on('close', (person) => {
        clientArr[person.id] = null;
    })

    person.on('error', (person) => {
        clientArr[person.id] = null;
    })
})

server.listen(8000);
