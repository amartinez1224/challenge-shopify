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

module.exports = router;