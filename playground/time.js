var moment = require('moment');
// jan 1st 1970 00:00:00 am
// new Date().getTime();

// var date = new Date();
// console.log(date.getMonth());
var date = moment();
console.log(date.format('d/M/YYYY'));