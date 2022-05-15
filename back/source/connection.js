const monk = require('monk');

let dbUri = process.env.DB_URL;
const db = monk(dbUri);

module.exports = db;