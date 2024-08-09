import { Injectable } from '@nestjs/common';
import { Dog } from './dog.model';

@Injectable()
export class DogRepository {
  public dogs: Dog[] = [];
}
