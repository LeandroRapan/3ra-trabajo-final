import {
    getAllService,
    getByIdService,
    createService,
    updateService,
    deleteService,
    createProductMock,
    // agregationProductsService,
    
} from "../01-services/products.services.js"
import { isOwner } from "../middlewares/authVerification.js"
import { HttpResponse } from "../utils/http.response.js"
import productResDto from "../utils/product.res.dto.js"
const httpResponse = new HttpResponse()
export const getAllProductsController = async (req, res, next) =>{
    try {
        const {page, limit, query, sort} = req.query
        const docsP = await getAllService(query, page, limit, sort)
        const nextLink = docsP.hasNextPage?`http://localhost:8080/products?page=${docsP.nextPage}`: null
        const prevLink = docsP.hasPrevPage?`http://localhost:8080/products?page=${docsP.prevPage}`: null
       let prodDto = docsP.docs.map(obj=> new productResDto(obj));
         res.json({
            
            payload: prodDto,
            info:{
                status: docsP.status,
                pages:docsP.totalPages,
                // nextPage,
                // prevPage,
                // hasNextPage,
                // hasPrevPage,
                nextLink,
                prevLink
                

            }
        }

        ) 
        // res.json(docsP)
    } catch (error) {
        next(error)
    }
}
export const getProductByIdController= async (req, res, next) =>{
    try {
        const { id }= req.params;
        const doc= await getByIdService(id)
        let docDto = new productResDto(doc)
        res.json(docDto)
    } catch (error) {
        next(error)
    }
}
export const createProductController= async (req, res, next) =>{
    try {
        const { name, description, price, quantity, owner } = req.body
        if(name==undefined || description==undefined ||price==undefined || quantity ==undefined){throw new Error('los datos estan incompletos')}
        const newProduct = await createService({
            name,
            description, 
            price,
            quantity,
            owner
        });
        let prodDto = new productResDto(newProduct)
        res.json(prodDto)

    } catch (error) {
        next(error)
        
    }
}
export const updateProductController = async (req, res, next) =>{
    try {
        const { id } = req.params
        const { name, description, price, stock} = req.body;
        let doc = await  getByIdService(id);
        console.log(doc);
        isOwner(doc.owner)
        const update = await updateService(
            id,
            { name, description, price, stock }
        )
        let resDto = new productResDto(update) 
        res.json(resDto)
    } catch (error) {
        next(error)
    }
}
export const deleteProductController = async (req, res, next) =>{
    try {
        const { id }= req.params;
        await deleteService(id);
        res.send('producto borrado')
    } catch (error) {
        
    }
}

export const createProductMockController = async (req,res,next) =>{
   const {quantity}=req.query
    try {
        const response = await createProductMock(quantity);
        return httpResponse.Ok(res, response)
    } catch (error) {
        next(error)
    }
}
// export const agregtionProductsController = async (req, res, next) =>{
//     try {
//         const {page, limit}= req.query
//         const response = await agregationProductsService()
//         res.json(response)
//     } catch (error) {
//         console.log(error)
        
//     }
// }