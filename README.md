# 🧑‍🍳 The Bite Chapter - Food Creator Portfolio & Recipe Hub

> **"Big Flavor. Zero Fuss. Aesthetic Plates."**  
> Official portfolio website & recipe journal for **Nimisha** ([@thebitechapter](https://www.youtube.com/@thebitechapter)).

---

## 🌟 Features Included

1. **Viral Video Reels Showcase**:
   - Highlighting viral hits including the **95K+ Rajasthani Doongri Tadka Chutney**, 27K Charcoal Smoked Chutney, 11K Moong Dal Cheela, 8.2K Chilli Garlic Tofu, and 5.6K Gobhi Pakora.
   - Interactive 3D phone mockup in the hero section with instant play.
   - Live infinite marquee ticker of trending recipes.

2. **Complete 48+ Recipe Library**:
   - Instant search by title, ingredient, tag, or category.
   - Category filtering: *Viral Legends, High-Protein, Desi Tadka & Street, 10-Min Pastas & Pizza, Sips & Sweets*.
   - Sort by *Most Viral* or *Quickest (<10 mins)*.
   - Interactive recipe modal with:
     - Embedded YouTube Short player
     - **Interactive Portions Scaler** (1x, 2x, 4x) that scales ingredients dynamically
     - **Interactive Checklist** (tap to cross out ingredients as you cook)
     - Step-by-step cooking instructions with timers
     - Social sharing and YouTube short link

3. **Debut eBook Launchpad ("The Viral Kitchen Playbook")**:
   - 3D interactive book mockup with tilt and hover effects.
   - Free 3-Recipe Sample Chapter preview modal ("Peek Inside").
   - Pre-order waitlist form with **instant automated download of `thebitechapter_sample_ebook.pdf`**.

4. **Nimisha's Food Journal & Bio**:
   - Genuine creator story, philosophy, and 4 pillars (15-min speed, high-protein fuel, desi street soul, aesthetic plating).
   - Direct links to **YouTube (@thebitechapter)**, **Instagram (@thebitechapter)**, and **Facebook (@thebitechapter)**.

5. **Brand Collaboration & Media Kit Form**:
   - Inquiries for sponsored reels, recipe development, and ambassador campaigns.
   - Built-in lead collection.

6. **Gen-Z Polish & Micro-Interactions**:
   - Floating interactive stickers, emoji physics bursts on heart/bookmark/subscribe, glassmorphism, responsive mobile drawer menu, and custom dark-mode foodie palette.

---

## 🚀 How to Run Locally

### Option 1: Run with Python (Recommended & Fastest)

From this folder, run:

```bash
cd D:\Ility\n8n\thebitechapter
python server.py
```

Then open your browser to:
👉 **[http://localhost:8080](http://localhost:8080)**

*(If you want to use a different port, set the `PORT` environment variable, e.g. `$env:PORT=3000; python server.py`)*

---

### Option 2: Run with Standard Python HTTP Server (Zero Dependencies)

```bash
cd D:\Ility\n8n\thebitechapter
python -m http.server 8080
```

Open **[http://localhost:8080](http://localhost:8080)**

---

### Option 3: Run with Docker Locally

```bash
cd D:\Ility\n8n\thebitechapter
docker build -t thebitechapter .
docker run -p 8080:8080 thebitechapter
```

Open **[http://localhost:8080](http://localhost:8080)**

---

## ☁️ How to Deploy to Google Cloud Run (When Ready)

The project is structured to deploy to Google Cloud Run with **zero changes**:

1. Make sure the Google Cloud SDK (`gcloud`) is logged in:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_GCP_PROJECT_ID
   ```

2. Deploy directly from the source folder:
   ```bash
   cd D:\Ility\n8n\thebitechapter
   gcloud run deploy thebitechapter --source . --region us-central1 --allow-unauthenticated
   ```

Cloud Run will automatically build the container using the provided `Dockerfile`, inject the `$PORT` environment variable, and provide you with a secure HTTPS URL (e.g. `https://thebitechapter-xyz.run.app`).

---

## 📁 File Structure

```text
thebitechapter/
├── index.html                   # Modern Gen-Z single-page portfolio & recipe app
├── server.py                    # Python server (FastAPI + fallback) with API endpoints
├── reels_data.json              # Full 48-reel curated database with tags & instructions
├── requirements.txt             # Python dependencies
├── Dockerfile                   # Cloud Run container definition
├── .dockerignore                # Container exclusions
├── static/
│   ├── css/
│   │   └── style.css            # Custom animations, 3D book cover, glassmorphism
│   ├── js/
│   │   ├── data.js              # Social creator profile & reels dataset
│   │   └── app.js               # Interactive engine (filters, player modal, portion scaler)
│   └── downloads/
│       └── thebitechapter_sample_ebook.pdf # Real downloadable 3-recipe sample cookbook
└── README.md                    # Documentation
```
