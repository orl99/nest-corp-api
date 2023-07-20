import { Controller, Get, Res, HttpStatus, Response, Param } from '@nestjs/common';
import { CrucesService } from './../services/cruces-services/cruces-services.service';
@Controller('cruces')
export class CrucesController {
    constructor(private crucesService: CrucesService){}

    // Test
    @Get()
    getCruces(@Res() response ) {
        // const res = await this.crucesService.getCruce();
        // response.stat
        this.crucesService.getCruce()
        .then(crucesList => {
            response.status(HttpStatus.OK).json(crucesList)
        })
        .catch(()=> {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la Obtencion de la consulta' });
        })
        ;
    }
    @Get('/byYear/:year/:month')
    async getCrucesByDate(@Res() response, @Param('year') year, @Param('month') month) {
        const responseService = await this.crucesService.getCrucesByDate(year, month);
        response.status(HttpStatus.OK).json(responseService)
    }
}
