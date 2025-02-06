import { Context } from 'koa';
import bcrypt from 'bcryptjs';
import * as authRepository from './auth.repository';
import { SignupUsersBody, UsersBody } from './auth.model';
import jwt from 'jsonwebtoken';

export const signupUser = async (ctx: Context) => {
    try {
        const user = ctx.request.body as SignupUsersBody;

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

export const loginUser = async (ctx: Context) => {
    try {
        const { email, password } = ctx.request.body as SignupUsersBody;
        if (!email || !password) {
            ctx.status = 400;
            ctx.body = {
                success: false,
                error: 'Email and password are required',
                code: 'MISSING_CREDENTIALS',
            };
            return;
        }

        const user = await authRepository.getUserByEmail(email) as unknown as UsersBody | undefined;
        if (!user) {
            ctx.status = 401;
            ctx.body = {
                success: false,
                error: 'Invalid email or password',
                code: 'INVALID_CREDENTIALS',
            };
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            ctx.status = 401;
            ctx.body = {
                success: false,
                error: 'Invalid email or password',
                code: 'INVALID_CREDENTIALS',
            };
            return;
        }

        const token = jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
            },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' },
        );

        ctx.cookies.set('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 3600 * 1000,
        });

        ctx.status = 200;
        ctx.body = {
            success: true,
            message: 'Log In OK',
        };
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: 'Invalid email or password: ' + e,
            code: 'INTERNAL_SERVER_ERROR',
        };
    }
};

export const logoutUser = async (ctx: Context) => {
    try {
        ctx.cookies.set('authToken', null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
        });

        ctx.status = 200;
        ctx.body = {
            success: true,
            message: 'Log Out succesfuly',
        };
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: 'Invalid email or password: ' + e,
            code: 'INTERNAL_SERVER_ERROR',
        };
    }
};