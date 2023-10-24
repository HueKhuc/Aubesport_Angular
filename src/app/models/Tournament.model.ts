export interface Tournament {
    uuid: string,
    name: string,
    startingDate: Date,
    endingDate: Date | null,
    createdAt: Date,
    modifiedAt: Date | null,
    deletedAt: Date | null,
}
