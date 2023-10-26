export interface TournamentRegistration {
    uuid?: string |null,
    status?: string |null,
    userUuid: string,
    tournamentUuid: string,
    tournamentName?: string | null;
    tournamentStartingDate?: Date | null;
    tournamentEndingDate?: Date | null;
    endingDate?: Date | null,
    createdAt?: Date |null,
    modifiedAt?: Date | null,
    deletedAt?: Date | null,
}
