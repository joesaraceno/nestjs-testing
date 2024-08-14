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
    it('GET', () => {
      return request(app.getHttpServer()).get('/dog').expect(200).expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/dog')
        .send({ name: 'Dog 1', age: 2, breed: 'Breed 1' })
        .expect(201)
        .expect({ id: 1, name: 'Dog 1', age: 2, breed: 'Breed 1' });
    });

    it('GET /:id', () => {
      return request(app.getHttpServer())
        .get('/dog/1')
        .expect(200)
        .expect({ id: 1, name: 'Dog 1', age: 2, breed: 'Breed 1' });
    });

    it('PUT /:id', () => {
      return request(app.getHttpServer())
        .put('/dog/1')
        .send({ name: 'Updated Dog', age: 5, breed: 'Updated Breed' })
        .expect(200)
        .expect({ id: 1, name: 'Updated Dog', age: 5, breed: 'Updated Breed' });
    });

    it('DELETE /:id', () => {
      return request(app.getHttpServer())
        .delete('/dog/1')
        .expect(200)
        .expect({});
    });

    it('GET /:id (not found)', () => {
      return request(app.getHttpServer()).get('/dog/1').expect(404);
    });
  });
});
