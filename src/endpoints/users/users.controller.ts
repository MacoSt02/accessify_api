import { Context } from 'koa';
import * as usersRepository from './users.repository';

export const getUsers = async (ctx: Context) => {
    try {
        const users = await usersRepository.getUsers();
        if (Array.isArray(users) && users.length > 0) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                message: 'Users found',
                data: users,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                success: false,
                message: 'Users not found',
                code: 'NOT_FOUND',
            };
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: 'Error retrieving users: ' + e,
            code: 'INTERNAL_SERVER_ERROR',
        };
    }
};