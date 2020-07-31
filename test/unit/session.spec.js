
const chai = require("chai");
const sinon = require('sinon');
const expect = chai.expect;
const should = chai.should();
const {sessionApp} = require("./../../middleware/session.js");

describe('test Token no header', () => {
    it('token OK', () => {
        const req = {
            headers : {
                authorization: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlhdCI6MTU5NjE5OTMzMywiZXhwIjoxNTk2ODA0MTMzfQ.lGgFxJNhyVx3aFf3JkMdlZmLzdV78sgS5-8adB9epU52rrIUbsucx8TzVhve6MigeGo-KucAYhi6r3DOxLG5G3kH5RnVyNsAYyd9ZC8ayT_ZUIfC3azaD0PD_Fy1gQIX9VJrb_1Wv1cgXIPo1LpsYUU8sQOqfmqrl9fpuIy82zXsg4dPEB0kAk4B_epPMIQv420rVCeygus7D8rRX83FTZynaPdNPxVOMyKBYuhoBons13dH6QJYZnUR3ud2UpJWEMgVF7-uldEHnUgTfJ5KnZrphvatjSv1ThAUyaixLCo-uOEuKQ8nuyD0fmE7T1dJLzDxFlRydJtLDDC0qT0w5A'
            } 
        }
        const res = {locals: {}}
        const next = () => {};
        const spy = sinon.spy(next);

        sessionApp(req, res, spy)
        console.log(res);
        expect(spy.callCount).to.equal(1);
        res.locals.token.should.equal('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlhdCI6MTU5NjE5OTMzMywiZXhwIjoxNTk2ODA0MTMzfQ.lGgFxJNhyVx3aFf3JkMdlZmLzdV78sgS5-8adB9epU52rrIUbsucx8TzVhve6MigeGo-KucAYhi6r3DOxLG5G3kH5RnVyNsAYyd9ZC8ayT_ZUIfC3azaD0PD_Fy1gQIX9VJrb_1Wv1cgXIPo1LpsYUU8sQOqfmqrl9fpuIy82zXsg4dPEB0kAk4B_epPMIQv420rVCeygus7D8rRX83FTZynaPdNPxVOMyKBYuhoBons13dH6QJYZnUR3ud2UpJWEMgVF7-uldEHnUgTfJ5KnZrphvatjSv1ThAUyaixLCo-uOEuKQ8nuyD0fmE7T1dJLzDxFlRydJtLDDC0qT0w5A')
        
    });
});


describe('test Token não esta presente no header', () => {
    it('token não esta presente no header', () => {
        const req = {
            headers : {
            } 
        }
        const res = {locals: {}}
        const next = () => {};
        const spy = sinon.spy(next);
        
        

        sessionApp(req, res, spy)
        expect(spy.callCount).to.equal(1);
        expect(spy.firstCall.args.length).to.equal(1);

                
    });
});


describe('test Token modificado', () => {
    it('token modificado', () => {
        const req = {
            headers : {
            } 
        }
        const res = {locals: {}}
        const next = () => {};
        const spy = sinon.spy(next);
        
        

        sessionApp(req, res, spy)
        expect(spy.callCount).to.equal(1);
        expect(spy.firstCall.args.length).to.equal(1);

                
    });
});