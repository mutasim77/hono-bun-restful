import { Context } from "hono";

//? Error Handler
export function errorHandler(c: Context) {
    return c.json(({
        success: false,
        message: c.error?.message,
        stack: process.env.NODE_ENV === 'production' ? null : c.error?.stack,
    }))
}

//? Not Found handler
export function notFound(c: Context) {
    return c.json({
        success: false,
        message: `Not Found - [${c.req.method}] ${c.req.url}`
    })
}