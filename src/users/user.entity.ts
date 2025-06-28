import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column({unique: true})
    userName: string

    @Column({unique: true})
    userMail: string

    @Exclude()
    @Column({ select: false })
    userPassword: string;

    @Column({ nullable: true })
    userAvatar?: string;

    @CreateDateColumn()
    createdOn: Date

    @UpdateDateColumn()
    updatedOn: Date

    @DeleteDateColumn({ nullable: true })   
    deletedOn: Date

}