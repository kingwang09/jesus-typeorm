import { EncryptTransformer, encryptTransformer, getEncryptTransformer } from "src/utils/encrypt-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        unique: true, 
        //transformer: EncryptTransformer,
        //transformer: getEncryptTransformer(),
        //transformer: encryptTransformer,
        transformer: {
            from(value: string) {
                return getEncryptTransformer().from(value);
                // return EncryptTransformer.from(value);
            },
            to(value: string){
                return getEncryptTransformer().to(value);
                // return EncryptTransformer.to(value);
            }
        },
        nullable: false,
    })
    email: string;

    @Column({nullable: true})
    password: string;

    @Column()
    username: string;

    @CreateDateColumn()
    createdAt: Date;

    // getEncryptEmail(): string | undefined {
    //     return encryptTransformer.to(this.email);
    // }

    // getEncryptUserName(): string | undefined {
    //     return encryptTransformer.to(this.username);
    // }
}