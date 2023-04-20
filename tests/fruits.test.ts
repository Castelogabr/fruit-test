import supertest from "supertest";
import app from "../src/index"

const api = supertest(app);

describe("/fruits", () => {
    it("POST /fruits should respond with code 201", async () => {
        const fruits = {
            name: "Uva",
            price: 10,
        };
        const result = await api.post("/fruits").send(fruits);
        expect(result.status).toBe(201);
    });

    it("POST /fruits should respond with code 409", async () => {
        const fruits = {
            name: "Uva",
            price: 10,
        };
        const result = await api.post("/fruits").send(fruits);
        expect(result.status).toBe(409);
    });

    describe("GET /fruits", () => {
        it("should get all fruits", async () => {
    
            const result = await api.get('/fruits');
            expect(result.status).toBe(200)
            expect(result.body).toEqual([
                {
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number), 
                }
            ])
        })
    })
    
    describe('GET /fruits/:id', () => {
        it('should respond with status 404', async () => {
            const result = await api.get('/fruits/3');

            expect(result.status).toBe(404);
        })

        it('should respond with status 200', async () => {
            const fruits = {
                "name": "Uva",
                "price": 10
            };

            await api.post('/fruits').send(fruits);
            const result = await api.get('/fruits/1');

            expect(result.body.id).toEqual(1);
            expect(result.status).toBe(200)
        })
    })
})