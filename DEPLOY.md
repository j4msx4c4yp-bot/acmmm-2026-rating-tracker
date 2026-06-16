# Deploy With GitHub Pages and Supabase

## 1. Create Supabase database

1. Open Supabase and create a new project.
2. Go to SQL Editor.
3. Paste and run the full contents of `supabase-schema.sql`.
4. Go to Project Settings -> API.
5. Copy:
   - Project URL
   - anon public key

## 2. Configure this website

Edit `config.js`:

```js
window.ACMMM_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT_REF.supabase.co",
  supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
};
```

The anon key is public by design. The important protection is in `supabase-schema.sql`: public users can only read and insert rows. They cannot update or delete existing records.

## 3. Test locally

```bash
python3 -m http.server 8097
```

Open:

```text
http://localhost:8097
```

Submit a new paper id and then try submitting the same id again. The second submission should be rejected as already recorded.

## 4. Publish to GitHub Pages

Create a GitHub repository, then run:

```bash
git init
git add .
git commit -m "Add ACM MM 2026 rating tracker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

In GitHub:

1. Open the repository Settings.
2. Go to Pages.
3. Set Source to "Deploy from a branch".
4. Choose branch `main` and folder `/root`.
5. Save.

Your website will be available at:

```text
https://YOUR_USERNAME.github.io/YOUR_REPO/
```
