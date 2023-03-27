import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

//CREATE
router.post("/", async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedProduct)
    } catch(err) {
        res.status(500).json(err)
    }
})

//DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted successfully")
    } catch(err) {
        res.status(500).json(err)
    }
})

//GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch(err) {
        res.status(500).json(err)
    }
})


//GET 
router.get("/", async (req, res) => {
    const products = await Product.find();
    try {
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
})

export default router;