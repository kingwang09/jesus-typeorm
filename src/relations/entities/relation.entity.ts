import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Relation {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}

@Entity()
export class OneToOneRelationPhoto {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    url: string;

    @OneToOne(() => Relation)
    @JoinColumn()
    relation: Relation;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}

@Entity()
export class ManyToOneRelationPhoto {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    url: string;

    @ManyToOne(() => User, (user) => user.photos)
    user: User;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
