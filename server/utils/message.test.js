var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message')

describe('generateMessage', () =>{
    it('should generate correct message object',() =>{
        var from = 'test@test.com';
        var text = 'hello world';
        var res = generateMessage(from, text);

        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(typeof res.createAt).toBe('number');
    })
});

describe('generateLocationMessage', () =>{
    it('should generate correct location object', () =>{
        var from = 'Deb';
        var latitude = 15;
        var longitude = 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from, latitude, longitude);        
        expect(typeof message.createAt).toBe('number');
        expect(message).toInclude({from, url});
    });
});