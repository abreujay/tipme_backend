import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column({unique: true})
    userName: string

    @Column({unique: true})
    userMail?: string

    @Column({ nullable: true })
    artistName: string

    @Exclude()
    @Column({ select: false })
    userPassword: string;

    @Column({ nullable: true })
    bio: string

    @Column({ nullable: true })
    userAvatar?: string;

    @Column({ nullable: true })
    userLink1?: string

    @Column({ nullable: true })
    userLink2?: string

    @Column({ nullable: true })
    userLink3?: string

    @Exclude()
    @Column({ nullable: true })
    pixKey?: string

    @CreateDateColumn()
    createdOn: Date

    @UpdateDateColumn()
    updatedOn: Date

    @DeleteDateColumn({ nullable: true })   
    deletedOn: Date

}