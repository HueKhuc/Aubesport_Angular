export interface TournamentRegistration {
    uuid?: string |null,
    status?: string |null,
    userUuid: string,
    tournamentUuid: string,
    endingDate?: Date | null,
    createdAt?: Date |null,
    modifiedAt?: Date | null,
    deletedAt?: Date | null,
}
