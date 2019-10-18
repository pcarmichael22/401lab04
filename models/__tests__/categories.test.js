const Categories = require('../categories/categories.js');

describe('Categories Model', () => {

  let categories;

  beforeEach(() => {
    categories = new Categories();
  });

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = categories.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(categories.sanitize(testRecord)).toBeUndefined();
  });

  it('can create() a new category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can read() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can update() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        record.name = 'Test2 Category';
        return categories.update(record._id, record)
          .then(category => {
            return categories.get(record._id)
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
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.delete(record._id)
          .then(category => {
            return categories.get(record._id)
              .then(category => {
                Object.keys(obj).forEach(key => {
                  expect(category[0][key]).toEqual(obj[key]);
                });
              });
          });
      });
  });

  

});