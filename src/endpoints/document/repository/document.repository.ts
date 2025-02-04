import { getPool } from '../../../database/connect';
import { PostDocumentBody, PutDocumentBody } from './document.model';

export const getDocuments = async () => {
    const pool = getPool();
    const [rows] = await pool.query('SELECT d.document_id, d.document_name, d.document_description FROM documents d WHERE d.deleted_at IS NULL;');
    return rows;
};

export const getDocumentById = async (document_id: number) => {
    const pool = getPool();
    const [rows] = await pool.query('SELECT d.document_name, d.document_description FROM documents d WHERE d.deleted_at IS NULL AND d.document_id = ?;', [document_id]);
    return rows;
};

export const postDocument = async (document: PostDocumentBody) => {
    const pool = getPool();
    const [res] = await pool.query('INSERT INTO documents (document_name, document_description) VALUES (?, ?);', [document.document_name, document.document_description]);
    return res;
};

export const putDocument = async (document_id: number, user: PutDocumentBody) => {
    const pool = getPool();

    const restrictedFields = new Set(['created_at', 'updated_at', 'deleted_at']);

    const fieldsToUpdate = Object.entries(user)
        .filter(([key, value]) => !restrictedFields.has(key) && value !== undefined && value !== null)
        .map(([key]) => `${key} = ?`);

    if (fieldsToUpdate.length === 0) {
        return 'No valid fields to update';
    }

    const setClause = fieldsToUpdate.join(', ');
    const query = `UPDATE documents SET ${setClause} WHERE document_id = ?`;

    const values = [...Object.entries(user)
        .filter(([key, value]) => !restrictedFields.has(key) && value !== undefined && value !== null)
        .map(([, value]) => value), document_id];

    try {
        const [rows] = await pool.query(query, values);
        return rows;
    } catch (e) {
        throw new Error('Database error while updating user' + e);
    }
};


export const deleteDocument = async (document_id: number) => {
    const pool = getPool();
    const [result] = await pool.query('UPDATE documents SET deleted_at = NOW() WHERE document_id = ?;', [document_id]);
    return result;
};