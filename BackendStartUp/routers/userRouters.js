const UserController = require('../controllers/usersController');
const User = require('../models/user');

module.exports = (app) =>{

    // obtener datos
    app.get('/api/users/getAll', UserController.getAll);

    // inserción de datos
    app.post('/api/users/create', UserController.register);

};