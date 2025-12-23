const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001; // Le port utilisé par ton site

// Autoriser ton site à parler au serveur
app.use(cors());

// Permettre au serveur de lire le JSON envoyé (avec une limite large pour les données)
app.use(express.json({ limit: '50mb' }));

// La route qui reçoit la sauvegarde
app.post('/api/save-content', (req, res) => {
    console.log("📥 Reçu une demande de sauvegarde...");

    // 1. Vérification du mot de passe (celui qui est dans ton code HTML)
    const authHeader = req.headers.authorization;
    if (authHeader !== 'Bearer Remy03200!') {
        console.log("⛔ Mot de passe incorrect !");
        return res.status(403).json({ message: 'Mot de passe incorrect' });
    }

    // 2. Récupérer les données envoyées par le site
    const content = req.body;

    // 3. Chemin vers ton fichier content.json
    const filePath = path.join(__dirname, 'content.json');

    // 4. Écrire les données dans le fichier
    fs.writeFile(filePath, JSON.stringify(content, null, 4), 'utf8', (err) => {
        if (err) {
            console.error("❌ Erreur lors de l'écriture du fichier :", err);
            return res.status(500).json({ message: 'Erreur lors de l\'enregistrement du fichier.' });
        }

        console.log("✅ content.json mis à jour avec succès !");
        res.json({ message: 'Sauvegarde réussie sur le PC !' });
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur de sauvegarde prêt !`);
    console.log(`📡 Écoute sur http://localhost:${PORT}`);
    console.log(`📝 Prêt à modifier content.json`);
});
