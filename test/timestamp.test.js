const expect = require('chai').expect;

const timestamp = require('../index').timestamp;

describe('timestamp microservice', () => {
  describe('request handler', () => {
    it('returns an object with `unix` and `natural` properties', () => {
      expect(timestamp()).to.have.property('unix');
      expect(timestamp()).to.have.property('natural');
    });

    it('`unix` and `natural` values are null if passed invalid parameter', () => {
      const foo = timestamp('not a valid date');
      expect(foo).to.have.property('unix', null);
      expect(foo).to.have.property('natural', null);

      const bar = timestamp('');
      expect(bar).to.have.property('unix', null);
      expect(bar).to.have.property('natural', null);
    });

    it('returns proper `unix` and `natural` when passed valid unix timestamp', () => {
      const foo = timestamp(1450137600);
      expect(foo).to.have.property('unix', 1450137600);
      expect(foo).to.have.property('natural', 'December 15, 2015');

      const bar = timestamp(1461381650);
      expect(bar).to.have.property('unix', 1461381650);
      expect(bar).to.have.property('natural', 'April 23, 2016');
    });

    it('returns proper `unix` and `natural` when passed valid natural date', () => {
      const foo = timestamp('December%2015,%202015');
      expect(foo).to.have.property('unix', 1450137600);
      expect(foo).to.have.property('natural', 'December 15, 2015');

      const bar = timestamp('December 15, 2015');
      expect(bar).to.have.property('unix', 1450137600);
      expect(bar).to.have.property('natural', 'December 15, 2015');
    });
  });
});
