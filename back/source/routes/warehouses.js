const express = require('express');
const db = require('../connection');
const router = express.Router();
const Joi = require('joi');

// DB warehouses 
const warehouses = db.get('warehouses');
const itemsDB = db.get('items');

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

// create a warehouse 
router.post('/', async (req, res, next) => {
    try {
        const { name, address } = req.body;
        const result = await schema.validateAsync({ name, address });
        const warehouse = await warehouses.findOne({
            name: name,
        });
        if (warehouse) { // warehouse already in warehouses
            const error = new Error('warehouse already exists');
            res.status(409);
            return next(error);
        }
        const newItem = await warehouses.insert({
            name,
            address,
        });
        itemsDB.update({},
            { $push: { warehouses: { warehouse: newItem._id, quantity: 0 } } },
            { multi: true }
        )
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
});

// update a warehouse 
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, address } = req.body;
        const result = await schema.validateAsync({ name, address });
        const warehouse = await warehouses.findOne({
            _id: id,
        });
        if (!warehouse) { // warehouse does not exist
            return next();
        }
        if (warehouse.name != name) { // name changed, verify new name
            const itemsN = await warehouses.findOne({
                name: name,
            });
            if (itemsN) { // warehouse already in warehouses
                const error = new Error('name already exists');
                res.status(409);
                return next(error);
            }
        }
        const updateditem = await warehouses.update({
            _id: id,
        }, { $set: result },
            { upsert: true });
        res.json(updateditem);
    } catch (error) {
        next(error);
    }
});

module.exports = router;