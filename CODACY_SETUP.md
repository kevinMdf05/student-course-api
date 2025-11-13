# 🔍 GUIDE D'INSTALLATION CODACY

## Étape 1 : Créer un compte Codacy

1. Va sur : https://www.codacy.com/
2. Clique sur **"Sign up with GitHub"**
3. Connecte-toi avec ton compte GitHub
4. Autorise Codacy à accéder à tes repos

## Étape 2 : Ajouter ton repository

1. Sur Codacy, clique sur **"Add repository"**
2. Cherche **"student-course-api"** dans la liste
3. Clique sur **"Add to Codacy"**
4. Attends que l'analyse initiale se termine (1-2 minutes)

## Étape 3 : Récupérer ton badge

1. Dans Codacy, va sur ton projet "student-course-api"
2. Clique sur **"Settings"** (icône engrenage)
3. Va dans **"Integrations"** → **"Badges"**
4. Copie le code Markdown du badge "Grade"
5. Remplace le badge dans le fichier `README.md` 

## Étape 4 : Vérifier les résultats

1. Sur Codacy, on a verras :
   - **Grade** : A, B, C, D, ou F (note de qualité)
   - **Issues** : nombre de problèmes détectés
   - **Complexity** : complexité du code
   - **Duplication** : code dupliqué

2. Clique sur chaque problème pour voir comment le corriger

## Résultat attendu

- Badge Codacy vert dans le README
- Grade A ou B (très bon)
- Moins de 10 issues détectées
- Analyse automatique à chaque push

## Aide

Si tu as des problèmes :
- Vérifie que ton repo est public sur GitHub
- Recharge la page Codacy après quelques minutes
- Consulte : https://docs.codacy.com/
