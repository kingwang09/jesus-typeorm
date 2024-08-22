export class CreateRelationDto {
    name: string;
    photoUrl: string;
}

export class CreateManyToOneRelationDto {
    userId: number;
    photoUrls: string[];
}