'use strict';

/**
 * Based on a set of rules, is the input valid?
 * TODO: Define the rules ... how do we send them in? How do we identify?
 * @param {any} input
 * @returns {boolean}
 */

class Validator {
  constructor(){
  }
  validate(entry){
    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach(field => {
      if (this.schema[field].required) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
          console.warn(`${field} is required`);
        }
      }
      else {
        record[field] = entry[field];
      }
      if (valid) {
        switch(this.schema[field].type){
        case 'string':
          valid = this.isString(record[field]);
          break;
        case 'number':
          valid = this.isNumber(record[field]);
          break;
        case 'int':
          valid = this.isInt(record[field]);
          break;
        case 'date':
          valid = this.isDate(record[field]);
          break;
        }
        if(!valid){
          console.warn(`${field} ${record[field]} is not a ${this.schema[field].type}`);
        }
      }
    });

    return valid ? record : undefined;
  }

  isValid(input, rules) {
    return rules(input);
    // return true;
  }

  /**
   * Is this a string?
   * @param input
   * @returns {boolean}
   */
  isString(input) {
    return typeof input === 'string';
  }

  areStrings(inputs) {
    return inputs.every(x => this.isString(x));
  }

  /**
   * Is this a number?
   * @param input
   * @returns {boolean}
   */
  isNumber(input) {
    return typeof input === 'number';
  }
  
  isInt(input) {
    return parseInt(input);
  }

  /**
   * Is this an array?
   * @param input
   * @returns {boolean}
   */
  isArray(input) {
    return Array.isArray(input);
  }

  /**
   * Is this an object?
   * @param input
   * @returns {boolean}
   */
  isObject(input) {
    return typeof input === 'object';
  }

  /**
   * Is this a boolean?
   * @param input
   * @returns {boolean}
   */
  isBoolean(input) {
    return typeof input === 'boolean';
  }

  /**
   * Is this a function?
   * @param input
   * @returns {boolean}
   */
  isFunction(input) {
    return typeof input === 'function';
  }

  isDate(input){
    return Date.parse(input);
  }
}

module.exports = Validator;