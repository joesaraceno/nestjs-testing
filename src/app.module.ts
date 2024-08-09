import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogController } from './dog.controller';
import { DogService } from './dog.service';
import { DogRepository } from './dog.repository';

@Module({
  imports: [],
  controllers: [AppController, DogController],
  providers: [AppService, DogService, DogRepository],
})
export class AppModule {}
