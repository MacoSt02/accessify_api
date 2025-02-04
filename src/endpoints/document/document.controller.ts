import { Context } from 'koa';
import * as documentRepository from './repository/document.repository';
import { PostDocumentBody, PutDocumentBody } from './repository/document.model';

export const getDocuments = async (ctx: Context) => {
    try {
        const documents = await documentRepository.getDocuments();
        if (Array.isArray(documents) && documents.length > 0) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                message: 'Documents found',
                data: documents,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                success: false,
                message: 'Documents not found',
                code: 'NOT_FOUND',
            };
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: 'Error retrieving documents: ' + e,
            code: 'INTERNAL_SERVER_ERROR',
        };
    }
};

export const getDocumentById = async (ctx: Context) => {
    try {
        const document = await documentRepository.getDocumentById(Number(ctx.params.document_id));
        if (Array.isArray(document) && document.length > 0) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                message: 'Document found',
                data: document,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                success: false,
                message: 'Document not found',
                code: 'NOT_FOUND',
            };
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: 'Error retrieving document: ' + e,
            code: 'INTERNAL_SERVER_ERROR',
        };
    }
};

export const postDocument = async (ctx: Context) => {
    try {
        const body = ctx.request.body as PostDocumentBody;
        if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
            ctx.status = 400;
            ctx.body = {
                success: false,
                message: 'Request body is required',
                code: 'BAD_REQUEST',
            };
        } else {
            await documentRepository.postDocument(body);
            ctx.status = 201;
            ctx.body = {
                success: true,
                message: 'Document created successfully',
            };
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: 'Error creating document: ' + e,
            code: 'INTERNAL_SERVER_ERROR',
        };
    }
};

export const putDocument = async (ctx: Context) => {
    try {
        const body = ctx.request.body as PutDocumentBody;
        const document_id = Number(ctx.params.document_id);
        if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
            ctx.status = 400;
            ctx.body = {
                success: false,
                message: 'Request body is required',
                code: 'BAD_REQUEST',
            };
        } else {
            await documentRepository.putDocument(document_id, ctx.request.body as PostDocumentBody);
            ctx.status = 201;
            ctx.body = {
                success: true,
                message: 'Document updated successfully',
            };
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: 'Error updating document: ' + e,
            code: 'INTERNAL_SERVER_ERROR',
        };
    }
};

export const deleteDocument = async (ctx: Context) => {
    try {
        await documentRepository.deleteDocument(Number(ctx.params.document_id));
        ctx.status = 200;
        ctx.body = {
            success: true,
            message: 'Document deleted successfully',
        };
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: 'Error deleting document: ' + e,
            code: 'INTERNAL_SERVER_ERROR',
        };
    }
};