const server = require('./index');
const PORT = process.argv[2] || 3000;

server.listen(PORT, function() {
    console.log('listening on *:'+PORT)
});