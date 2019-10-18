'use strict';

const DataModel = require('../memory.js');

class Person extends DataModel {
  constructor() {
    super();
    this.schema = {
      id: { type: 'string', required: true },
      firstName: { type: 'string', required: true },
      lastName: { type: 'string', required: true },
      birthdate: { type: 'date', required: true },
      ssn: { type: 'int', required: true },
    };
  }
}

module.exports = Person;