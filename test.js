const commandParser = require('./commandParser');
const commands = require('./commands');

const cmd = new commands();
const cmdParser = new commandParser(cmd.getHandlers());

const res0 = cmdParser.handle('timi help');
console.log(res0)

const res1 = cmdParser.handle('timi ask How are you today? Good / Bad / So so')
console.log(res1)

const res2 = cmdParser.handle('timi ask')
console.log(res2)

const res3 = cmdParser.handle('timi')
console.log(res3)

