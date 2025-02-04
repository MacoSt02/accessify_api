import { getPool } from '../../database/connect';
import { SignupUserBody } from './auth.model';

export const getUserByEmail = async (email: string) => {
    const pool = getPool();
    const [rows] = await pool.query('SELECT u.user_id, u.email FROM users u WHERE u.email = ?;',[email]);
    return rows;
};

export const signupUser = async (user: SignupUserBody) => {
    const pool = getPool();
    const [rows] = await pool.query('INSERT INTO users (email, password) VALUES (?, ?);',[user.email, user.password]);
    return rows;
};