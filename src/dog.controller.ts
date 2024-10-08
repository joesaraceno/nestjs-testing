import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { DogService } from './dog.service';
import { CreateDogDto, Dog, UpdateDogDto } from './dog.model';
import { NotFoundInterceptor } from './injectables/NotFoundInterceptor';

@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Get()
  getAllDogs() {
    return this.dogService.getAllDogs();
  }

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor('No resource found for given id'))
  getDogById(@Param('id', ParseIntPipe) id: number): Dog {
    return this.dogService.getDogById(id);
  }

  @Post()
  createDog(@Body() createDogDto: CreateDogDto): Dog {
    return this.dogService.createDog(createDogDto);
  }

  @Put(':id')
  updateDog(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDogDto: UpdateDogDto,
  ) {
    return this.dogService.updateDog(id, updateDogDto);
  }

  @Delete(':id')
  deleteDog(@Param('id', ParseIntPipe) id: number) {
    return this.dogService.deleteDog(id);
  }
}
