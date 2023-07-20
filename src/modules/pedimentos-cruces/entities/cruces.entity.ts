import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CrucesEnt {
    @PrimaryGeneratedColumn()
    cve_aduana: number;
  
    @Column()
    desc_aduana: string;
  
    @Column()
    mes: number;

    @Column()
    cantidad: number;

    @Column()
    date_format: string;
}
