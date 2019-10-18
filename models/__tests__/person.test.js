const Person = require('../categories/person.js');

describe('Person Model', () => {

  let person;

  beforeEach(() => {
    person = new Person();
  });

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = person.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(person.sanitize(testRecord)).toBeUndefined();
  });

  it('can create() a new category', () => {
    let obj = { firstName: 'Jeff', lastName: 'Smith', birthdate: '2000-01-01', ssn: '5340120492'};
    return person.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can read() a category', () => {
    let obj = { firstName: 'Jeff', lastName: 'Smith', birthdate: '2000-01-01', ssn: '5340120492'};
    return person.create(obj)
      .then(record => {
        return person.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can update() a category', () => {
    let obj = { firstName: 'Jeff', lastName: 'Smith', birthdate: '2000-01-01', ssn: '5340120492'};
    return person.create(obj)
      .then(record => {
        record.name = 'Test2 Category';
        return person.update(record._id, record)
          .then(category => {
            return person.get(record._id)
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
    let obj = { firstName: 'Jeff', lastName: 'Smith', birthdate: '2000-01-01', ssn: '5340120492'};
    return person.create(obj)
      .then(record => {
        return person.delete(record._id)
          .then(category => {
            return person.get(record._id)
              .then(category => {
                Object.keys(obj).forEach(key => {
                  expect(category[0][key]).toEqual(obj[key]);
                });
              });
          });
      });
  });

  

});