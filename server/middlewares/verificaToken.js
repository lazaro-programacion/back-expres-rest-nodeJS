const jwt = require('jsonwebtoken');

/*=============================================
   =            verifica token            =
=============================================*/
const verificaToken = (req, res, next) => {
    let token = req.get('token')

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    msg: 'Token no valido'
                }
            })
        }
        req.usuario = decoded.Usuario;
        console.log('decoded', decoded)
        console.log('este',req.usuario)
        next()
    })
}



module.exports = {
    verificaToken
}