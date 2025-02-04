import Application from 'koa';
import Router from 'koa-router';
import { getDocuments, getDocumentById, postDocument, putDocument, deleteDocument } from './document.controller';
import { auth } from '../../middlewares/auth';

export const documentRoutes = (app: Application) => {
    const documentRoutes = new Router();
    documentRoutes.prefix('/document');

    // GET
    documentRoutes.get('/', auth, getDocuments);
    documentRoutes.get('/:document_id', auth, getDocumentById);

    // POST
    documentRoutes.post('/', auth, postDocument);

    // PUT
    documentRoutes.put('/:document_id', auth, putDocument);

    // DELETE
    documentRoutes.delete('/:document_id', auth, deleteDocument);

    app.use(documentRoutes.routes());
};
