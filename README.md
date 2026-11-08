# Living Heritage, Searchable
### A Contemporary Digital Sanctuary for Intangible Cultural Heritage

> **"Every Tradition Has a Story. Every Story Deserves to Live."**

Living Heritage is a responsive, editorial cultural heritage archive platform that allows communities to document, preserve, organize, search, and explore traditional stories, folk songs, indigenous crafts, customs, regional art forms, and oral histories with explicit community consent, cultural ownership safeguards, and rigorous contributor attribution.

---

## 🏛️ Artistic Design & Visual Philosophy

- **Digital Museum & Editorial Magazine Aesthetic**: Rich, contemporary editorial layouts with generous whitespace, delicate borders, asymmetric compositions, and high-resolution cinematic imagery.
- **Traditional Indian Heritage Palette**:
  - Warm parchment (`#FAF6EE`, `#FDFBF7`) and antique ivory backgrounds.
  - Deep terracotta (`#C84B31`, `#942E19`), burnt vermillion, and turmeric yellow (`#D48806`, `#E09F3E`) accents.
  - Earthy wood tones (`#1A0F0A`, `#2A1810`) and antique brass shimmers (`#C99E52`).
- **Sacred Geometry & Ornamental Motifs**: Custom SVG Kolam patterns, lotus petals, temple lamps, and subtle Jali lattice overlays.
- **Serif & Contemporary Typography**: Google Fonts *Cinzel*, *Playfair Display*, and *Plus Jakarta Sans*, paired with native *Noto Serif Malayalam* script support.
- **Audio Experience**: Dedicated field recording audio player, lyrics summaries, and an ambient temple soundscape (flute and percussion) toggleable from the navbar.

---

## 🚀 Technology Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router, React 18, TypeScript, Tailwind CSS, Lucide Icons)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend**: [NestJS](https://nestjs.com/) (Modular Architecture, Express, Mongoose ODM, Multer for media uploads)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)
  - **Cluster**: `ebin007`
  - **Database Name**: `art-works`
  - **Collection Name**: `arts` *(All existing sample traditions and user-submitted records are stored in this exact collection)*
- **Authentication**: JWT authentication with Role-Based Access Control (`admin`, `contributor`, `knowledge_holder`, `visitor`).

---

## 📂 Project Architecture

```
d:/my-projects/art-works/
├── backend/                       # NestJS API Server
│   ├── src/
│   │   ├── arts/                  # Cultural Records Module
│   │   │   ├── schemas/art.schema.ts  # Mongoose Schema targeting 'arts' collection
│   │   │   ├── dto/               # Create, Update, Query DTOs
│   │   │   ├── arts.service.ts    # Search, filter, approve/reject, recommendations
│   │   │   ├── arts.controller.ts # REST API Endpoints
│   │   │   └── arts.module.ts
│   │   ├── auth/                  # Authentication & Role Guard Module
│   │   │   ├── schemas/user.schema.ts
│   │   │   ├── auth.service.ts    # Default Chief Curator seeding, JWT logic
│   │   │   ├── auth.controller.ts
│   │   │   └── auth.module.ts
│   │   ├── upload/                # Multi-part Image/Audio/Video Disk Storage
│   │   ├── seed/                  # Seed data & automatic initialization
│   │   │   ├── seed.data.ts       # 11 authentic Kerala & Indian traditions
│   │   │   └── seed.service.ts    # Upserts directly to 'arts' collection
│   │   ├── app.module.ts
│   │   └── main.ts                # Server bootstrap on PORT 4000
│   ├── scripts/seed-atlas.js      # Direct standalone Atlas seeder
│   ├── .env                       # Backend configuration with Atlas URI
│   └── package.json
│
├── frontend/                      # Next.js Presentation Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx         # Global fonts, navbar, footer, audio bar, auth modal
│   │   │   ├── page.tsx           # Immersive Homepage with hero & audio sampler
│   │   │   ├── explore/page.tsx   # Searchable archive with multifaceted filtering
│   │   │   ├── story/[slug]/page.tsx # Detailed storytelling, audio/video players
│   │   │   ├── contribute/page.tsx # Multi-step submission portal & consent covenant
│   │   │   ├── community/page.tsx # Knowledge holders, elders & contributor directory
│   │   │   ├── admin/page.tsx     # Curator review queue, approve/reject workflow
│   │   │   ├── about/page.tsx     # Platform mission, anti-extractive philosophy
│   │   │   └── globals.css        # Heritage theme styling & Jali backgrounds
│   │   ├── components/            # Reusable UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── CulturalCard.tsx
│   │   │   ├── GlobalAudioBar.tsx
│   │   │   ├── AuthModal.tsx
│   │   │   └── OrnamentalMotif.tsx
│   │   ├── context/               # AuthContext & AudioContext
│   │   └── lib/                   # API clients & TypeScript types
│   ├── .env.local                 # Next.js API URL configuration
│   └── package.json
│
└── package.json                   # Root workspace scripts
```

