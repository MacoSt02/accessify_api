import Application from 'koa';
import Router from 'koa-router';
import { signUp } from './auth.controller';

export const authRoutes = (app: Application) => {
    const authRoutes = new Router();
    authRoutes.prefix('/');

    // GET

    // POST
    authRoutes.post('/signup', signUp);

    // PUT

    // DELETE

    app.use(authRoutes.routes());
};