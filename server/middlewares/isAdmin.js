/*=============================================
    =          VERFIFICAR  ADMIN            =
=============================================*/
const isAdmin = (req, res, next) => {

    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                msg: 'El usuario no es administrador'
            }
        })
    }

}


module.exports = {
    isAdmin
}