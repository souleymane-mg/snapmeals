# SnapMeal - Guide de Configuration Backend

## 🚀 Configuration Cloudinary

1. **Créez un compte gratuit** : https://cloudinary.com/users/register/free
2. **Récupérez vos identifiants** :
   - Allez sur https://cloudinary.com/console
   - Copiez : `Cloud Name`, `API Key`, `API Secret`
3. **Configurez le fichier `.env`** :
   - Ouvrez `server/.env`
   - Remplacez les valeurs par vos identifiants Cloudinary

## 📝 Utilisation

### Démarrer le backend

```bash
npm run server
```

### Démarrer le frontend (dans un autre terminal)

```bash
npm run dev -- --host
```

### Traiter une vidéo TikTok

Le système fonctionne automatiquement :

1. Ajoutez un lien TikTok dans `constants.ts` (champ `videoUrl`)
2. Au chargement de l'app, le backend détecte les liens TikTok
3. Télécharge automatiquement la vidéo
4. Upload sur Cloudinary
5. Remplace l'URL TikTok par l'URL Cloudinary

**Note** : Pour l'instant, vous devez appeler manuellement l'API. Je vais créer un script automatique dans la prochaine étape.

### Test manuel de l'API

```bash
curl -X POST http://localhost:3001/api/process-tiktok \
  -H "Content-Type: application/json" \
  -d '{"tiktokUrl": "https://www.tiktok.com/@abdra_cly/video/7485033749336296710", "dishId": "d-tiktok-tacos"}'
```

## ⚠️ Limitations

- APIs TikTok gratuites ont des limites de taux
- Certaines vidéos peuvent échouer
- Nécessite que le backend soit en cours d'exécution
