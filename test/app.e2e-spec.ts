import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello, World!');
  });

  describe('/dog', () => {
    const dogId = 1;
    const DOGID_ROUTE = `/dog/${dogId}`;
    it('GET', () => {
      return request(app.getHttpServer()).get('/dog').expect(200).expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/dog')
        .send({ name: 'Dog 1', age: 2, breed: 'Breed 1' })
        .expect(201)
        .expect({ id: dogId, name: 'Dog 1', age: 2, breed: 'Breed 1' });
    });

    it('GET /:id', () => {
      return request(app.getHttpServer())
        .get(DOGID_ROUTE)
        .expect(200)
        .expect({ id: dogId, name: 'Dog 1', age: 2, breed: 'Breed 1' });
    });

    it('PUT /:id', () => {
      return request(app.getHttpServer())
        .put(DOGID_ROUTE)
        .send({ name: 'Updated Dog', age: 5, breed: 'Updated Breed' })
        .expect(200)
        .expect({
          id: dogId,
          name: 'Updated Dog',
          age: 5,
          breed: 'Updated Breed',
        });
    });

    it('DELETE /:id', () => {
      return request(app.getHttpServer())
        .delete(DOGID_ROUTE)
        .expect(200)
        .expect({});
    });

    it('GET /:id (not found)', () => {
      return request(app.getHttpServer()).get(DOGID_ROUTE).expect(404);
    });
  });
});
