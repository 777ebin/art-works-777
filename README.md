# Living Heritage, Searchable
> *A Contemporary Digital Museum & Living Archive for Intangible Cultural Heritage*

---

## 1. Project Overview

**Living Heritage, Searchable** is a full-stack, responsive digital sanctuary and cultural preservation platform designed to document, safeguard, celebrate, and explore traditional stories, folk songs, indigenous crafts, ritual performing arts, and oral histories of Kerala and India.

Blending the aesthetic depth of a **contemporary digital museum** and an **editorial magazine** with **traditional Indian aesthetics**, the platform emphasizes ethical preservation. It departs from extractive documentation by establishing strict community ownership, hereditary knowledge holder attribution, and prior informed consent (PIC) protocols.

The platform is pre-populated with 11 deeply researched living traditions:
* **Theyyam** (Shamanic Incarnation & Sacred Grove Dance-Drama, North Malabar)
* **Kathakali** (Classical Dance-Drama of Epic Splendor, Central Kerala)
* **Pulikali** (Tiger Dance & Folk Street Carnival, Thrissur Onam)
* **Ottanthullal** (Satirical Solo Dance-Theatre of Kunjan Nambiar, Ambalappuzha)
* **Aranmula Kannadi** (Sacred Front-Surface Metal Alloy Mirrors, Pathanamthitta)
* **Nettur Petti** (Royal Timber & Brass Joinery Jewel Casket, Malabar)
* **Kerala Mural Painting** (Panchavarna Natural Mineral Frescoes, Central Kerala)
* **Kalaripayattu** (Ancient Martial Science & Marma Healing, Northern Kerala)
* **Maravuri & Kani Tribal Oral Herbal Lore** (Ethnobotanical Wisdom, Agasthyarkoodam)
* **Vadakkan Pattukal** (Heroic Medieval Ballads of Kadathanad & Unniyarcha)
* **Chendamelam** (Panchari & Pandi Temple Percussion Symphonies, Thrissur)

---

## 2. Problem Statement

Intangible Cultural Heritage (ICH) across indigenous and regional communities faces unprecedented threats:
1. **Generational Disruption & Erosion**: Rapid modernization and urban migration are severing the oral transmission of ancestral lore from master practitioners to younger generations.
2. **Extractive & Unattributed Documentation**: Mainstream digital archives and social media platforms frequently appropriate traditional cultural expressions without crediting hereditary masters, lineages, or native communities.
3. **Absence of Consent & Privacy Gating**: Sacred rituals, esoteric chants, and sensitive indigenous ecological lore are often uploaded indiscriminately without community consent, leading to commercial exploitation and spiritual desecration.
4. **Poor Digital Experience**: Existing cultural repositories often resemble dated government databases with fragmented search, uninspired aesthetics, and unreliable media hosting.

**Living Heritage, Searchable** bridges this divide by delivering a museum-grade user experience backed by strict cultural governance and data ethics.

---

## 3. Key Features

* **Museum & Editorial Design Philosophy**:
  * Handcrafted aesthetic featuring warm parchment (`#FAF6EE`), antique ivory, deep terracotta, turmeric yellow, and rich wood tones.
  * Google Fonts typography pairing (*Cinzel*, *Playfair Display*, *Noto Serif Malayalam*, and *Plus Jakarta Sans*).
  * Custom traditional SVG ornamental flourishes (temple lotus borders, sacred seals, and Kolam geometric motifs).
* **Searchable & Faceted Archive Exploration**:
  * Real-time search across titles, native scripts, descriptions, and regions.
  * Multi-dimensional filtering by Category, Geographic Region, Language, and Art Form.
* **In-Depth Cultural Story Chronicles**:
  * Detailed narratives encompassing historical background, cultural significance, origin sources, and living guardian quotes.
  * Curated, high-resolution photography with verifiable source references.
* **Persistent Ambient Audio Player**:
  * Embedded field audio soundscapes and temple percussion accessible across pages via a global floating audio bar.
* **Community Contribution Portal with Ethical Consent Covenant**:
  * Multi-step submission wizard enabling community custodians to record narratives, attach media, and credit living masters.
  * Mandatory **Prior Informed Consent (PIC)** affirmation and sensitive lore flags preventing unapproved commercial access.
* **Protected Chief Curator Governance Queue (`/admin`)**:
  * Role-Based Access Control (RBAC) interface for evaluating pending submissions.
  * Side-by-side photographic preview, metadata verification, review notes, and single-click Approve / Reject actions.
* **Zero-Downtime Fallback Architecture**:
  * Automatic synchronization with MongoDB Atlas, backed by client-side fallback resolvers ensuring seamless browsing even during cold starts.

