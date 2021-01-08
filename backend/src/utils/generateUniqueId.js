
const crypto = require('crypto');

module.exports = function createUniqId() {
return crypto.randomBytes(4).toString('HEX')
}