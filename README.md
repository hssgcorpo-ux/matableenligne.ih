# TableEnLigne

SaaS pour créer le site web d'un restaurant : page publique (menu, horaires,
contact) + espace de gestion où le restaurateur modifie son contenu
lui-même. Chaque restaurant a sa propre page (`tonsite.com/nom-du-resto`)
et son propre compte.

Stack : Next.js 14 (App Router) + Supabase (base de données + comptes
utilisateurs) + Tailwind CSS. Hébergement : Vercel.

---

## Mettre le site en ligne (≈ 10 minutes, gratuit pour démarrer)

### 1. Créer le projet Supabase (base de données + comptes)

1. Va sur https://supabase.com → crée un compte gratuit (avec ton email).
2. Clique sur **New project**. Choisis un nom, un mot de passe de base de
   données (note-le), région `eu-central` (proche de la France).
3. Une fois le projet créé, va dans **SQL Editor** (menu de gauche) → **New
   query**.
4. Colle **tout le contenu** du fichier `supabase/schema.sql` de ce projet,
   puis clique **Run**. Ça crée les deux tables (`restaurants`,
   `menu_items`) et les règles de sécurité.
5. Va dans **Project Settings** (roue crantée) → **API**. Tu y trouveras
   deux informations à copier :
   - **Project URL** → c'est ta valeur `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → c'est ta valeur `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   Ce sont "les codes" dont tu as besoin : ils ne sont pas secrets (la
   clé "anon" est faite pour être publique, c'est la sécurité au niveau
   des tables — déjà en place via le script SQL — qui protège les
   données).

6. (Recommandé) Dans **Authentication** → **Settings**, désactive
   "Confirm email" le temps des tests, pour pouvoir te connecter
   immédiatement après inscription sans cliquer sur un lien reçu par
   email. Tu pourras le réactiver plus tard.

### 2. Déployer sur Vercel

1. Mets ce dossier sur GitHub (crée un repo, pousse le code — ou utilise
   le bouton d'import direct de dossier sur https://vercel.com/new si tu
   préfères éviter GitHub).
2. Va sur https://vercel.com → crée un compte gratuit → **Add New
   Project** → importe ce repo.
3. Dans les réglages du projet, section **Environment Variables**, ajoute
   les deux valeurs copiées à l'étape 1 :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Clique **Deploy**. En ~1 minute, ton site est en ligne sur une adresse
   du type `tableenligne.vercel.app`.
5. (Optionnel) Dans **Settings → Domains**, tu peux brancher un nom de
   domaine acheté ailleurs (Namecheap, OVH...).

### 3. Tester

- Va sur ton-site.vercel.app/signup → crée un restaurant test.
- Tu es redirigé vers `/dashboard` → ajoute des plats, remplis les infos.
- Va sur ton-site.vercel.app/le-slug-choisi → c'est la page publique que
  verront tes clients restaurateurs.

---

## Développer en local (si tu veux modifier le code)

```bash
npm install
cp .env.local.example .env.local   # puis remplis avec tes vraies clés Supabase
npm run dev
```

Site disponible sur http://localhost:3000

---

## Comment ça marche

- `/` — landing page marketing du SaaS (vente de l'abonnement)
- `/signup`, `/login` — création de compte / connexion (un compte = un
  restaurant)
- `/dashboard` — espace privé du restaurateur : édition des infos et du
  menu
- `/[slug]` — page publique du restaurant, ex. `/chez-ilan`
- `supabase/schema.sql` — tout le schéma de base de données + sécurité
  (chaque restaurateur ne peut modifier que SES données)
- `src/app/actions.ts` — toute la logique serveur (inscription, connexion,
  sauvegarde du menu...)

## Pour aller plus loin (pistes d'évolution)

- Upload direct d'images (actuellement : on colle une URL d'image) via
  Supabase Storage
- Paiement de l'abonnement avec Stripe (le prix 19€/mois est affiché mais
  pas encore prélevé automatiquement)
- Thèmes de couleurs / mises en page différentes au choix du restaurateur
- Système de réservation en ligne
