var expect = require('expect');

var {generateMessage} = require('./message')

describe('generateMessage', () =>{
    it('should generate correct message object',() =>{
        var from = 'test@test.com';
        var text = 'hello world';
        var res = generateMessage(from, text);

        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        // expect(res).toMatchObject({
        //     from:from,
        //     text: text
        //  });
        expect(typeof res.createAt).toBe('number');
    })
});