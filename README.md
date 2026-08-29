# Mon univers musical

Site vitrine pour partager mes créations musicales (Ableton) : présentation
de mon parcours, écoute en streaming, téléchargement réservé aux membres
connectés, et pourboires via Stripe.

**Stack** : Next.js (App Router) + Tailwind CSS, déployé sur Vercel.
Backend : Supabase (auth, base de données Postgres, storage pour les
fichiers audio).

## 1. Configurer Supabase

1. Crée un projet sur [supabase.com](https://supabase.com) (gratuit).
2. Dans **SQL Editor**, exécute le contenu de [`supabase/schema.sql`](supabase/schema.sql)
   pour créer la table `tracks`.
3. Dans **Storage**, crée 3 buckets :
   - `tracks-public` — **public** (streaming des morceaux)
   - `covers` — **public** (pochettes, optionnel)
   - `tracks-private` — **privé** (fichiers téléchargeables, haute qualité)
4. Dans **Authentication > Email**, active les "Magic Link" (activés par
   défaut). Ajoute l'URL de callback dans **Authentication > URL
   Configuration** :
   - En local : `http://localhost:3000/auth/callback`
   - En prod : `https://ton-domaine.vercel.app/auth/callback`
5. Récupère tes clés dans **Project Settings > API** :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (⚠️ secrète, jamais exposée au client) →
     `SUPABASE_SERVICE_ROLE_KEY`
6. Ajoute tes morceaux : uploade le fichier de streaming dans
   `tracks-public`, le fichier haute qualité dans `tracks-private`, puis
   crée une ligne dans la table `tracks` (Table Editor) avec les chemins
   correspondants (`preview_path`, `download_path`).

## 2. Configurer Stripe (pourboires)

1. Crée un compte sur [stripe.com](https://stripe.com).
2. Dans le Dashboard, va dans **Payment Links** → crée un lien "Pourboire"
   avec un montant libre ou des montants suggérés.
3. Copie l'URL du lien dans `NEXT_PUBLIC_STRIPE_TIP_LINK`.

## 3. Variables d'environnement

Copie `.env.example` vers `.env.local` et remplis les valeurs :

```bash
cp .env.example .env.local
```

## 4. Lancer en local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## 5. Déployer sur Vercel

1. Pousse ce repo sur GitHub.
2. Importe-le sur [vercel.com](https://vercel.com/new).
3. Ajoute les mêmes variables d'environnement que dans `.env.local` dans
   les **Project Settings > Environment Variables** de Vercel.
4. Déploie. Pense à ajouter l'URL Vercel finale dans la config Supabase
   (redirect URL de l'auth, voir étape 1.4).