---

## 📦 Cultural Records Seeded in MongoDB Atlas (`art-works.arts`)

The collection is pre-populated with 11 deeply researched traditions with metadata, regional information, audio tracks, and credible archival sources:

1. **Theyyam: The Living Gods of Malabar** (*Ritual Dance Drama, North Malabar*)
2. **Aranmula Kannadi: The Sacred Metal Mirrors of Travancore** (*Sacred Metallurgy Craft, Pathanamthitta*)
3. **Ottanthullal: The Satirical Dance of Kunjan Nambiar** (*Solo Theatre & Satire, Ambalappuzha*)
4. **Vadakkan Pattukal: The Northern Heroic Ballads** (*Oral Epics & Ballads of Unniyarcha, Kadathanad*)
5. **Chendamelam: The Thunderous Percussion Symphony** (*Temple Percussion, Thrissur*)
6. **Kalaripayattu: The Ancient Mother of Martial Arts** (*Combat & Marma Healing, Northern Kerala*)
7. **Kerala Mural Painting: The Sacred Pigment Frescoes** (*Natural Mineral Art, Mattancherry & Guruvayur*)
8. **Kathakali: The Classical Dance-Drama of Epic Splendor** (*Classical Mudra Theatre, Kalamandalam*)
9. **Pulikali: The Tiger Dance of Thrissur Onam** (*Folk Street Carnival, Swaraj Round*)
10. **Nettur Petti: The Traditional Jewel Casket of Kerala Royalty** (*Sacred Timber Joinery, Thalassery*)
11. **Maravuri & Kani Tribal Oral Herbal Lore** (*Indigenous Ethnobotany & Forest Bark Textiles, Agasthyamala*)

---

## 🔑 Administrative Credentials (Chief Cultural Curator)

For evaluation and testing of the protected curation dashboard:
- **Email**: `admin@livingheritage.org`
- **Password**: `curator123`
- *Or click the "Authorize as Chief Curator" one-click button on the Admin page (`/admin`) or Sign In modal.*

---

## 🛠️ Local Development & Running the Application

### 1. Start the NestJS Backend
```bash
cd backend
npm run start:dev
```
*The backend connects to MongoDB Atlas at cluster `ebin007` (database `art-works`, collection `arts`) and listens on `http://localhost:4000/api`.*

### 2. Start the Next.js Frontend
In a separate terminal:
```bash
cd frontend
npm run dev
```
*The frontend will be available at `http://localhost:3000`.*

### 3. Re-seed MongoDB Atlas Collection (Optional)
To verify or reset the 11 sample traditions in the `arts` collection:
```bash
npm run seed
```

---

## 🌐 Public Deployment Guide

### Deploying the Backend (NestJS)
1. **Host on Railway / Render / DigitalOcean App Platform**:
   - Set Root Directory: `backend`
   - Build Command: `npm run build`
   - Start Command: `npm run start:prod`
   - Set Environment Variables:
     - `PORT=4000`
     - `MONGODB_URI=mongodb+srv://ebinbinuff_db_user:ebinaldo777@ebin007.bql4m4e.mongodb.net/art-works?retryWrites=true&w=majority`
     - `DB_NAME=art-works`
     - `COLLECTION_NAME=arts`
     - `JWT_SECRET=your_production_secret_key`

### Deploying the Frontend (Next.js)
1. **Host on Vercel**:
   - Set Root Directory: `frontend`
   - Set Environment Variables:
     - `NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api`
   - Click **Deploy**. Vercel will build and host the responsive museum experience.

