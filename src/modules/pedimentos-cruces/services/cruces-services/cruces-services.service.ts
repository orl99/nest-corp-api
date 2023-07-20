import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrucesEnt } from './../../entities/cruces.entity';

// Models
import { AllCrucesI } from './../../models/allCruces.model';


// const second =  
@Injectable()
export class CrucesService {
    constructor(
        @InjectRepository(CrucesEnt)
        private readonly CrucesRepository: Repository<CrucesEnt>
    ){}

    // Test
    async getCruce(): Promise<CrucesEnt[]>{
        const response = await this.CrucesRepository
        .query(`SELECT  a.aduana cve_aduana, b.descripcion desc_aduana, DATE_FORMAT(fecha,'%m') mes, COUNT('x') cantidad, DATE_FORMAT(fecha,'%Y-%m') FROM cruces a, aduanas b
        WHERE a.aduana=CONCAT(b.aduana,b.seccion)
        AND DATE_FORMAT(fecha,'%Y')=DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 0 DAY),'%Y')
      GROUP BY cve_aduana, DATE_FORMAT(fecha,'%Y-%m')`);
      console.log(response);
      return response;
    }

    /**
     * getCrucesByDate
     * @param yea : string
     * @param month : string
     * @return all the cruces by month and the date that is specify
     */
    async getCrucesByDate(year: string, month: string): Promise<AllCrucesI[]>{
        console.log('year', year, 'month', month);
        const response: AllCrucesI[] = await this.CrucesRepository.query(`SELECT  a.aduana cve_aduana, b.descripcion desc_aduana, DATE_FORMAT(fecha,'%m') mes, COUNT('x') cantidad, DATE_FORMAT(fecha,'%Y-%m') date FROM cruces a, aduanas b
        WHERE a.aduana=CONCAT(b.aduana,b.seccion)
        AND DATE_FORMAT(fecha,'%Y')=${year}
      GROUP BY cve_aduana, DATE_FORMAT(fecha,'%Y-%m')`);
        
       const crcuesMonth = response.filter((obj) => obj.mes === month)
       console.log('crcuesMonth', crcuesMonth);
        return crcuesMonth;
    }

    // async getCrucesByFacilites(year: string): Promise<AllCrucesI[]>{
    //     // year = 2020-02666666
    //     const response: AllCrucesI[] = await this.CrucesRepository.query(`SELECT  a.aduana cve_aduana, b.descripcion desc_aduana, DATE_FORMAT(fecha,'%m') mes, COUNT('x') cantidad, DATE_FORMAT(fecha,'%Y-%m') FROM cruces a, aduanas b
    //     WHERE a.aduana=CONCAT(b.aduana,b.seccion)
    //     AND DATE_FORMAT(fecha,'%Y')=${year}
    //   GROUP BY cve_aduana, DATE_FORMAT(fecha,'%Y-%m')`);
    //     console.log(response);
    //     return response;
    // }



    // Logis
    // TODO: CHANGE IT TO A ANOTHER FILE AND BETTER ARQUITECTURE

}