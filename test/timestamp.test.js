const expect = require('chai').expect;
const path = require('path');

const timestamp = require('../index').timestamp;

describe('timestamp microservice', () => {
  describe('request handler', () => {
    it('returns an object with `unix` and `natural` properties', () => {
      expect(timestamp()).to.have.property('unix');
      expect(timestamp()).to.have.property('natural');
    });

    it('`unix` and `natural` values are null if passed invalid date', () => {
      const foo = timestamp('not a valid date');
      expect(foo).to.have.property('unix', null);
      expect(foo).to.have.property('natural', null);

      const bar = timestamp('');
      expect(bar).to.have.property('unix', null);
      expect(bar).to.have.property('natural', null);
    });
  });
});
