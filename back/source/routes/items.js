const express = require('express');
const db = require('../connection');
const router = express.Router();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const monk = require('monk')

// DB items 
const items = db.get('items');
const warehousesDB = db.get('warehouses');

// item schema 
const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  description: Joi.string()
    .min(3)
    .max(350)
    .required(),
  warehouses: Joi.array().items(Joi.object({
    warehouse: Joi.objectId()
      .required(),
    quantity: Joi.number()
      .positive()
      .allow(0)
      .required()
  }))
})

// get all items 
router.get('/', async (req, res, next) => {
  try {
    const allItems = await items.find({});
    res.json(allItems);
  } catch (error) {
    next(error);
  }
});

// get an item 
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await items.findOne({
      _id: id,
    });
    if (!item) {
      const error = new Error('item does not exist');
      return next(error);
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
});

// create an item 
router.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const warehouses = []
    const result = await schema.validateAsync({ name, description, warehouses });
    const item = await items.findOne({
      name: name,
    });
    if (item) { // item already in items
      const error = new Error('item already exists');
      res.status(409);
      return next(error);
    }
    // get available warehouses
    const allWarehouses = await warehousesDB.find({});
    allWarehouses.forEach(warehouse => {
      warehouses.push({ warehouse: warehouse._id, quantity: 0 })
    })
    const newItem = await items.insert({
      name: name,
      description: description,
      warehouses: warehouses
    });
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
});

// update an item 
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    let { name, description, warehouses } = req.body;
    // check if warehouses exist
    for (var i = 0; i < warehouses.length; i++) {
      warehouses[i].warehouse = monk.id(warehouses[i].warehouse)
      const warehouse = await warehousesDB.findOne({
        _id: warehouses[i].warehouse,
      });
      if (!warehouse) { // warehouse does not exist
        const error = new Error('warehouse does not exists');
        res.status(409);
        return next(error);
      }
    }
    const result = await schema.validateAsync({ name, description, warehouses });
    const item = await items.findOne({
      _id: id,
    });
    if (!item) { // item does not exist
      return next();
    }
    if (item.name != name) { // name changed, verify new name
      const itemsN = await items.findOne({
        name: name,
      });
      if (itemsN) { // item already in items
        const error = new Error('name already exists');
        res.status(409);
        return next(error);
      }
    }
    const updateditem = await items.update({
      _id: id,
    }, { $set: result },
      { upsert: true });
    res.json(updateditem);
  } catch (error) {
    next(error);
  }
});

// delete an item 
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await items.findOne({
      _id: id,
    });
    if (!item) { // item does not exist
      return next();
    }
    await items.remove({
      _id: id,
    });
    res.json({
      message: 'item deleted',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;