import { describe, expect, it } from 'bun:test'
import app from '../server'

describe('Test API', () => {
    it('Should return 200 Response', async () => {
        const req = new Request('http://localhost/')
        const res = await app.fetch(req)
        expect(res.status).toBe(200)
    })

    it('Should return 400 Response', async () => {
        const req = new Request('http://localhost/notfound')
        const res = await app.fetch(req)
        expect(res.status).toBe(404)
    })
})