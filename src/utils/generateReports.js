// Requiring the module
const fs = require('fs');


function generateReports(fileName, data) {
    fs.writeFileSync(fileName, data);
}

module.exports = generateReports;




