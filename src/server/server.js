'use strict';

import express from 'express';

const servedFiles = {
  '/': 'dist/index.html',
  '/index.html': 'dist/index.html',
  '/bundle.js': 'dist/bundle.js'
};


const app = express();


for (let key of Object.keys(servedFiles)) {
  app.use(key, express.static(servedFiles[key]));
}

app.listen(3000, function () {
  console.log('Running server on port 3000');
});
