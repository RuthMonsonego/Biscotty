
const fs = require('fs');

exports.get = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}

exports.getById = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let product = data.find(st => st.id == id)

            if (product == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(product);
            }
        }
    })
}

exports.put = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file");
        }

        const { path: image } = req.file;
        let id = req.params.id;
        let products;

        try {
            products = JSON.parse(data);
        } catch (parseErr) {
            console.error("Error parsing JSON data:", parseErr);
            return res.status(500).send("Error parsing JSON data");
        }

        let index = products.findIndex(product => product.id == id);

        if (index === -1) {
            return res.status(404).send("Product not found");
        }

        let updatedProduct = req.body;
        updatedProduct.id=Number(id)
        console.log(updatedProduct.id)

        console.log("Updated product:", updatedProduct);

        products[index] = {  ...updatedProduct, image: image.replace('\\', '/') };

        fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return res.status(500).send("Error updating product");
            } else {
                res.send(products[index]);
            }
        });
    });
};


exports.delete = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        let id = req.params.id
        let products = JSON.parse(data);
        let newArrProduct = products.filter(i => i.id != id)

        fs.writeFile("products.json", JSON.stringify(newArrProduct), (err) => {
            if (err) {
                res.status(500).send("error  in add products ");
            } else {
                res.send(newArrProduct);
            }
        })
    })
}


exports.post = async (req, res) => {
    try {
        const { path: image } = req.file;
        let products = JSON.parse(await fs.promises.readFile('products.json'));
        let newId = products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
        console.log('newId' + newId);
        const newProduct = {
            id: newId,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            isGluten: req.body.isGluten,
            isMilki: req.body.isMilki,
            isVegan: req.body.isVegan,
            image: image.replace('\\', '/')
        };
        products.push(newProduct);
        await fs.promises.writeFile('products.json', JSON.stringify(products, null, 2));
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};