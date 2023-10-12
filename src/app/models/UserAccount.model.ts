export interface UserAccount {
    email: string,
    pseudo: string,
    bio: string,
    firstName: string,
    lastName: string,
    gender: string,
    birthday: Date,
    [key: string]: any;
}
