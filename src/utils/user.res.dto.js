export default class userResDto {
    constructor(user){
        this.nombre = user.first_name + ' ' +user.last_name,
        this.correo = user.email,
        this.tipo_de_cuenta = user.role
    }
}