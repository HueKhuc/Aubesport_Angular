import { TournamentRegistration } from "./TournamentRegistration.model";

export interface TournamentRegistrationList {
    elements: TournamentRegistration[],
    totalOfPages: number,
    currentPage: number,
    elementsPerPage: number,
    nextPage: number|null,
    previousPage: number|null
}
