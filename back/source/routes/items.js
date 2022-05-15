const express = require('express');
const db = require('../connection');
const router = express.Router();
const Joi = require('joi');

// DB items 
const items = db.get('items');

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
  quantity: Joi.number()
    .positive()
    .allow(0)
    .required(),
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
    const { name, description, quantity } = req.body;
    const result = await schema.validateAsync({ name, description, quantity });
    const item = await items.findOne({
      name: name,
    });
    if (item) { // item already in items
      const error = new Error('item already exists');
      res.status(409);
      return next(error);
    }
    const newItem = await items.insert({
      name,
      description,
      quantity,
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
    const { name, description, quantity } = req.body;
    const result = await schema.validateAsync({ name, description, quantity });
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

module.exports = router;