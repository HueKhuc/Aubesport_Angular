export interface User {
    uuid: string,
    email: string,
    pseudo?: string,
    bio?: string,
    firstName?: string,
    lastName?: string,
    gender?: string,
    birthday?: Date,
    createdAt: Date,
    modifiedAt?: Date,
    deletedAt?: Date
}
