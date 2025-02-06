import { RowDataPacket } from 'mysql2';
import { getPool } from '../../database/connect';
import { SignupUsersBody, UsersBody } from './auth.model';

export const getUserByEmail = async (email: string) => {
    const pool = getPool();
    const [rows] = await pool.query<RowDataPacket[]>('SELECT u.user_id, u.email, u.password FROM users u WHERE u.email = ?;',[email]);
    return rows.length > 0 ? (rows[0] as UsersBody) : null;
};

export const signupUser = async (user: SignupUsersBody) => {
    const pool = getPool();
    const [rows] = await pool.query('INSERT INTO users (email, password) VALUES (?, ?);',[user.email, user.password]);
    return rows;
};