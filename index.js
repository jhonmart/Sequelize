const express = require('express');
const Product = require('./controllers/product');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

app.use((req, resp, next) => {
    req.path.includes("/user") && !req.headers.authorization ? resp.redirect("/") : next();
});

app.use('/produtos', Product);

app.get('/:template?(\.html)?', (req, resp) => {
    const { template } = req.params;
    resp.sendFile(__dirname + `/templates/${template || "index"}.html`);
});

app.listen(PORT, function() {
    console.log('listening on *:'+PORT)
});