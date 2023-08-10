import {
    getAllService,
    getByIdService,
    createService,
    updateService,
    deleteService,
    createProductMock,
    // agregationProductsService,
    
} from "../01-services/products.services.js"

export const getAllProductsController = async (req, res, next) =>{
    try {
        const {page, limit, query, sort} = req.query
        const docsP = await getAllService(query, page, limit, sort)
        const nextLink = docsP.hasNextPage?`http://localhost:8080/products?page=${docsP.nextPage}`: null
        const prevLink = docsP.hasPrevPage?`http://localhost:8080/products?page=${docsP.prevPage}`: null
         res.json({
            
            payload: docsP.docs,
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
        res.json(doc)
    } catch (error) {
        next(error)
    }
}
export const createProductController= async (req, res, next) =>{
    try {
        const { name, description, price, quantity } = req.body
        const newProduct = await createService({
            name,
            description, 
            price,
            quantity
        });
        res.json(newProduct)

    } catch (error) {
        next(error)
        
    }
}
export const updateProductController = async (req, res, next) =>{
    try {
        const { id } = req.params
        const { name, description, price, stock} = req.body;
        let doc = await  getByIdService(id);
        const update = await updateService(
            id,
            { name, description, price, stock }
        )
        res.json(update)
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

export const createProductMockController = async (req,res) =>{
   const {quantity}=req.query
    try {
        const response = await createProductMock(quantity);
        res.status(280).json({users:response})
    } catch (error) {
        console.log(error)
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