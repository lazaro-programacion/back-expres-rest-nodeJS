/*
  █████████
 ███░░░░░███
░███    ░░░   ██████  ████████  █████ █████  ██████  ████████
░░█████████  ███░░███░░███░░███░░███ ░░███  ███░░███░░███░░███
 ░░░░░░░░███░███████  ░███ ░░░  ░███  ░███ ░███████  ░███ ░░░
 ███    ░███░███░░░   ░███      ░░███ ███  ░███░░░   ░███
░░█████████ ░░██████  █████      ░░█████   ░░██████  █████
 ░░░░░░░░░   ░░░░░░  ░░░░░        ░░░░░     ░░░░░░  ░░░░░
*/

/*=============================================
        =            Requires            =
=============================================*/

require('./config/config')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


/*----------  parse application/x-www-form-urlencoded  ----------*/
app.use(bodyParser.urlencoded({ extended: false }))

/*----------  parse application/json  ----------*/
app.use(bodyParser.json())


/*----------  configuracion global de rutas  ----------*/
app.use(require('./routers/index'))


/*=============================================
=            conexion base de datos            =
=============================================*/

mongoose.connect(process.env.URLDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err, res) => {
        if (err) {
            throw err;
        }

        console.log('Conectado a mongoDB')
    });


/*=============================================
=            Escuchando el puerto            =
=============================================*/

app.listen(process.env.PORT, () => console.log(`Escuchando en el puerto: ` + process.env.PORT))