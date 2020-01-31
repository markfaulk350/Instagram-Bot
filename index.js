require('dotenv').config();
const ig = require('./instagram');

(async () => {

    await ig.init();

    await ig.login(process.env.USERNAME, process.env.PASSWORD);

    debugger;

})()
