/* 
 * 
 * Rene Arias <renearias@arxis.la>
 */
const express = require('express');
const http = require('http');
const path = require('path');
const compresion = require('compression');
//const api= require('./server/routes/api');

const app = express();

app.use(compresion());
app.use(express.static(path.join(__dirname,'build')));

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname,'build/index.html')); 
});

const port = process.env.PORT || 3001;
app.set('port',port);

const server = http.createServer(app);
server.listen(port,()=>console.log('Runing'));
