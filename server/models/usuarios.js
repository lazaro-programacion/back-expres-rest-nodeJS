/*                   _      _
                    | |    | |
 _ __ ___   ___   __| | ___| |
| '_ ` _ \ / _ \ / _` |/ _ \ |
| | | | | | (_) | (_| |  __/ |
|_| |_| |_|\___/ \__,_|\___|_|

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
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE', 'GOD_ROLE'],
    message: '{VALUE} no es un rol valido'
}
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
/*=============================================
 =       para no delvolver el password       =
=============================================*/
usuarioSchema.methods.toJSON = function() {
   let user = this;
   let userObject = user.toObject();
   delete userObject.password;
   return userObject
}

/*=============================================
 =       si usas uniqueValidatorS       =
=============================================*/
usuarioSchema.plugin( uniqueValidator, {message: '{PATH} debe de ser unico'})

module.exports = mongoose.model('Usuario', usuarioSchema)