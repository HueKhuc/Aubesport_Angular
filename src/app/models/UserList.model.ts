import { User } from "./User.model";

export interface UserList {
    elements: User[],
    totalOfPages: number,
    currentPage: number,
    elementsPerPage: number,
    nextPage: number|null,
    previousPage: number|null
}
