import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TossPaymentDto } from "../dto/payment.dto";

@Entity()
export class TossPayment{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'simple-json' })
    payment: TossPaymentDto;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}