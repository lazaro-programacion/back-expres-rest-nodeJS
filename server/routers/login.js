/*               _
                | |
 _ __ ___  _   _| |_ ___ _ __
| '__/ _ \| | | | __/ _ \ '__|
| | | (_) | |_| | ||  __/ |
|_|  \___/ \__,_|\__\___|_|

 ████                     ███
░░███                    ░░░
 ░███   ██████   ███████ ████  ████████
 ░███  ███░░███ ███░░███░░███ ░░███░░███
 ░███ ░███ ░███░███ ░███ ░███  ░███ ░███
 ░███ ░███ ░███░███ ░███ ░███  ░███ ░███
 █████░░██████ ░░███████ █████ ████ █████
░░░░░  ░░░░░░   ░░░░░███░░░░░ ░░░░ ░░░░░
                ███ ░███
               ░░██████
                ░░░░░░
*/
/*=============================================
        =            Requires            =
=============================================*/
const express = require('express');
const Usuario = require('../models/usuarios')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const app = express();

/*=============================================
      =            Rutas            =
=============================================*/

/*----------  login POST  ----------*/
app.post('/login', (req, res) => {
      let body = req.body;

      Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

            /*----------  si existe error  ----------*/
            if (err) {
                  return res.status(500).json({
                        ok: false,
                        err
                  })
            }

            /*----------  si no existe usuario  ----------*/
            if (!usuarioDB) {
                  return res.status(400).json({
                        ok: false,
                        msg: '(Usuario) o contraseña incorrectos'
                  })
            }

            /*----------  si no concide el password  ----------*/
            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                  return res.status(400).json({
                        ok: false,
                        msg: 'Usuario o (contraseña) incorrectos'
                  })
            }

            /*----------  generamos token  ----------*/
            let token = jwt.sign({
                  Usuario: usuarioDB
            }, process.env.SEED,
                  { expiresIn: process.env.CADUCIDAD_TOKEN }
            )

            res.json({
                  ok: true,
                  Usuario: usuarioDB,
                  token
            })
      })

})

/*----------  login PUT  ----------*/
app.put('/login/:id', (req, res) => {
      res.json({
            ok: true,
            msg: 'Estamos en el login'
      })
})

/*----------  login DELET  ----------*/
app.delete('/login/:id', (req, res) => {
      res.json({
            ok: true,
            msg: 'Estamos en el login'
      })
})


/*=====  End of Rutas  ======*/


module.exports = app
