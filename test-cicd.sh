#!/bin/bash

echo "================================="
echo "  Test CI/CD avec Jenkins"
echo "================================="

# Aller dans le dossier Front
cd ~/Front

# Créer un fichier avec timestamp
timestamp=$(date +%s)
echo "// Test CI/CD - $(date)" > test-$timestamp.js
echo "console.log('Build déclenché automatiquement');" >> test-$timestamp.js

echo "✅ Fichier créé: test-$timestamp.js"

# Git operations
git add test-$timestamp.js
git commit -m "Test CI/CD - $(date)"
git push origin main

echo "✅ Push effectué vers GitHub"
echo ""
echo "📌 Maintenant, vérifiez Jenkins:"
echo "   http://192.168.127.134:8080"
echo "   Pipeline: Frontt"
echo ""
echo "Attendez 10 secondes et un build automatique devrait se lancer"
