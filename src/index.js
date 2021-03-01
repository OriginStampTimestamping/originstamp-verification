var fs = require('fs');
const verify = require ('./dist/bundle');

const xml = fs.readFileSync('./src/assets/btc.xml').toString();

verify.validateMerkleTree (xml);