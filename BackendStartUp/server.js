const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');


// Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
//son funciones que ayudan a procesar antes que lleguen al url
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
})); // cada vez que resivamos informacion el servidor puede entenderlo

app.use(cors());
//algo de seguridad
app.disable('x-powered-by');

/*
 * RUTAS
 */

const users = require('./routers/userRouters');

users(app);

//Server is listening
server.listen(app.get('port'), '192.168.1.12' || 'localhost', () =>{
    console.log('Server on port', app.get('port'))
});



//ERROR HADDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

 module.exports = {
     app: app,
     server: server
 }