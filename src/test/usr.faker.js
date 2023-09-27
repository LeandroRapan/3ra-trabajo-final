import { faker} from "@faker-js/faker"
faker.locale = "es"

export const generateUsr = ()=> {
    return{
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: '123',
        age: 30

    }
}