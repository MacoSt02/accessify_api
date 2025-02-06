export type SignupUsersBody = {
    email: string;
    password: string;
};

export type UsersBody = {
    user_id: number;
    email: string;
    password: string;
    role_id: number;
};