---

## 4. Technology Stack

### Frontend
* **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
* **Core Library**: [React 18](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with custom heritage color tokens
* **Animations**: [Framer Motion 11](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Audio**: HTML5 Web Audio API with React Context State Management

### Backend
* **Framework**: [NestJS 10](https://nestjs.com/) (Modular Architecture, Dependency Injection)
* **Runtime / Engine**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
* **Validation**: [Class Validator](https://github.com/typestack/class-validator) & [Class Transformer](https://github.com/typestack/class-transformer)
* **File Uploads**: [Multer](https://github.com/expressjs/multer) disk storage engine

### Database & Security
* **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) (Cluster: `ebin007`, Database: `art-works`, Collection: `arts` and `users`)
* **ODM**: [Mongoose 8](https://mongoosejs.com/)
* **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) (`@nestjs/jwt`) & [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
* **Access Control**: Role-Based Access Control (RBAC) supporting `visitor`, `contributor`, `knowledge_holder`, and `curator` / `admin`

### Deployment & Tooling
* **Hosting**: [Vercel](https://vercel.com/) (Edge Network CDN & Serverless)
* **CLI**: Vercel CLI (`vercel`)
* **Version Control**: Git & GitHub

---

## 5. System Architecture

```
                                  +---------------------------------------+
                                  |         CLIENT BROWSER / USER         |
                                  |  (Desktop, Tablet, Mobile Responsive) |
                                  +-------------------+-------------------+
                                                      |
                                                      | HTTPS / WSS
                                                      v
                                  +---------------------------------------+
                                  |          VERCEL EDGE NETWORK          |
                                  |  (Next.js 14 App Router, CDN Cache)   |
                                  +-------------------+-------------------+
                                                      |
                         +----------------------------+----------------------------+
                         |                                                         |
                         v                                                         v
         +-------------------------------+                         +-------------------------------+
         |     FRONTEND PAGES & STATE    |                         |    IMAGE & FALLBACK RESOLVER  |
         |  - / (Homepage & Hero)        |                         |  - High-res CDN Image Mapper  |
         |  - /explore (Search & Filter) |                         |  - Local Seed Data Fallback   |
         |  - /story/[slug] (Details)    |                         |  - Direct Static Asset Links  |
         |  - /contribute (Multi-step)   |                         +-------------------------------+
         |  - /admin (Curator Queue)     |
         |  - AudioContext & AuthContext |
         +---------------+---------------+
                         |
                         | REST API Requests (/api/arts, /api/auth, /api/upload)
                         v
         +-------------------------------+
         |     NESTJS BACKEND ENGINE     |
         |  - ArtsController / Service   |
         |  - AuthController / JWT Guard |
         |  - UploadController (Multer)  |
         +---------------+---------------+
                         |
                         | Mongoose ODM Protocol (TLS/SSL)
                         v
         +-------------------------------+
         |      MONGODB ATLAS CLOUD      |
         |  - Cluster: ebin007           |
         |  - Database: art-works        |
         |  - Collections: arts, users   |
         +-------------------------------+
```

---

## 6. Installation & Setup Instructions

### Prerequisites
* **Node.js**: v18.17.0 or higher
* **npm**: v9.0.0 or higher
* **Git**: Installed and configured
* **MongoDB Atlas Account**: Whitelisted IP (`0.0.0.0/0` under Network Access)

### Step 1: Clone the Repository
```bash
git clone https://github.com/777ebin/art-works-777.git
cd art-works-777
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 4: Seed MongoDB Atlas Database
To populate the 11 verified cultural records into your Atlas cluster (`ebin007` -> `art-works.arts`) and initialize Curator Ebin:
```bash
cd ../backend
npm run build
node scripts/seed-atlas.js
```

### Step 5: Start the Development Servers
In two separate terminals:

**Terminal 1 (Backend):**
```bash
cd backend
npm run start:dev
```
*Backend runs on `http://localhost:4000/api`.*

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
*Frontend runs on `http://localhost:3000`.*

---

## 7. Environment Variables

### Backend Configuration (`backend/.env`)
Create a `.env` file in the `backend/` directory:

```ini
# Server Port
PORT=4000

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://ebinbinuff_db_user:ebinaldo777@ebin007.bql4m4e.mongodb.net/art-works?retryWrites=true&w=majority
DB_NAME=art-works
COLLECTION_NAME=arts

# JWT Security
JWT_SECRET=living_heritage_sacred_secret_key_2026_ebin
JWT_EXPIRATION=7d
```

### Frontend Configuration (`frontend/.env.local`)
Create a `.env.local` file in the `frontend/` directory:

```ini
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# Production Backend Override (used when deployed)
# NEXT_PUBLIC_API_URL=https://your-backend-service.onrender.com/api
```

---

## 8. Usage Instructions

### 1. Exploring the Living Archive
* Visit `http://localhost:3000` to browse the hero showcase, featured traditions, and soundscape previews.
* Navigate to **Explore Archive** (`/explore`) to execute search queries (e.g., *"Theyyam"*, *"Kannur"*, *"Mirror"*), or filter by Art Form, Region, or Language.
* Click any tradition card to view its in-depth chronicle, living master quotes, and archival photographic documentation.

### 2. Contributing a Cultural Chronicle
* Navigate to **Contribute** (`/contribute`).
* Complete the multi-step guided submission:
  1. **Tradition Identity**: Enter Title, Native Script, Category, and Geographical Location.
  2. **Narrative & Chronicle**: Document Historical Origins, Cultural Significance, and Sources.
  3. **Lineage & Media**: Acknowledge living masters/clans and attach photographic files or URLs.
  4. **Ethics & Consent**: Read and sign the mandatory **Prior Informed Consent (PIC)** covenant.
* Click **Submit Cultural Record for Review**.

### 3. Curator Verification & Approval (`/admin`)
* Navigate to **Curator Portal** (`/admin`).
* Sign in using the Chief Curator credentials:
  * **Email**: `ebin@livingheritage.org` *(or click the one-click "Authorize as Curator Ebin" button)*
  * **Password**: `curator123`
* Switch between **All Records**, **Pending Review**, **Approved**, and **Rejected**.
* Click the review dialog on any submission to inspect the uploaded photograph, read the consent statement, append editorial feedback, and click **Approve & Publish to Archive**.

---

## 9. Demonstration Screenshots

| View | Description |
| :--- | :--- |
| **Editorial Homepage Hero** | Cinematic headline *"Every Tradition Has a Story. Every Story Deserves to Live."*, ambient audio player, and featured tradition spotlights. |
| **Searchable Archive Grid** | Multifaceted filtering panel with category, region, and art-form pills rendering responsive editorial cards. |
| **Cultural Story Details** | Dropcap editorial narrative, lineage strips, verified high-resolution photograph, and living master quotes. |
| **Contribution & Consent Portal** | Step-by-step guardian submission wizard with photographic media preview and legal Prior Informed Consent agreement. |
| **Curator Review Queue (`/admin`)** | Protected governance dashboard displaying KPI counters, photographic inspection drawer, and approval triggers. |

*(Screenshots can be captured and placed under `/docs/screenshots/`)*

---

## 10. Team Members

* **Ebin** — *Lead Full-Stack Architect, Creative Director & Chief Cultural Curator*
  * Architecture, NestJS API design, Next.js frontend implementation, MongoDB Atlas integration, and cultural preservation curation.
* **Living Heritage Collective** — *Folklore Research, Ethnographic Documentation & Community Guardians*

---

## 11. Limitations & Future Scope

### Current Limitations
1. **Local Media Upload Storage**: Uploaded files in local development are saved to `./uploads`. In serverless deployments, an external object store (e.g., AWS S3 / Cloudinary) is recommended.
2. **Manual Curation Bottleneck**: Verification relies on human curators checking hereditary claims and community permissions.
3. **Bandwidth for High-Res Imagery**: Uncompressed archival photographs can require significant bandwidth on slow mobile connections.

### Future Scope
* **AI-Assisted Folklore Audio Transcription**: Integration of Malayalam and Dravidian dialect speech-to-text models for transcribing oral chants.
* **Decentralized Provenance & Blockchain Badging**: Storing immutable community consent hashes on-chain (IPFS / Polygon) to prevent unauthorized biopiracy and commercial exploitation.
* **Interactive 3D Craft Viewer**: WebGL/Three.js rendering for intricate heritage metallurgy like Aranmula Kannadi and Nettur Petti joinery.
* **Progressive Web App (PWA) Offline Mode**: Caching cultural chronicles for offline access in remote rural schools and heritage centers.

---

## 12. License & Attribution

### Software License
The codebase of **Living Heritage, Searchable** is licensed under the [MIT License](LICENSE).

### Cultural Attribution & Traditional Knowledge Notice
The traditional expressions, songs, practices, and folklore documented within this archive belong perpetually to their respective hereditary custodian communities, clans, and master artists. Documentation is compiled solely for educational, cultural preservation, and non-commercial archival purposes in alignment with UNESCO conventions on the Safeguarding of the Intangible Cultural Heritage.
