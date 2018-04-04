var generateMessage = (from, text) =>{
    return {
        from,
        text,
        createAt: new Date().getTime()
    };
};
var generateLocationMessage = (from, lat, long) =>{
    return {
        from,
        url:`https://www.google.com/maps?q=${lat},${long}`,
        createAt: new Date().getTime()
    };
};

module.exports = {generateMessage,generateLocationMessage};