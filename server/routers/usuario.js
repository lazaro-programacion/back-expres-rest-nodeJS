/*               _
                | |
 _ __ ___  _   _| |_ ___ _ __
| '__/ _ \| | | | __/ _ \ '__|
| | | (_) | |_| | ||  __/ |
|_|  \___/ \__,_|\__\___|_|
                                                    ███
                                                   ░░░
 █████ ████  █████  █████ ████  ██████   ████████  ████   ██████
░░███ ░███  ███░░  ░░███ ░███  ░░░░░███ ░░███░░███░░███  ███░░███
 ░███ ░███ ░░█████  ░███ ░███   ███████  ░███ ░░░  ░███ ░███ ░███
 ░███ ░███  ░░░░███ ░███ ░███  ███░░███  ░███      ░███ ░███ ░███
 ░░████████ ██████  ░░████████░░████████ █████     █████░░██████
  ░░░░░░░░ ░░░░░░    ░░░░░░░░  ░░░░░░░░ ░░░░░     ░░░░░  ░░░░░░
*/

/*=============================================
        =            Requires            =
=============================================*/
const express = require('express');
const Usuario = require('../models/usuarios')
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken, } = require('../middlewares/verificaToken');
const { isAdmin } = require('../middlewares/isAdmin')
const app = express();


/*=============================================
      =            Rutas            =
=============================================*/


/*----------  Usuario GET  ----------*/
app.get('/usuario', verificaToken, (req, res) => {

    /* Paginacion */
    let desde = req.query.desde || 0
    desde = Number(desde)
    let limit = req.query.limit || 5
    limit = Number(limit)

    Usuario.find({ estado: true }, 'nombre email role google img estado').skip(desde).limit(limit).exec((err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        Usuario.count({ estado: true }, (err, total) => {
            res.status(200).json({
                ok: true,
                usuarios,
                total
            })
        })


    })
})

/*----------  Usuario POST  ----------*/
app.post('/usuario', [verificaToken, isAdmin], (req, res) => {
    let body = req.body;

    const usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        })
    })

})

/*----------  Usuario PUT  ----------*/
app.put('/usuario/:id', [verificaToken, isAdmin], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        })

    })
})

/*----------  Usuario DELET  ----------*/
app.delete('/usuario/:id', [verificaToken, isAdmin], (req, res) => {
    let id = req.params.id;
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    msg: 'Usuario no encontrado'
                }
            })
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
})


/*=====  End of Rutas  ======*/

module.exports = app
