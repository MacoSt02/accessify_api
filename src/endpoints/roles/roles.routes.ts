import Application from 'koa';
import Router from 'koa-router';
import { getRoles, postRole, putRole, deleteRole } from './roles.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

export const rolesRoutes = (app: Application) => {
    const rolesRoutes = new Router();
    rolesRoutes.prefix('/roles');
    // GET
    rolesRoutes.get('/', authMiddleware, getRoles);
    // POST
    rolesRoutes.post('/', authMiddleware, postRole);
    // PUT
    rolesRoutes.put('/:role_id', authMiddleware, putRole);
    // DELETE
    rolesRoutes.delete('/:role_id', authMiddleware, deleteRole);
    app.use(rolesRoutes.routes());
};