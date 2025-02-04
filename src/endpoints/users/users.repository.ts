import { getPool } from '../../database/connect';

export const getUsers = async () => {
    const pool = getPool();
    const [rows] = await pool.query('SELECT u.user_id, u.email FROM users u WHERE u.deleted_at IS NULL;');
    return rows;
};