import { UserController } from './../controllers/UserController';
import { Hono } from "hono";

const app = new Hono();
const user = new UserController();

//! Get all users
app.get('/', (c) => user.getUsers(c));

//! Get a single user
app.get('/:id', (c) => user.getUserById(c))

//! Create a new user
app.post('/', (c) => user.createUser(c));

//! Update a user
app.put('/:id', (c) => user.updateUser(c));

//! Delete a user
app.delete('/:id', (c) => user.deleteUser(c));


export default app;