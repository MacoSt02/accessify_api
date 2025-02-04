import { Context } from 'koa';
import bcrypt from 'bcryptjs';
import * as authRepository from './auth.repository';
import { SignupUserBody } from './auth.model';

export const signUp = async (ctx: Context) => {
    try {
        const user = ctx.request.body as SignupUserBody;

        const userExists = await authRepository.getUserByEmail(user.email);
        if (Array.isArray(userExists) && userExists.length > 0) {
            ctx.status = 400;
            ctx.body = {
                success: false,
                message: 'User already exists, please login',
                code: 'USER_ALREADY_EXISTS',
            };
            return;
        }

        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);

        await authRepository.signupUser(user);
        ctx.status = 200;
        ctx.body = {
            success: true,
            message: 'User signed up successfully',
        };
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: 'Error retrieving users: ' + e,
            code: 'INTERNAL_SERVER_ERROR',
        };
    }
};