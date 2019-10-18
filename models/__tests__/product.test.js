const Product = require('../categories/product.js');

describe('Product Model', () => {

  let product;

  beforeEach(() => {
    product = new Product();
  });

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = product.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(product.sanitize(testRecord)).toBeUndefined();
  });

  it('can create() a new category', () => {
    let obj = { price: 500, weight: 3010, quantity_in_stock: 5039};
    return product.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can read() a category', () => {
    let obj = { price: 500, weight: 3010, quantity_in_stock: 5039};
    return product.create(obj)
      .then(record => {
        return product.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can update() a category', () => {
    let obj = { price: 500, weight: 3010, quantity_in_stock: 5039};
    return product.create(obj)
      .then(record => {
        record.name = 'Test2 Category';
        return product.update(record._id, record)
          .then(category => {
            return product.get(record._id)
              .then(category => {
                Object.keys(obj).forEach(key => {
                  if(key === 'name'){
                    expect(category[0][key]).not.toEqual(obj[key]);
                  } else {
                    expect(category[0][key]).toEqual(obj[key]);
                  }
                });
              });
          });
      });
  });

  it('can delete() a category', () => {
    let obj = { price: 500, weight: 3010, quantity_in_stock: 5039};
    return product.create(obj)
      .then(record => {
        return product.delete(record._id)
          .then(category => {
            return product.get(record._id)
              .then(category => {
                Object.keys(obj).forEach(key => {
                  expect(category[0][key]).toEqual(obj[key]);
                });
              });
          });
      });
  });

  

});