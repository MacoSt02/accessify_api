import { getPool } from '../../database/connect';

export const getUsers = async (search?: string) => {
    const pool = getPool();

    const cols = ['u.user_id', 'u.email', 'ur.role_id', 'r.role_name'];
    let params: string[] = [];

    let query = `
        SELECT ${cols.join(', ')}, CASE WHEN u.deleted_at IS NULL THEN 1 ELSE 0 END AS Active, u.created_at, u.updated_at, u.deleted_at
        FROM users u LEFT JOIN user_roles ur ON u.user_id = ur.user_id LEFT JOIN roles r ON ur.role_id = r.role_id
    `;

    if (search) {
        const conditions = cols.map(col => `${col.split(' AS ')[0]} LIKE ?`).join(' OR ');
        query += `WHERE ${conditions}`;
        params = Array(cols.length).fill(`%${search}%`);
    }

    const [rows] = await pool.query(query += ';', params);
    return rows;
};

export const deleteUser = async (user_id: number) => {
    const pool = getPool();
    const [result] = await pool.query('UPDATE users u SET u.deleted_at = NOW() WHERE u.user_id = ?;', [user_id]);
    return result;
};