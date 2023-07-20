import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedimentosCrucesModule } from './modules/pedimentos-cruces/pedimentos-cruces.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // PedimentosCrucesModule,
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://bmasc-dev-team:bmasc123@cluster0.f58mq.azure.mongodb.net/bmasc-corp-bd?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
