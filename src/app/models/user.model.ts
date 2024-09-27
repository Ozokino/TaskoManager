export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}
export type TempUser = Omit<User, '_id'>