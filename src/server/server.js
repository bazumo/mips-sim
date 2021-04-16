'use strict';

import express from 'express';

const servedFiles = {
  '/': 'dist',
};


const app = express();


for (const key of Object.keys(servedFiles)) {
  app.use(key, express.static(servedFiles[key]));
}

app.listen(3000, function() {
  console.log('Running server on port 3000');
});
