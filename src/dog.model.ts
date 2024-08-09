export interface Dog {
  id: number;
  name: string;
  age: number;
  breed: string;
}

export interface CreateDogDto {
  name: string;
  age: number;
  breed: string;
}

export interface UpdateDogDto {
  name?: string;
  age?: number;
  breed?: string;
}
