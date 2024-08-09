import { DogService } from './dog.service';
import { DogRepository } from './dog.repository';
import { CreateDogDto, UpdateDogDto } from './dog.model';

describe('DogService', () => {
  let dogService: DogService;
  let mockDogRepository: DogRepository;
  beforeEach(async () => {
    mockDogRepository = {
      dogs: [
        { id: 1, name: 'Dog 1', age: 2, breed: 'Breed 1' },
        { id: 2, name: 'Dog 2', age: 3, breed: 'Breed 2' },
      ],
    };
    dogService = new DogService(mockDogRepository);
  });

  describe('getAllDogs', () => {
    it('should return an array of dogs', async () => {
      const result = dogService.getAllDogs();
      expect(result).toEqual(mockDogRepository.dogs);
    });
    it('should return the dog with a matching id', async () => {
      const result = dogService.getDogById(1);
      expect(result).toEqual(mockDogRepository.dogs[0]);
    });

    describe('getDogById', () => {
      it('should return the dog with a matching id', async () => {
        const result = dogService.getDogById(1);
        expect(result).toEqual(mockDogRepository.dogs[0]);
      });
      it('should return undefined if no dog with the given id exists', async () => {
        const result = dogService.getDogById(3);
        expect(result).toBeUndefined();
      });
    });

    describe('createDog', () => {
      it('should create a new dog and return it', async () => {
        const newDog: CreateDogDto = {
          name: 'Dog 3',
          age: 4,
          breed: 'Breed 3',
        };
        const result = dogService.createDog(newDog);
        expect(result).toEqual({ id: 3, ...newDog });
      });
    });

    describe('updateDog', () => {
      it('should update the dog with the given id and return it', async () => {
        const updatedDog: UpdateDogDto = {
          name: 'Updated Dog',
          age: 5,
          breed: 'Updated Breed',
        };
        const result = dogService.updateDog(1, updatedDog);
        expect(result).toEqual({ id: 1, ...updatedDog });
      });
      it('should return undefined if no dog with the given id exists', async () => {
        const updatedDog: UpdateDogDto = {
          name: 'Updated Dog',
          age: 5,
          breed: 'Updated Breed',
        };
        const result = dogService.updateDog(3, updatedDog);
        expect(result).toBeNull();
      });
    });

    describe('deleteDog', () => {
      it('should delete the dog with the given id and return it', async () => {
        const result = dogService.deleteDog(1);
        expect(result).toEqual(1);
      });
      it('should return undefined if no dog with the given id exists', async () => {
        const result = dogService.deleteDog(3);
        expect(result).toBeNull();
      });
    });
  });
});
