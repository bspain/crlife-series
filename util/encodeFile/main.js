const fs = require('fs');

fs.readFile(process.argv[2], { encoding: 'UTF-8' }, (err, data) => {
    console.log(encodeURIComponent(data));
})