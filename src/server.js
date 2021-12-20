const server = require('./index');
const PORT = process.argv[2] || 8080;

server.listen(PORT, function() {
    console.log('listening on *:'+PORT)
});