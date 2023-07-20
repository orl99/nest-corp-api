import { Module } from '@nestjs/common';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

import { CrucesEnt } from './entities/cruces.entity';

// Controllers
import { CrucesController } from './cruces/cruces.controller';
import { CrucesService } from './services/cruces-services/cruces-services.service';
import { PedimentosPagadosController } from './pedimentos-pagados/pedimentos-pagados.controller';

@Module({
  controllers: [CrucesController, PedimentosPagadosController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.5.4',
      port: 3309,
      username: 'remote',
      password: 'E079D388',
      database: 'jogres',
      entities: [CrucesEnt],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([CrucesEnt])
  ],
  providers: [CrucesService]
})
export class PedimentosCrucesModule {}
