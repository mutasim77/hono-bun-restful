import { Context } from "hono";
import { Database } from "../config";
import { UserTable } from "../schema";
import { eq } from "drizzle-orm";

export class UserController {
    /**
     * Get all users.
     * GET: /api/v1/users/
     * 
     * @param ctx - The context of the request.
     * @returns JSON response containing all users.
     */
    async getUsers(ctx: Context) {
        const db = (await Database.getInstance()).getDB();
        const allUsers = await db.select().from(UserTable);

        return ctx.json({
            success: true,
            data: allUsers,
        })
    }

    /**
     * Get a user by ID.
     * GET: /api/v1/users/:id
     * 
     * @param ctx - The context of the request, which includes the user ID in the URL params.
     * @returns JSON response containing the user data.
     */
    async getUserById(ctx: Context) {
        const id = Number(ctx.req.param("id"));
        const db = (await Database.getInstance()).getDB();

        const user = await db.select().from(UserTable).where(eq(UserTable.id, id));
        if (!user.length) {
            return ctx.json({
                success: false,
                message: 'User not found',
            })
        }

        return ctx.json({
            success: true,
            data: user,
        })
    }

    /**
     * Create a new user.
     * POST: /api/v1/users/
     * 
     * @param ctx - The context of the request, which includes the request body with name, email, and password.
     * @returns JSON response indicating success or failure of user creation.
    */
    async createUser(ctx: Context) {
        const { name, email, password } = await ctx.req.json();
        const db = (await Database.getInstance()).getDB();

        //? First check if User already exists
        const userExists = await db
            .select()
            .from(UserTable)
            .where(eq(UserTable.email, email));

        if (userExists.length) {
            return ctx.json({
                success: false,
                message: 'User already exists',
            })
        }

        //? Create a new User;
        const user = await db.insert(UserTable).values({
            name,
            email,
            password,
        }).returning();

        return ctx.json({
            success: true,
            message: 'User created successfully',
            data: user,
        });
    }

    /**
     * Update a user by ID.
     * PUT: /api/v1/users/:id
     * 
     * @param ctx - The context of the request, which includes the user ID in the URL params and the updated data in the request body.
     * @returns JSON response indicating success or failure of user update.
     */
    async updateUser(ctx: Context) {
        const id = Number(ctx.req.param("id"));
        const { name, email, password } = await ctx.req.json();
        const db = (await Database.getInstance()).getDB();

        const user = await db.select().from(UserTable).where(eq(UserTable.id, id));

        if (!user.length) {
            return ctx.json({
                success: false,
                message: 'User not found',
            })
        }

        const updatedUser = await db.update(UserTable)
            .set({ name, email, password })
            .where(eq(UserTable.id, id))
            .returning();

        return ctx.json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    }

    /**
     * Delete a user by ID.
     * DELETE: /api/v1/users/:id
     * 
     * @param ctx - The context of the request, which includes the user ID in the URL params.
     * @returns JSON response indicating success or failure of user deletion.
     */
    async deleteUser(ctx: Context) {
        const id = Number(ctx.req.param("id"));
        const db = (await Database.getInstance()).getDB();

        const user = await db.select().from(UserTable).where(eq(UserTable.id, id));

        if (!user.length) {
            return ctx.json({
                success: false,
                message: 'User not found',
            });
        }

        await db.delete(UserTable).where(eq(UserTable.id, id));

        return ctx.json({
            success: true,
            message: 'User deleted successfully',
        });
    }
}