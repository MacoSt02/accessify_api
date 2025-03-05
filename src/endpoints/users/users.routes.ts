import Application from 'koa';
import Router from 'koa-router';
import { getUsers, deleteUser } from './users.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

export const usersRoutes = (app: Application) => {
    const usersRoutes = new Router();
    usersRoutes.prefix('/users');
    // GET
    usersRoutes.get('/', authMiddleware, getUsers);
    // POST

    // PUT

    // DELETE
    usersRoutes.delete('/:user_id', authMiddleware, deleteUser);
    app.use(usersRoutes.routes());
};