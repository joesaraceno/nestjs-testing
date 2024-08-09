import { Injectable } from '@nestjs/common';
import { CreateDogDto, Dog, UpdateDogDto } from './dog.model';

@Injectable()
export class DogService {
  private dogs: Dog[] = [
    { name: 'fido', id: 1, age: 1, breed: 'pitbull' },
    { name: 'cleo', id: 2, age: 17, breed: 'mutt' },
  ];

  getAllDogs(): Dog[] {
    return this.dogs;
  }

  getDogById(id: number): Dog {
    return this.dogs.find((dog) => dog.id === id);
  }

  createDog(dog: CreateDogDto): Dog {
    const d = {
      id: this.dogs.length + 1,
      name: dog.name,
      age: dog.age,
      breed: dog.breed,
    };
    this.dogs.push(d);
    return d;
  }

  updateDog(id: number, updatedDog: UpdateDogDto): Dog {
    const dogIndex = this.dogs.findIndex((dog) => dog.id === id);
    if (dogIndex !== -1) {
      this.dogs[dogIndex] = { ...this.dogs[dogIndex], ...updatedDog };
      return this.dogs[dogIndex];
    }
    return null;
  }

  deleteDog(id: number): Dog {
    const dogIndex = this.dogs.findIndex((dog) => dog.id === id);
    if (dogIndex !== -1) {
      const deletedDog = this.dogs[dogIndex];
      this.dogs.splice(dogIndex, 1);
      return deletedDog;
    }
    return null;
  }
}
