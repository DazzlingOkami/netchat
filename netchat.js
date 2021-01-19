const net = require('net');

let clientSet = [];
const server = net.createServer();

server.on('connection', (person) => {
    clientSet.push(person);
    person.setEncoding('utf8');

    person.on('data', (chunk) => {
        clientSet.forEach((client) => {
            client.write(chunk);
        })
    })

    person.on('close', (state) => {
        clientSet = clientSet.filter((item) => {
            return item != person;
        })
    })

    person.on('error', (err) => {
        clientSet = clientSet.filter((item) => {
            return item != person;
        })
        person.destroy()
    })
})

console.log("Net Chat running...");
server.listen(8000);
