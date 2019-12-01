const path = require('path');
const rimraf = require('rimraf');
const fs = require('fs');
const ncp = require('ncp').ncp;


console.log('Starting server pre build...');

const config_src = path.join(__dirname, '../config/')
const server_dist = path.join(__dirname, '../dist/');
const config_dest = path.join(server_dist, '/config/');
const client_indexpage = path.join(__dirname, '../client/index.html');
const client_favicon = path.join(__dirname, '../client/favicon.png');
const client_bundle = path.join(__dirname, '../client/public/bundle.js');
const server_public = path.join(server_dist, '/public/');



console.log(`Cleaning server dist...`);
rimraf.sync(server_dist)

console.log(`Making server dist...`);
fs.mkdirSync(server_dist);
fs.mkdirSync(config_dest);

console.log('Copying Server config');
ncp(config_src, config_dest, () => {
    console.log('done');

    process.exit();
})

// Client
console.log(`Client Index Page: ${client_indexpage}`);
console.log(`Server Public: ${server_public}`);
console.log(`Client bundle: ${client_bundle}`);

console.log('Making server public...');
fs.mkdirSync(server_public);

console.log('Copying index.html');
fs.copyFileSync(client_indexpage, path.join(server_public, "index.html"));

console.log('Copying favicon.png');
fs.copyFileSync(client_favicon, path.join(server_public, 'favicon.png'));

console.log('Copying client bundle');
fs.copyFileSync(client_bundle, path.join(server_public, 'bundle.js'));

