import { ManyToOneRelationPhoto } from "src/relations/entities/relation.entity";
import { EncryptTransformer, encryptTransformer, getEncryptTransformer } from "src/utils/encrypt-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({
        nullable: true,
        transformer: {
            from(value: string) {
                console.log('from value: ', value);
                return getEncryptTransformer().from(value);
                // return EncryptTransformer.from(value);
            },
            to(value: string){
                console.log('to value: ', value);
                return getEncryptTransformer().to(value);
                // return EncryptTransformer.to(value);
            }
        },
    })
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

    @OneToMany(() => ManyToOneRelationPhoto, (photo) => photo.user)
    photos?: ManyToOneRelationPhoto[]
    
}