const express = require('express');
const user = require('./router/user');
const product = require('./router/product');
const order = require('./router/order');
const multer = require('multer');
const app = express();
const cors = require('cors');
const upload = multer({ dest: 'uploads/' });
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(cors());
app.listen(4000, () => {
    console.log("listen port 4000");
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    let text = new Date().toGMTString() + "  : " + req.url + '\n';
    fs.appendFile("log.txt", text, () => {
        next();
    })
})
app.use("/uploads", express.static('uploads'));
app.use("/product", product);
app.use("/order", order);
app.use("/user", user);
app.use((req, res, next) => {
    let text = new Date().toGMTString() + "  : " + req.url + '\n';
    fs.readFile("404.html", 'utf-8', (err, data) => {
        res.status(404).send(data);
    })
})