import { Hono } from 'hono'
import { errorHandler, notFound } from './src/middlewares/error'

//? Init the Hone App;
const app = new Hono().basePath('/api/v1');

//? Home Route
app.get('/', (c) => c.text('Welcome to the API'));

//? User Routes
app.route('/users');

//? Error Handler
app.onError((err, c) => {
    const error = errorHandler(c);
    return error;
});

//? Not Found Handler
app.notFound((c) => {
    const error = notFound(c);
    return error;
});

const port = Bun.env.PORT || 8000

export default {
    port,
    fetch: app.fetch,
} 