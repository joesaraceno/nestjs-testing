import { Injectable } from '@nestjs/common';
import { CreateDogDto, Dog, UpdateDogDto } from './dog.model';
import { DogRepository } from './dog.repository';

@Injectable()
export class DogService {
  private dogRepository: DogRepository;

  constructor(dogRepository: DogRepository) {
    this.dogRepository = dogRepository;
  }

  getAllDogs(): Dog[] {
    return this.dogRepository.dogs;
  }

  getDogById(id: number): Dog {
    return this.dogRepository.dogs.find((dog) => dog.id === id);
  }

  createDog(dog: CreateDogDto): Dog {
    const d = {
      id: this.dogRepository.dogs.length + 1,
      name: dog.name,
      age: dog.age,
      breed: dog.breed,
    };
    this.dogRepository.dogs.push(d);
    return d;
  }

  updateDog(id: number, updatedDog: UpdateDogDto): Dog {
    const dogIndex = this.dogRepository.dogs.findIndex((dog) => dog.id === id);
    if (dogIndex !== -1) {
      this.dogRepository.dogs[dogIndex] = {
        ...this.dogRepository.dogs[dogIndex],
        ...updatedDog,
      };
      return this.dogRepository.dogs[dogIndex];
    }
    return null;
  }

  deleteDog(id: number): number {
    const dogIndex = this.dogRepository.dogs.findIndex((dog) => dog.id === id);
    if (dogIndex !== -1) {
      const deletedDog = this.dogRepository.dogs[dogIndex];
      this.dogRepository.dogs.splice(dogIndex, 1);
      return deletedDog.id;
    }
    return null;
  }
}
