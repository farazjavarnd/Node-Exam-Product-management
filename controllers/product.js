const Product = require('../models/product')

const create = async (req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            vendor: req.body.vendor,
            warranty: req.body.warranty
        });
        return res.json({
            product
        })
    } catch (error) {
        return res.status(406).send({
            message: "Unable To Add a Product!"
        });
    }

}

const list = async (req, res) => {
    const products = await Product.find();
    return res.json({
        products
    })
}

const update = async (req, res) => {
    const id = req.params.id;
    await Product.findByIdAndUpdate(id, req.body);
    res.json({
        message: "Product updated successfully!"
    })
}

const destroy = async (req, res) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id);
        res.json({
            message: "Product deleted successfully!"
        })
    } catch {
        res.status(500).json({
            message: "Could not delete product with id = " + id
        });
    }
}

module.exports = {
    list,
    create,
    update,
    destroy
}