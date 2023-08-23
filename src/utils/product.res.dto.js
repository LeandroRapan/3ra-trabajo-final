export default class productResDto{
    constructor(product){
        this.nombre= product.name,
        this.precio= product.price,
        this.stock= product.quantity 
    }

}