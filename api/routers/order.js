import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

//CREATE
router.post("/", async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedOrder)
    } catch(err) {
        res.status(500).json(err)
    }
})

//DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted successfully")
    } catch(err) {
        res.status(500).json(err)
    }
})


//GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        res.status(200).json(order)
    } catch(err) {
        res.status(500).json(err)
    }
})


//GET 
router.get("/", async (req, res) => {
    const orders = await Order.find();
    try {
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
})


export default router;