const express = require('express');
const router = express.Router();
const controllerProduct = require('../controller/product');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb(null, false);
}


const upload = multer({
    storage,
    limits: {
        fileSize: 1024*1024*2
    },
    fileFilter
});


router.get("/", controllerProduct.get);
router.get("/:id" , controllerProduct.getById);
router.post("/", upload.single('image'),  controllerProduct.post);
router.put("/:id", upload.single('image'), controllerProduct.put)
router.delete("/:id", controllerProduct.delete);

module.exports = router;