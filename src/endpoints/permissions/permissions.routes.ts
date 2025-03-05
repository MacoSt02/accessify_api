import Application from 'koa';
import Router from 'koa-router';
import { getPermissions, postPermissions, putPermission, deletePermission } from './permissions.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

export const permissionsRoutes = (app: Application) => {
    const permissionsRoutes = new Router();
    permissionsRoutes.prefix('/permissions');
    // GET
    permissionsRoutes.get('/', authMiddleware, getPermissions);
    // POST
    permissionsRoutes.post('/', authMiddleware, postPermissions);
    // PUT
    permissionsRoutes.put('/:permission_id', authMiddleware, putPermission);
    // DELETE
    permissionsRoutes.delete('/:permission_id', authMiddleware, deletePermission);
    app.use(permissionsRoutes.routes());
};