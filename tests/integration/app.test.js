const request = require('supertest'); 
const app = require('../../src/app');
const storage = require('../../src/services/storage');

// beforeEach = exécuté AVANT chaque test pour avoir des données propres
beforeEach(() => {
  storage.reset();
  storage.seed(); // Remet Alice, Bob, Charlie + Math, Physics, History
});

// ========== ÉTUDIANTS ==========

test('GET /students', async () => {
  // Simule une requête HTTP GET vers /students
  const res = await request(app).get('/students');
  expect(res.statusCode).toBe(200); // Code HTTP 200 = succès
  expect(res.body.students.length).toBe(3); // 3 étudiants de base
});

test('POST /students - créer', async () => {
  // Simule une requête HTTP POST pour créer un étudiant
  const res = await request(app)
    .post('/students')
    .send({ name: 'David', email: 'david@example.com' }); // Corps de la requête
  expect(res.statusCode).toBe(201); // Code 201 = créé avec succès
  expect(res.body.name).toBe('David');
});

test('POST /students - email en double', async () => {
  // alice@example.com existe déjà → doit retourner erreur 400
  const res = await request(app)
    .post('/students')
    .send({ name: 'Eve', email: 'alice@example.com' });
  expect(res.statusCode).toBe(400); // Code 400 = Bad Request (erreur client)
  expect(res.body.error).toBe('Email must be unique');
});

test('GET /students/1', async () => {
  const res = await request(app).get('/students/1');
  expect(res.statusCode).toBe(200);
  expect(res.body.student.name).toBe('Alice');
});

test('PUT /students/1', async () => {
  const res = await request(app)
    .put('/students/1')
    .send({ name: 'Alice Updated', email: 'alice.new@example.com' });
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe('Alice Updated');
});

test('DELETE /students/:id', async () => {
  // 1. Crée un étudiant
  const create = await request(app)
    .post('/students')
    .send({ name: 'ToDelete', email: 'delete@example.com' });
  // 2. Supprime cet étudiant
  const res = await request(app).delete(`/students/${create.body.id}`);
  expect(res.statusCode).toBe(204); // Code 204 = No Content (supprimé avec succès)
});

// ========== COURS ==========

test('GET /courses', async () => {
  const res = await request(app).get('/courses');
  expect(res.statusCode).toBe(200);
  expect(res.body.courses.length).toBe(3);
});

test('POST /courses', async () => {
  const res = await request(app)
    .post('/courses')
    .send({ title: 'Informatique', teacher: 'Dr. Johnson' });
  expect(res.statusCode).toBe(201);
  expect(res.body.title).toBe('Informatique');
});

test('GET /courses/1', async () => {
  const res = await request(app).get('/courses/1');
  expect(res.statusCode).toBe(200);
  expect(res.body.course.title).toBe('Math');
});

test('PUT /courses/1', async () => {
  const res = await request(app)
    .put('/courses/1')
    .send({ title: 'Advanced Math', teacher: 'Prof. Smith' });
  expect(res.statusCode).toBe(200);
  expect(res.body.title).toBe('Advanced Math');
});

test('DELETE /courses - bloquer si inscrits', async () => {
  // Règle métier : impossible de supprimer un cours si des étudiants y sont inscrits
  await request(app).post('/courses/1/students/1'); // Inscrire Alice au cours Math
  const res = await request(app).delete('/courses/1'); // Tenter de supprimer Math
  expect(res.statusCode).toBe(400); // Doit échouer avec erreur 400
  expect(res.body.error).toBe('Cannot delete course: students are enrolled');
});
