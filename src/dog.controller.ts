import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { DogService } from './dog.service';
import { CreateDogDto, Dog, UpdateDogDto } from './dog.model';

@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Get()
  getAllDogs() {
    return this.dogService.getAllDogs();
  }

  @Get(':id')
  getDogById(@Param('id', ParseIntPipe) id: number): Dog {
    const dog: Dog = this.dogService.getDogById(id);
    if (!dog) {
      throw new NotFoundException('Invalid dog');
    }

    return dog;
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
