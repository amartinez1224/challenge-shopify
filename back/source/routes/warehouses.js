const express = require('express');
const db = require('../connection');
const router = express.Router();
const Joi = require('joi');

// DB warehouses 
const warehouses = db.get('warehouses');

// warehouse schema 
const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    address: Joi.string()
        .min(3)
        .max(50)
        .required()
})

// get all warehouses 
router.get('/', async (req, res, next) => {
    try {
        const allItems = await warehouses.find({});
        res.json(allItems);
    } catch (error) {
        next(error);
    }
});

// get a warehouse 
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const warehouse = await warehouses.findOne({
            _id: id,
        });
        if (!warehouse) {
            const error = new Error('warehouse does not exist');
            return next(error);
        }
        res.json(warehouse);
    } catch (error) {
        next(error);
    }
});

module.exports = router;