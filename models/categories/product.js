'use strict';

const DataModel = require('../memory.js');

class Product extends DataModel {
  constructor() {
    super();
    this.schema = {
      category_id: { type: 'string', required: true },
      price: { type: 'number', required: true },
      weight: { type: 'number', required: false },
      quantity_in_stock: { type: 'number', required: true },
    };
  }
}

module.exports = Product;