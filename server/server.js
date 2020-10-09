
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

require('../config/config')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()


/*----------  parse application/x-www-form-urlencoded  ----------*/
app.use(bodyParser.urlencoded({ extended: false }))

/*----------  parse application/json  ----------*/
app.use(bodyParser.json())


/*=============================================
      =            Rutas            =
=============================================*/
app.get('/usuario', (req, res) => {
    res.json("getUsuario")
})

app.post('/usuario', (req, res) => {
    let body = req.body;
    try {
        if (body.nombre === undefined) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre no puede estar vacio'
            })
        }
        if (body.apellido === undefined) {
            return res.status(400).json({
                ok: false,
                msg: 'El apellido no puede estar vacio'
            })
        }
        if (body.edad === undefined) {
            return res.status(400).json({
                ok: false,
                msg: 'La edad no puede estar vacio'
            })
        }
        if (body.email === undefined) {
            return res.status(400).json({
                ok: false,
                msg: 'El email no puede estar vacio'
            })
        }
        console.log(body)
        res.status(200).json({
            ok: true,
            body
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }

})

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    console.log(id)
    res.status(200).json({
        ok: true,
        id
    })
})
app.delete('/usuario/:id', (req, res) => {
    res.json("deleteUsuario")
})


/*=====  End of Rutas  ======*/




app.listen(process.env.PORT, () => console.log(`Example app listening on port ` + process.env.PORT))