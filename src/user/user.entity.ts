import { EncryptTransformer, encryptTransformer, getEncryptTransformer } from "src/utils/encrypt-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        unique: true, 
        //transformer: getEncryptTransformer(),
        //transformer: encryptTransformer,
        transformer: {
            from(value: string) {
                return getEncryptTransformer().from(value);
            },
            to(value: string){
                return getEncryptTransformer().to(value);
            }
        },
        nullable: false,
    })
    email: string;

    @Column({nullable: true})
    password: string;

    @Column()
    username: string;

    @Column({default: true})
    created: Date = new Date();

    // getEncryptEmail(): string | undefined {
    //     return encryptTransformer.to(this.email);
    // }

    // getEncryptUserName(): string | undefined {
    //     return encryptTransformer.to(this.username);
    // }
}