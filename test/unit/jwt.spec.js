
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const {jwtSign, jwtVerify} = require("./../../lib/jwt.js");

let token;
describe('test JWT', () => {
    it('cria JWT', () => {    
        token = jwtSign({_id: '123123'});
        expect(token).to.be.an('string');
    });

    it('valida JWT', () => {
        decodetoken = jwtVerify(token);
        decodetoken.data._id.should.equal('123123');
    });

    it('errado JWT', () => {    
        token2 = token.slice(0, token.length - 1) + 'wrfevhy';
        decodetoken = jwtVerify(token2);
        decodetoken.should.equal(false);
    });
});
