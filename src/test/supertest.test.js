    import chai from "chai";
    import supertest from "supertest";

    const expect = chai.expect;
    const requester = supertest('http://localhost:8080')

    describe('testing del cart', ()=>{
        it('el end point / deberia crear un cart correctamente', async ()=>{
            const {
                statuscode,
                ok,
                _body

            } = await requester.post('/')
            console.log(statuscode);
            console.log(ok);
            console.log(_body)
        })
        it('tiene que crear un usuario', async ()=>{
            const newUser = {
                first_name: 'usuario test',
                last_name: 'apellido test',
                email:'test@ru.ru',
                age:999,
                password: '123',
                role: 'user'


            }
            const newNewUser= await requester.post('/register').send(newUser)
            console.log(newNewUser)
            expect(newNewUser).to.have.status(200)
        })
    })