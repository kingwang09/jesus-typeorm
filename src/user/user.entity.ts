import { encryptTransformer, getEncryptTransformer } from "src/util/encrypt-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        unique: true, 
        //transformer: getEncryptTransformer(),
        transformer: encryptTransformer,
        nullable: false,
    })
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column({default: true})
    created: Date = new Date();
}