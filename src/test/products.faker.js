import { faker } from "@faker-js/faker"
faker.locale= "es"


export const generateProducts =()=>{
    return{
        
        name:faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        // price: faker.commerce.price({ min: 100, max: 200, dec: 0, symbol: '$' }),
        price: 200,
        quantity: 10,
    };
}
