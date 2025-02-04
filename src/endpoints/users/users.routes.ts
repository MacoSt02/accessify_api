import Application from 'koa';
import Router from 'koa-router';
import { getUsers } from './users.controller';

export const usersRoutes = (app: Application) => {
    const usersRoutes = new Router();
    usersRoutes.prefix('/users');

    // GET
    usersRoutes.get('/', getUsers);

    // POST

    // PUT

    // DELETE

    app.use(usersRoutes.routes());
};