const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found in' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const product = new Product({
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found in database' });
        }
        if (req.body.productName) {
            product.productName = req.body.productName;
        }
        if (req.body.description) {
            product.description = req.body.description;
        }
        if (req.body.price) {
            product.price = req.body.price;
        }
        if (req.body.category) {
            product.category = req.body.category;
        }
        if (req.body.quantity !== undefined) {
            product.quantity = req.body.quantity;
        }
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found in database' });
        }
        await product.remove();
        res.json({ message: 'Product deleted from database' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
