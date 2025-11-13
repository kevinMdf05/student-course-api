// Tests unitaires : teste les fonctions storage.js isolément (sans HTTP)
const storage = require('../../src/services/storage');

// beforeEach = exécuté AVANT chaque test pour avoir des données propres
beforeEach(() => {
  storage.reset(); // Vide la base de données
  storage.seed(); // Remet les données de départ : Alice, Bob, Charlie + Math, Physics, History
});

// ========== CRÉATION ==========

test('Créer un étudiant', () => {
  // Appelle directement la fonction create() du storage
  const result = storage.create('students', { name: 'David', email: 'david@example.com' });
  expect(result.name).toBe('David');
});

test('Bloquer email en double', () => {
  // alice@example.com existe déjà → doit retourner une erreur
  const result = storage.create('students', { name: 'Eve', email: 'alice@example.com' });
  expect(result.error).toBe('Email must be unique');
});

test('Bloquer titre de cours en double', () => {
  const result = storage.create('courses', { title: 'Math', teacher: 'Prof' });
  expect(result.error).toBe('Course title must be unique');
});

// ========== LECTURE ==========

test('Lister les étudiants', () => {
  const list = storage.list('students');
  expect(list.length).toBe(3);
});

test('Récupérer par ID', () => {
  const student = storage.get('students', 1);
  expect(student.name).toBe('Alice');
});

// ========== SUPPRESSION ==========

test('Supprimer un étudiant', () => {
  const ok = storage.remove('students', 1);
  expect(ok).toBe(true);
});

// ========== INSCRIPTIONS ==========

test('Inscrire un étudiant', () => {
  const result = storage.enroll(1, 1);
  expect(result.success).toBe(true);
});

test('Bloquer cours plein (3 max)', () => {
  // Règle métier : maximum 3 étudiants par cours
  storage.enroll(1, 1); // Alice
  storage.enroll(2, 1); // Bob
  storage.enroll(3, 1); // Charlie
  storage.create('students', { name: 'Extra', email: 'extra@example.com' });
  const result = storage.enroll(4, 1); // 4ème étudiant → doit échouer
  expect(result.error).toBe('Course is full');
});

test('Désinscrire un étudiant', () => {
  storage.enroll(1, 1);
  const result = storage.unenroll(1, 1);
  expect(result.success).toBe(true);
});

test('Voir cours d\'un étudiant', () => {
  storage.enroll(1, 1);
  storage.enroll(1, 2);
  const courses = storage.getStudentCourses(1);
  expect(courses.length).toBe(2);
});

test('Voir étudiants d\'un cours', () => {
  storage.enroll(1, 1);
  storage.enroll(2, 1);
  const students = storage.getCourseStudents(1);
  expect(students.length).toBe(2);
});
