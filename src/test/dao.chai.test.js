import '../db/database.js';
import ProductsDaoMongoDB from "../00-daos/mongodb/products.dao.js";

import { expect } from "chai";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
describe('test unitarios en el DAO de products', () => {
   let productsDao;
before(()=>{
    mongoose.set('strictQuery', true);
    console.log('conectado a mongo')
 productsDao = new ProductsDaoMongoDB()
    
     
      
      console.log('inicializado del DAO')
   });
   after(() => {
      console.log('pruebas finalizadas')
   });

   it('deberia traer todos los productos', async () => {
   
      const products = await productsDao.getAllProducts();
      expect(Array.isArray(products.docs)).to.be.equal(true);
      expect(products.length !== 0).to.be.equal(true)
      
   });

   it('deberia crear un nuevo producto', async () => {
      const newProduct = {
         name: 'producto del test chai+mocha',
         description: 'idem',
         price: 111111111111111111111111,
         quantity: 666,
         owner: 999
      }
      const newProductIn = await productsDao.createProduct(newProduct);
      expect(newProductIn.name).to.be.equal(newProduct.name);
   });

   it('eliminar doc', async () => {
      const newProductToEliminate = {
         name: 'producto por ser eliminado',
         description: 'pobre',
         price: 1,
         quantity: 1
      };
      const creation = await productsDao.createProduct(newProductToEliminate);
      const elimination = await productsDao.deleteProduct(creation._id);
      expect(elimination._id.toString()).to.be.equal(creation._id.toString());
   });
})