import { Test, TestingModule } from '@nestjs/testing';
import { DogController } from './dog.controller';
import { DogService } from './dog.service';
import { CreateDogDto, Dog, UpdateDogDto } from './dog.model';

describe('DogController', () => {
  let dogController: DogController;
  let dogService: DogService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [DogController],
      providers: [
        {
          provide: DogService,
          useValue: {
            getAllDogs: jest.fn(),
            getDogById: jest.fn(),
            createDog: jest.fn(),
            updateDog: jest.fn(),
            deleteDog: jest.fn(),
          },
        },
      ],
    }).compile();

    dogController = moduleRef.get<DogController>(DogController);
    dogService = moduleRef.get<DogService>(DogService);
  });

  describe('getAllDogs', () => {
    it('should return an array of dogs', async () => {
      const dogs: Dog[] = [
        { id: 1, name: 'Max', age: 5, breed: 'Golden Retriever' },
        { id: 2, name: 'Bella', age: 3, breed: 'Poodle' },
      ];
      jest.spyOn(dogService, 'getAllDogs').mockImplementation(() => {
        return dogs;
      });

      expect(dogController.getAllDogs()).toBe(dogs);
    });
  });

  describe('getDogById', () => {
    it('should return a dog by id', async () => {
      const dog: Dog = {
        id: 1,
        name: 'Max',
        age: 0,
        breed: 'Golden Retriever',
      };
      jest.spyOn(dogService, 'getDogById').mockImplementation(() => {
        return dog;
      });

      expect(dogController.getDogById(1)).toBe(dog);
    });
  });

  describe('createDog', () => {
    it('should create a new dog', async () => {
      const createDogDto: CreateDogDto = {
        name: 'Max',
        age: 0,
        breed: 'Golden Retriever',
      };
      const createdDog: Dog = {
        id: 1,
        name: 'Max',
        age: 0,
        breed: 'Golden Retriever',
      };
      jest.spyOn(dogService, 'createDog').mockImplementation(() => {
        return createdDog;
      });
      expect(dogController.createDog(createDogDto)).toBe(createdDog);
    });
  });

  describe('updateDog', () => {
    it('should update a dog by id', async () => {
      const updateDogDto: UpdateDogDto = { name: 'Bella' };
      const updatedDog = {
        id: 1,
        name: 'Bella',
        age: 5,
        breed: 'Golden Retriever',
      };
      jest.spyOn(dogService, 'updateDog').mockImplementation(() => {
        return updatedDog;
      });

      expect(dogController.updateDog(1, updateDogDto)).toBe(updatedDog);
    });
  });

  describe('deleteDog', () => {
    it('should delete a dog by id', async () => {
      const deletedDog = {
        id: 1,
        name: 'Max',
        age: 5,
        breed: 'Golden Retriever',
      };
      jest.spyOn(dogService, 'deleteDog').mockImplementation(() => {
        return deletedDog.id;
      });

      expect(dogController.deleteDog(1)).toBe(1);
    });
  });
});
