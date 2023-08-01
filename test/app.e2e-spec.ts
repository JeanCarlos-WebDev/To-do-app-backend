import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// import * as request from 'supertes'
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { ValidationPipe } from '@nestjs/common';
import { categories } from '@prisma/client';
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }));
    await app.init();
    await app.listen(3333)
    pactum.request.setBaseUrl('http://localhost:3333')

    prisma = app.get(PrismaService);
    await prisma.cleanDB()
  });

  afterAll(async () => {
    await app.close()
  })

  describe('Auth module', () => {
    const dto = {
      email: 'test@gmail.com',
      password: '12345'
    }
    describe('Signup', () => {
      it('shoult signup', () => {
        return pactum.spec()
        .post('/auth/signup')
        .withBody(dto)
        .expectStatus(201)
      })
    })
    describe('Signin', () => {
      it('should signin', () => {
        return pactum.spec()
        .post('/auth/signin')
        .withBody(dto)
        .stores('token', 'token')
        .expectStatus(200)
        
      })
    })
  })

  describe('Category Module', () => {
    const dtoCategory: Pick<categories, 'title'> = {
      title: 'Mates',
    }
    it('Should create a category', () => {
      return pactum.spec()
        .post('/categories')
        .withBody(dtoCategory)
        .withBearerToken('$S{token}')
        .expectStatus(201)
    })

    it("Shouldn't create a category", () => {
      return pactum.spec()
        .post('/categories')
        .withBearerToken('$S{token}')
        .expectStatus(400)
    })

    it('Should get all categories', () => { 
      return pactum.spec()
        .get('/categories')
        .withBearerToken('$S{token}')
        .stores('category_id', 'id')
        .stores('category_title', 'title')
        .expectStatus(200)

        
    })

    // it('Should get category by id', () => { 
    //   return pactum.spec()
    //     .get('/categories/$S{category_id}')
    //     .withBearerToken('$S{token}')
    //     .expectStatus(200)
    //     .inspect()
    // })
    it('Should get category by title', () => { 
      return pactum.spec()
        .get(`/categories/${dtoCategory.title}`)
        .withBearerToken('$S{token}')
        .expectStatus(200)
    })
    it('Should update a category', () => { 
      return pactum.spec()
        .put(`/categories/$S{category_id}`)
        .withBearerToken('$S{token}')
        .withBody({title: 'Estudiar para el parcial de matemáticas'})
        .expectStatus(200)
    })
    it('Should delete a category', () => { 
      return pactum.spec()
        .delete(`/categories/$S{category_id}`)
        .withBearerToken('$S{token}')
        .expectStatus(200)
        
    })
  }) 

  describe('Task Module', () => {
    const dtoTask = {
      title: 'Exámen de matemáticas',
      description: 'Sobre derivaciones',
      status: 1,
      pomodoros: 0,
      number_of_pomodoros: 4,
      expiration_date: new Date(),
      importance: 1,
    }
    it('should create a task', () => {
      return pactum.spec()
        .post('/tasks')
        .withBody({ ...dtoTask, category_id: parseInt('$S{category_id}') })
        .withBearerToken('$S{token}')
        .expectStatus(201)
    })

    it('Should get all tasks', () => { 
      return pactum.spec()
        .get('/tasks')
        .withBearerToken('$S{token}')
        .stores('task_id', '[0].id')
        .expectStatus(200)
    })
    it('Should get one task', () => { 
      return pactum.spec()
        .get('/tasks/$S{task_id}')
        .withBearerToken('$S{token}')
        .expectStatus(200)
    })
  }) 
  
});
// ()=> {}